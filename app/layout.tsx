import type { Metadata, Viewport } from "next";
import { Anton, Manrope } from "next/font/google";
import "./globals.css";
import { site } from "./lib/site";
import Background from "./components/Background/Background";
import Intro from "./components/Intro/Intro";
import Cursor from "./components/cursor/cursor";
import ScrollProgress from "./components/motion/ScrollProgress";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-anton",
});

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL
    ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
    : undefined,
  title: {
    default: `${site.name} — Designer graphique, logos & identités visuelles`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: [
    "designer graphique",
    "graphiste",
    "création de logo",
    "identité visuelle",
    "branding",
    "flyers",
    "affiches",
    "menus restaurant",
    "création de site web",
  ],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: site.name,
    title: `${site.name} — Designer graphique`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  themeColor: "#070707",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${anton.variable} ${manrope.variable}`}
      data-scroll-behavior="smooth"
    >
      <body>
        <noscript>
          <style>{`.reveal,.reveal[data-v]{opacity:1;transform:none;filter:none}.reveal[data-v="clip"]>*{clip-path:none}.split .c{transform:none}`}</style>
        </noscript>

        <a href="#contenu" className="skip-link">
          Aller au contenu
        </a>

        <Intro />
        <Background />
        <Cursor />
        <ScrollProgress />

        <Navbar />

        <div id="contenu">{children}</div>

        <Footer />
      </body>
    </html>
  );
}
