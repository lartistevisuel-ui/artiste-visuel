"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useEffect, useState } from "react";
import styles from "./Navbar.module.css";

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
                mobileMenuRef.current.querySelectorAll("a, h2, img, span, small"),
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
          ☰
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

        <img
          src="/images/logo.jpg"
          alt="Logo"
          className={styles.mobileLogo}
        />

        <h2>L'ARTISTE VISUEL</h2>

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

        <a
          href="https://snapchat.com/t/2p1BEiQs"
          target="_blank"
          rel="noreferrer"
        >
          👻 Snapchat
        </a>

        <a
          href="https://www.facebook.com/share/18GrdCqoGQ/?mibextid=wwXIfr"
          target="_blank"
          rel="noreferrer"
        >
          📘 Facebook
        </a>

        <a
          href="https://t.me/+RCV3meXWthVkNWU8"
          target="_blank"
          rel="noreferrer"
        >
          ✈️ Telegram
        </a>

        <a href="mailto:lartistevisuel@gmail.com">
          📧 Contact
        </a>

        <span>Disponible pour vos projets</span>

        <small>Réponse sous 24h</small>
      </div>
    </>
  );
}