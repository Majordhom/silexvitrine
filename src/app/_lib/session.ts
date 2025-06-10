import { cookies } from 'next/headers';
import { randomUUID } from 'crypto';

const SESSION_COOKIE_KEY = 'session_id';

export async function getOrCreateSessionId(): Promise<string> {
    const cookieStore = await cookies();
    let sessionId = cookieStore.get(SESSION_COOKIE_KEY)?.value;

    if (!sessionId) {
        sessionId = randomUUID();
        cookieStore.set(SESSION_COOKIE_KEY, sessionId, {
            maxAge: 60 * 60 * 24 * 365, // 1 an
            path: '/',
            httpOnly: true,
            sameSite: 'lax',
        });
    }

    return sessionId;
}
