import Image from "next/image";
import Link from "next/link";
import logo from "@/public/images/logo-transparent.webp";
import { navLinks, site, socials } from "../../lib/site";
import Fx from "../motion/Fx";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <Image src={logo} alt="" width={84} height={84} className={styles.logo} />

          <div>
            <p className={styles.name}>
              L&apos;Artiste <em>Visuel</em>
            </p>
            <p className={styles.tagline}>{site.tagline}</p>
          </div>
        </div>

        <nav className={styles.column} aria-label="Pied de page">
          <h2>Navigation</h2>

          {navLinks.map((link) => (
            <Link key={link.id} href={`/#${link.id}`}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles.column}>
          <h2>Me suivre</h2>

          {socials.map((social) => (
            <a key={social.label} href={social.href} target="_blank" rel="noreferrer">
              {social.label}
            </a>
          ))}
        </div>

        <div className={styles.column}>
          <h2>Contact</h2>

          <a href={`mailto:${site.email}`}>{site.email}</a>
          <span>Réponse sous 24 h</span>
        </div>
      </div>

      <Fx scroll="through" className={styles.wordmark}>
        <p aria-hidden="true">
          L&apos;Artiste <em>Visuel</em>
        </p>
      </Fx>

      <div className={`container ${styles.bottom}`}>
        <p>© {new Date().getFullYear()} L&apos;Artiste Visuel. Tous droits réservés.</p>

        <a href="#contenu">Haut de page ↑</a>
      </div>
    </footer>
  );
}
