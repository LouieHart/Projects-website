import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  DM_Serif_Display,
  Source_Serif_4,
  JetBrains_Mono,
  DM_Sans,
} from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-heading",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-body",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Louie Hart — Actuarial Science",
  description:
    "Portfolio of Louie Hart, actuarial science graduate from the University of Melbourne, Class of 2026. Risk modelling, portfolio optimisation, decision theory.",
  openGraph: {
    title: "Louie Hart — Actuarial Science",
    images: ["/assets/louie-headshot.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cormorant.variable} ${dmSerif.variable} ${sourceSerif.variable} ${jetbrains.variable} ${dmSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
