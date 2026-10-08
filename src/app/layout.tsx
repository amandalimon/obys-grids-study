import type { Metadata } from "next"
import localFont from "next/font/local"
import { Analytics } from "@vercel/analytics/next"
import { Loader } from "@/components/loader"
import { SiteHeader } from "@/components/site-header"
import "./globals.css"
const texGyreHeros = localFont({
  src: "./fonts/texgyreheros-regular.otf",
  weight: "400",
  variable: "--font-tex-gyre-heros",
  declarations: [
    { prop: "ascent-override", value: "96.9%" },
    { prop: "descent-override", value: "24%" },
    { prop: "line-gap-override", value: "0%" }
  ]
})
export const metadata: Metadata = {
  title: "Grids — GSAP practice",
  description: "A GSAP practice recreation of grids.obys.agency by Obys Agency."
}
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-loading
      className={`${texGyreHeros.variable} antialiased`}
    >
      <body>
        <SiteHeader />
        <Loader />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
