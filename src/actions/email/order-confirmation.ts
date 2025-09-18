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
    subject: `Orden #${id.split("-").slice(-1)[0]} - ${fechaFormateada}`,
    html: `
    <body style="margin:0; padding:0; background-color:#f4f4f4; font-family:Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f4; padding: 20px 0;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; padding: 20px; border-radius: 8px;">
            
            <!-- Logo -->
            <tr>
              <td align="center" style="padding-bottom: 20px;">
                <img src="${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/logo-teslo-fcc.jpg" alt="Company Logo" width="120" style="display:block;">
              </td>
            </tr>
            
            <!-- Greeting -->
            <tr>
              <td style="font-size: 18px; color: #333333; padding-bottom: 10px;">
                <strong>Thank you ${clientName} for your order!</strong>
              </td>
            </tr>
            
            <!-- Order Info -->
            <tr>
              <td style="font-size: 16px; color: #555555; line-height: 24px;">
                We've received your order and are preparing it for shipment. Here are the details:
              </td>
            </tr>

            <!-- Item Block -->
            <tr>
              <td style="padding-top: 20px;">
                <table width="100%" cellpadding="0" cellspacing="0" style="border-top: 1px solid #dddddd; padding-top: 20px;">
                  <tr>
                    <td style="font-size: 16px; color: #333333;">
                      <strong>Product:</strong> Classic Denim Jacket
                    </td>
                  </tr>
                  <tr>
                    <td style="font-size: 16px; color: #333333;">
                      <strong>Quantity:</strong> 2 units
                    </td>
                  </tr>
                   ${finalProductsOrder.map(
      (item) => `<tr>
                    <td style="font-size: 16px; color: #333333;">
                      <strong>Product:</strong> ${item.title}
                    </td>
                  </tr>
                  <tr>
                    <td style="font-size: 16px; color: #333333;">
                      <strong>Quantity:</strong> ${item.quantity} units
                    </td>
                  </tr>`
    )}
                </table>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding-top: 30px; font-size: 14px; color: #999999; text-align: center;">
                If you have any questions, feel free to contact us at contact@teslo-shop-fcc.com
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
      
    `,
  });

  return info;
}
// <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
//       <img src="http://localhost:3000/logo-teslo-fcc.jpg" alt="Logo" style="width: 150px; margin-bottom: 20px;" />
//          <h1 style="color: #4CAF50;">Hola ${clientName}, muchas gracias por tu compra</h1>
//          <p>Tu orden ha sido procesada con éxito.</p>
//          <h2 style="color: #2196F3;">Detalles de la orden:</h2>
//          <ul style="list-style-type: none; padding: 0;">
//             ${finalProductsOrder
//               .map(
//                  (item) =>
//                     `<li style="margin-bottom: 10px;">
//                       <span style="font-weight: bold;">${item.quantity} unidades</span> - ${item.title}
//                     </li>`
//               )
//               .join("")}
//          </ul>
//          <p style="margin-top: 20px;">Gracias por confiar en Teslo Shop Local.</p>
//       </div>
