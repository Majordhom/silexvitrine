import { prisma } from '@/app/_lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { getOrCreateSessionId } from '@/app/_lib/session';

export async function POST(req: NextRequest) {
    const { email } = await req.json();
    const sessionId = getOrCreateSessionId();

    if (!email) {
        return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    await prisma.searchQuery.updateMany({
        where: {
            sessionId,
            email: null,
        },
        data: {
            email,
        },
    });

    return NextResponse.json({ success: true });
}
