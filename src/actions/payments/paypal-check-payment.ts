"use server";

import { auth } from "@/auth.config";
import { PayPalOrderStatusResponse } from "@/interfaces";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

import { getOrderById } from "../order/get-order-by-id";
import { sendPaymentConfirmationEmail } from "../email/payment-confirmation";

export const paypalCheckPayment = async (paypalTransactionId: string) => {
   const authToken = await getPayPalBearerToken();
   const session = await auth();
   console.log({ authToken });
   if (!authToken) {
      return {
         ok: false,
         message: "No se pudo obtener el token de autenticacion ",
      };
   }

   const response = await verifyPayPalPayment(paypalTransactionId, authToken);
   if (!response)
      return {
         ok: false,
         message: "Error al verificar el pago ",
      };
   const { status, purchase_units } = response;
   const { invoice_id: orderId } = purchase_units[0];
   if (status !== "COMPLETED")
      return {
         ok: false,
         message: "El pago no se completó ",
      };

   try {
      await prisma.order.update({
         where: {
            id: orderId,
         },
         data: {
            isPaid: true,
            paidAt: new Date(),
         },
      });
      revalidatePath(`/orders/${orderId}`);

      // const order = getOrderById(purchase_units[0].invoice_id)

      const order = await prisma.order.findUnique({
         where: { id: purchase_units[0].invoice_id },
      });
      sendPaymentConfirmationEmail({
         to: session?.user.email || "",
         name: session?.user.name|| "",
         paymentId: paypalTransactionId,
         amount: order?.total || 100,
         date: order?.createdAt.toString() || new Date().toString(),
      });
      // const info = await transporter.sendMail({
      //    from: "Teslo Shop Local",
      //    to: `${session?.user.email}`,
      //    subject: `Orden del dia ${order?.createdAt} ${order?.total} - Pago completado`,
      //    html: `
      //       <h1>Gracias por tu compra</h1>
      //       <p>Tu pago se completo con exito</p>
      //       <h2>Detalles de la orden:</h2>     
      //       <h3>Coste ${order?.total}</h3>    
      //       `,
      // });
      return {
         ok: true,
      };
   } catch (error) {
      console.log(error);
      return {
         ok: false,
         message: "El pago no se pudo actualizar",
      };
   }

   return;
};

const getPayPalBearerToken = async (): Promise<string | null> => {
   const OAUTH_URL = process.env.PAYPAL_OAUTH_URL ?? "";
   const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
   const PAYPAL_SECRET = process.env.PAYPAL_CLIENT_SECRET;
   const base64Token = Buffer.from(
      `${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`,
      "utf-8"
   ).toString("base64");

   const myHeaders = new Headers();
   myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
   myHeaders.append("Authorization", `Basic ${base64Token}`);

   const urlencoded = new URLSearchParams();
   urlencoded.append("grant_type", "client_credentials");

   try {
      const result = await fetch(OAUTH_URL, {
         method: "POST",
         headers: myHeaders,
         body: urlencoded,
         redirect: "follow",
         cache: "no-store",
      }).then((r) => r.json());
      return result.access_token;
   } catch (error) {
      console.log(error);

      return null;
   }
};

const verifyPayPalPayment = async (
   payPalTransactionId: string,
   bearerToken: string
): Promise<PayPalOrderStatusResponse | null> => {
   const payPalOrderUrl = `${process.env.PAYPAL_ORDERS_URL}/${payPalTransactionId}`;
   const myHeaders = new Headers();
   myHeaders.append("Authorization", `Bearer ${bearerToken}`);

   try {
      const response = await fetch(payPalOrderUrl, {
         method: "GET",
         headers: myHeaders,
         redirect: "follow",
         cache: "no-store",
      }).then((r) => r.json());

      return response;
   } catch (error) {
      console.log(error);

      return null;
   }
};
