import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/app/_lib/prisma";
import {generateToken} from "@/app/_lib/utils/generateToken";
import {sendMail} from "@/app/_lib/services/mailer";
import {validateEmail} from "@/app/_lib/utils/email";

export async function POST(req: NextRequest) {
    try {
        const {email} = await req.json();

        if (!validateEmail(email)) {
            return NextResponse.json({message: "Adresse email invalide."}, {status: 400});
        }

        // Normalisation de l'email
        const normalizedEmail = email.toLowerCase().trim();

        // Vérifie si l'email existe déjà
        const existingAbonne = await prisma.abonne.findUnique({
            where: {
                email: normalizedEmail,
            },
        });

        // Génération du token
        const token = generateToken();

        if (existingAbonne) {
            // Si l'email existe déjà, on met à jour l'abonné avec un nouveau token
            await prisma.abonne.update({
                where: {id: existingAbonne.id},
                data: {
                    token, // on génère un nouveau token
                    // statutActif: false, // on remet l'abonné à l'état inactif
                },
            });
        } else {
            // Si l'email n'existe pas, on crée un nouvel abonné
            await prisma.abonne.create({
                data: {
                    email: normalizedEmail,
                    token,
                    statutActif: false, // inactif tant qu'il n'a pas validé
                },
            });
        }


        // Envoi du mail de confirmation
        const confirmUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/newsletter/confirm?token=${token}`;

        await sendMail({
            to: email,
            subject: "Confirmez votre inscription à la newsletter",
            html: `<p>Merci de vous être inscrit à la newsletter !</p>
             <p>Cliquez ici pour confirmer votre inscription :</p>
             <a href="${confirmUrl}">Confirmer mon inscription</a>`,
        });

        return NextResponse.json({message: "Inscription réussie ! Vérifie ta boîte mail pour confirmer."});

    } catch (error) {
        console.error(error);
        return NextResponse.json({message: "Erreur serveur, réessaie plus tard."}, {status: 500});
    }
}
