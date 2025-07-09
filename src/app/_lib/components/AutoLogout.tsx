"use client"

import { useEffect } from "react"
import { signOut, useSession } from "next-auth/react"

type Props = {
    timeout: number
}

export default function AutoLogoutClient({ timeout }: Props) {
    const { status } = useSession()

    useEffect(() => {
        if (status !== "authenticated") return

        let timer: ReturnType<typeof setTimeout>

        const resetTimer = () => {
            clearTimeout(timer)
            timer = setTimeout(() => {
                signOut()
            }, timeout)
        }

        window.addEventListener("mousemove", resetTimer)
        window.addEventListener("keydown", resetTimer)
        window.addEventListener("click", resetTimer)
        window.addEventListener("scroll", resetTimer)

        resetTimer()

        return () => {
            clearTimeout(timer)
            window.removeEventListener("mousemove", resetTimer)
            window.removeEventListener("keydown", resetTimer)
            window.removeEventListener("click", resetTimer)
            window.removeEventListener("scroll", resetTimer)
        }
    }, [status, timeout])

    return null
}
