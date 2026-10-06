import type { Metadata } from "next";
import localFont from "next/font/local";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";
const texGyreHeros = localFont({
  src: "./fonts/texgyreheros-regular.otf",
  weight: "400",
  variable: "--font-tex-gyre-heros",
  declarations: [
    { prop: "ascent-override", value: "96.9%" },
    { prop: "descent-override", value: "24%" },
    { prop: "line-gap-override", value: "0%" },
  ],
});
export const metadata: Metadata = {
  title: "Grids — GSAP practice",
  description:
    "A GSAP practice recreation of grids.obys.agency by Obys Agency.",
};
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${texGyreHeros.variable} antialiased`}>
      <body>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
