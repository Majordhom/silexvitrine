"use client"

import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"
import { Toaster } from "react-hot-toast"
import ReactQueryProvider from "./ReactQueryProvider"

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ReactQueryProvider>
      <SessionProvider>
        {children}
        <Toaster position="top-center" reverseOrder={false} />
      </SessionProvider>
    </ReactQueryProvider>
  )
}
