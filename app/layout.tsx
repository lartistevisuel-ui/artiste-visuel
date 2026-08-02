import "./globals.css";
import LenisProvider from "./components/LenisProvider";

export const metadata = {
  title: "L'Artiste Visuel",
  description: "Portfolio Premium",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
