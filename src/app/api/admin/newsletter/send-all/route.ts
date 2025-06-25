import { NextResponse } from "next/server";
import { prisma } from "@/app/_lib/prisma";
import { sendMail } from "@/app/_lib/services/mailer";

export async function POST(request: Request) {
    const body = await request.json();
    const message = body.message || "Voici la dernière newsletter.";

    // Remplacer \n par <br/> pour garder la mise en forme des sauts de ligne
    const formattedMessage = message.replace(/\n/g, "<br/>");

    // Fetch des abonnés actifs
    const abonnes = await prisma.abonne.findMany({
        where: { statutActif: true },
    });

    // si aucun abonné actif, retourner une erreur
    if (abonnes.length === 0) {
        return NextResponse.json({ error: "Aucun abonné actif." }, { status: 404 });
    }

    // envoi des emails en boucle (possible d'optimiser avec Promise.all si besoin)
    for (const abonne of abonnes) {
        await sendMail({
            to: abonne.email,
            subject: "Votre newsletter personnalisée",
            html: `
        <p>${formattedMessage}</p>
        <br/>
        <a href="${process.env.NEXT_PUBLIC_SITE_URL}/newsletter/unsubscribe?token=${abonne.tokenDesinscription}">
          Se désinscrire
        </a> |
        <a href="${process.env.NEXT_PUBLIC_SITE_URL}/newsletter/delete?token=${abonne.tokenSuppression}">
          Supprimer mes données
        </a>
      `,
        });
    }

    return NextResponse.json({ success: true, sent: abonnes.length });
    //equivalent à
    // return new Response(
    //     JSON.stringify({ success: true, sent: abonnes.length }),
    //     { status: 200, headers: { "Content-Type": "application/json" } }
    // );
}
