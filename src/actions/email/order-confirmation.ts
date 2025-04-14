import { EmailConfirmationProps } from "@/interfaces";
import { transporter } from "./transporter-config";
import { fechaFormateada } from "@/utils";

export async function sendOrderConfirmationEmail({
   id,
   emailDestination,
   clientName,
   finalProductsOrder = [],
}: EmailConfirmationProps) {
const info = await transporter.sendMail({
    from: "Teslo Shop Local",
    to: `${emailDestination}`,
    subject: `Orden #${id.split("-")[-1]} - ${fechaFormateada}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
         <h1 style="color: #4CAF50;">Hola ${clientName}, muchas gracias por tu compra</h1>
         <p>Tu orden ha sido procesada con éxito.</p>
         <h2 style="color: #2196F3;">Detalles de la orden:</h2>
         <ul style="list-style-type: none; padding: 0;">
            ${finalProductsOrder
              .map(
                 (item) =>
                    `<li style="margin-bottom: 10px;">
                      <span style="font-weight: bold;">${item.quantity} unidades</span> - ${item.title}
                    </li>`
              )
              .join("")}
         </ul>
         <p style="margin-top: 20px;">Gracias por confiar en Teslo Shop Local.</p>
      </div>
    `,
});

   return info;
}
