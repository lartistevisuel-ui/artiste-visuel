import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return (
    <main
      className="container"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        justifyContent: "center",
        gap: 28,
        minHeight: "100svh",
      }}
    >
      <span className="eyebrow">
        <b>404</b> Page introuvable
      </span>

      <h1 className="section-title" style={{ marginTop: 0 }}>
        Cette page <em>n&apos;existe pas.</em>
      </h1>

      <Link href="/" className="btn btn--primary">
        Retour à l&apos;accueil
        <ArrowUpRight size={18} />
      </Link>
    </main>
  );
}
