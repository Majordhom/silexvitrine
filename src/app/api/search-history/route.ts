import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/_lib/prisma';
import { getOrCreateSessionId } from '@/app/_lib/session';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { criteria, email } = body;

        if (!criteria || typeof criteria !== 'object') {
            return NextResponse.json({ error: 'Invalid criteria' }, { status: 400 });
        }

        const sessionId = await getOrCreateSessionId();
        const userAgent = req.headers.get('user-agent') || null;
        const ip = req.headers.get('x-forwarded-for') || null;

        const query = await prisma.searchQuery.create({
            data: {
                sessionId,
                email: email || null,
                criteria,
                userAgent,
                ip,
            },
        });

        return NextResponse.json({ success: true, id: query.id });
    } catch (err) {
        console.error('[Search Query Error]', err);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
