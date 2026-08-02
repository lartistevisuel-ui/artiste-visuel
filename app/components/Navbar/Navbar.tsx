"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import styles from "./Navbar.module.css";

import {
  Menu,
  Send,
  Mail,
  Circle,
  Globe,
} from "lucide-react";

const links = [
  { id: "hero", label: "Accueil" },
  { id: "about", label: "À propos" },
  { id: "portfolio", label: "Portfolio" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`${styles.navbar} ${scrolled ? styles.scrolled : ""
          }`}
      >
        <div className={styles.logo}>
          <img src="/images/logo.jpg" alt="Logo" />
        </div>

        <nav className={styles.menu}>
          {links.map((link) => (
            <a key={link.id} href={`#${link.id}`}>
              {link.label}
            </a>
          ))}
        </nav>

        <button
          className={styles.burger}
          onClick={() => {
            setMenuOpen(true);

            setTimeout(() => {
              if (!mobileMenuRef.current) return;

              gsap.fromTo(
                mobileMenuRef.current.querySelectorAll(
                  "img,h2,p,nav,a,span,small,div"
                ),
                {
                  opacity: 0,
                  x: 40,
                },
                {
                  opacity: 1,
                  x: 0,
                  stagger: 0.08,
                  duration: 0.5,
                  ease: "power3.out",
                }
              );
            }, 50);
          }}
        >
          <Menu size={34} />
        </button>
      </header>

      <div
        ref={mobileMenuRef}
        className={`${styles.mobileMenu} ${menuOpen ? styles.mobileOpen : ""
          }`}
      >
        <button
          className={styles.close}
          onClick={() => setMenuOpen(false)}
        >
          ✕
        </button>

        <div className={styles.logoBox}>
          <img
            src="/images/logo.jpg"
            alt="Logo"
            className={styles.mobileLogo}
          />
        </div>

        <h2>L'ARTISTE VISUEL</h2>

        <p className={styles.tagline}>
          Designer graphique
        </p>

        <p className={styles.tagline2}>
          Identité visuelle • Sites web
        </p>

        <nav className={styles.mobileLinks}>
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className={styles.separator}></div>

        <div className={styles.socials}>
          <a
            href="https://snapchat.com/t/2p1BEiQs"
            target="_blank"
            rel="noreferrer"
            onClick={() => setMenuOpen(false)}
          >
            <Circle size={18} />
            Snapchat
          </a>

          <a
            href="https://www.facebook.com/share/18GrdCqoGQ/?mibextid=wwXIfr"
            target="_blank"
            rel="noreferrer"
            onClick={() => setMenuOpen(false)}
          >
            < Globe size={18} />
            Facebook
          </a>

          <a
            href="https://t.me/+RCV3meXWthVkNWU8"
            target="_blank"
            rel="noreferrer"
            onClick={() => setMenuOpen(false)}
          >
            <Send size={18} />
            Telegram
          </a>

          <a
            href="mailto:lartistevisuel@gmail.com"
            onClick={() => setMenuOpen(false)}
          >
            <Mail size={18} />
            Email
          </a>
        </div>

        <div className={styles.footer}>
          <span>Disponible pour vos projets</span>

          <small>Réponse sous 24 h</small>

          <div className={styles.separator}></div>

          <p>© 2026 L'ARTISTE VISUEL</p>
        </div>
      </div>
    </>
  );
}