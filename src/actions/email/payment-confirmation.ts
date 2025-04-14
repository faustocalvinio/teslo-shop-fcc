import nodemailer from 'nodemailer';
import { transporter } from './transporter-config';

interface PaymentConfirmationEmailParams {
    to: string;
    name: string;
    paymentId: string;
    amount: number;
    date: string;
}

export const sendPaymentConfirmationEmail = async ({
    to,
    name,
    paymentId,
    amount,
    date,
}: PaymentConfirmationEmailParams): Promise<void> => {
   
    const mailOptions = {
        from: "Teslo Shop Local",
        to,
        subject: 'Payment Confirmation',
        html: `
            <h1>Payment Confirmation</h1>
            <p>Hi ${name},</p>
            <p>Thank you for your payment. Here are the details:</p>
            <ul>
                <li><strong>Payment ID:</strong> ${paymentId}</li>
                <li><strong>Amount:</strong> $${amount.toFixed(2)}</li>
                <li><strong>Date:</strong> ${date}</li>
            </ul>
            <p>If you have any questions, feel free to contact us.</p>
            <p>Best regards,</p>
            <p>Your Company</p>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Payment confirmation email sent successfully.');
    } catch (error) {
        console.error('Error sending payment confirmation email:', error);
        throw new Error('Failed to send payment confirmation email.');
    }
};