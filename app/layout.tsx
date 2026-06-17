import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "MGX — Engineering Tomorrow",
  description:
    "MGX is a technology company building intelligent systems for enterprises and governments at scale.",
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:wght@100..900&family=Google+Sans:wght@300;400;450;500;700;800&family=Google+Sans+Display:wght@300;400;450;500;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-white text-[#121317] overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
