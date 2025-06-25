import nodemailer from "nodemailer";

// la constante transporter est utilisée pour envoyer des emails via Mailtrap
const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: Number(process.env.MAILTRAP_PORT),
    auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
    },
});



//cette fonction envoie un mail a l'adresse email spécifiée avec le sujet et le contenu HTML
export async function sendMail({
                                   to,
                                   subject,
                                   html,
                               }: {
    to: string;
    subject: string;
    html: string;
}) {
    await transporter.sendMail({
        from: '"Silex Vitrine" <no-reply@silexvitrine.fr>',
        to,
        subject,
        html,
    });
}
