import { cookies } from 'next/headers';

const CRITERIA_KEY = 'search_criteria';

export async function saveSearchCriteria(criteria: any) {
    const cookieStore = await cookies();
    cookieStore.set(CRITERIA_KEY, JSON.stringify(criteria), {
        path: '/',
        maxAge: 60 * 60 * 24 * 30, // 30 jours
    });
}

export async function getSearchCriteria(): Promise<any | null> {
    const cookieStore = await cookies();
    const cookieValue = cookieStore.get(CRITERIA_KEY)?.value;
    return cookieValue ? JSON.parse(cookieValue) : null;
}
