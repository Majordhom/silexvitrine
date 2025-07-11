import {NextResponse, NextRequest} from "next/server";
import {prisma} from "@/app/_lib/prisma";
import {sendMail} from "@/app/_lib/services/mailer";
import {generateNewsletterTemplate} from "@/app/_lib/services/templates/generateNewsletterTemplate";
import {protectAdminApi} from  "@/app/_lib/api/protectAdminApi";

export async function POST(request: NextRequest) {
    // Vérification de l'authentification
    const protection = await protectAdminApi(request);
    if (protection) return protection;

    const body = await request.json();
    const message = body.message || "Voici la dernière newsletter.";

    // Remplacer \n par <br/> pour garder la mise en forme des sauts de ligne
    const formattedMessage = message.replace(/\n/g, "<br/>");

    // Fetch des abonnés actifs
    const abonnes = await prisma.abonne.findMany({
        where: {statutActif: true},
    });

    // si aucun abonné actif, retourner une erreur
    if (abonnes.length === 0) {
        return NextResponse.json({error: "Aucun abonné actif."}, {status: 404});
    }

    // envoi des emails en boucle (possible d'optimiser avec Promise.all si besoin)
    for (const abonne of abonnes) {
        await sendMail({
            to: abonne.email,
            subject: "Votre newsletter personnalisée",
            html: generateNewsletterTemplate({
                message,
                unsubscribeLink: `${process.env.NEXT_PUBLIC_SITE_URL}/newsletter/unsubscribe?token=${abonne.tokenDesinscription}`,
                deleteLink: `${process.env.NEXT_PUBLIC_SITE_URL}/newsletter/delete?token=${abonne.tokenSuppression}`,
            }),
        });
    }

    return NextResponse.json({success: true, sent: abonnes.length});
    //equivalent à
    // return new Response(
    //     JSON.stringify({ success: true, sent: abonnes.length }),
    //     { status: 200, headers: { "Content-Type": "application/json" } }
    // );
}
