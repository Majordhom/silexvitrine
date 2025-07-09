"use client"

import { useAutoLogout } from "@/app/_lib/hooks/useAutoLogout"

export default function AutoLogout() {
    useAutoLogout(1 * 60 * 1000)
    return null;
}
