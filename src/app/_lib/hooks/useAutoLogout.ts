"use client"

import { useEffect, useRef } from "react"
import { signOut } from "next-auth/react"

export function useAutoLogout(inactivityDelay = 10 * 60 * 1000) {
    const timerRef = useRef<NodeJS.Timeout | null>(null)

    const resetTimer = () => {
        if (timerRef.current) clearTimeout(timerRef.current)

        timerRef.current = setTimeout(() => {
            console.log("Déconnexion pour inactivité")
            signOut({ callbackUrl: "/admin/login" })
        }, inactivityDelay)
    }

    useEffect(() => {
        const events = ["mousemove", "keydown", "click", "scroll"]

        events.forEach((event) => {
            window.addEventListener(event, resetTimer)
        })

        resetTimer() // lance le timer au chargement

        return () => {
            events.forEach((event) => {
                window.removeEventListener(event, resetTimer)
            })
            if (timerRef.current) clearTimeout(timerRef.current)
        }
    }, [inactivityDelay])
}
