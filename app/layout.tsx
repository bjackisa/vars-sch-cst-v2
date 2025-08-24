import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import { ChatWidget } from "@/components/ui/chat-widget"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Varsity Scholars Consult - Global Scholarship Opportunities",
  description:
    "Connect Ugandan and East African students with life-changing scholarship opportunities worldwide. From application to acceptance, we're with you every step of the way.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${poppins.variable} antialiased`}
    >
      <body className="min-h-screen bg-background text-foreground font-sans">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
          <ChatWidget />
        </ThemeProvider>
      </body>
    </html>
  )
}
