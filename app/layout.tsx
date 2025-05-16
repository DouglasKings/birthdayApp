import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../styles/globals.css" 

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Birthday Celebration",
  description: "Celebrating Damien Papers and Dennis's birthdays",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}