import {NextResponse, NextRequest} from "next/server";
import {prisma} from "@/app/_lib/prisma";
import {sendMail} from "@/app/_lib/services/mailer";
import {generateNewsletterTemplate} from "@/app/_lib/services/templates/generateNewsletterTemplate";
import {protectAdminApi} from "@/app/_lib/api/authMiddleware";

export async function POST(request: NextRequest) {
    // Vérification de l'authentification
    const protection = await protectAdminApi(request);
    if (protection) return protection;


    const {searchParams} = new URL(request.url);
    const id = searchParams.get("id");
    const body = await request.json();
    const message = body.message || "Voici la dernière newsletter."; // fallback


    if (!id) return NextResponse.json({error: "Missing id"}, {status: 400});

    const abonne = await prisma.abonne.findUnique({
        where: {id},
    });

    if (!abonne) return NextResponse.json({error: "Abonné introuvable"}, {status: 404});

    await sendMail({
        to: abonne.email,
        subject: "Votre newsletter personnalisée",
        html: generateNewsletterTemplate({
            message,
            unsubscribeLink: `${process.env.NEXT_PUBLIC_SITE_URL}/newsletter/unsubscribe?token=${abonne.tokenDesinscription}`,
            deleteLink: `${process.env.NEXT_PUBLIC_SITE_URL}/newsletter/delete?token=${abonne.tokenSuppression}`,
        }),
    });

    return NextResponse.json({success: true});
}
