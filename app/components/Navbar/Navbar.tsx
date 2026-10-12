"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Ghost, Globe, Mail, Menu, Send, X } from "lucide-react";
import logo from "@/public/images/logo-transparent.webp";
import { navLinks, site, socials } from "../../lib/site";
import Magnetic from "../motion/Magnetic";
import styles from "./Navbar.module.css";

const socialIcons: Record<string, React.ReactNode> = {
  Snapchat: <Ghost size={18} />,
  Facebook: <Globe size={18} />,
  Telegram: <Send size={18} />,
};

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [visibleSection, setVisibleSection] = useState("");

  const active =
    pathname === "/"
      ? visibleSection
      : pathname.startsWith("/portfolio")
        ? "portfolio"
        : "";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lien actif selon la section visible (page d'accueil uniquement)
  useEffect(() => {
    if (pathname !== "/") return;

    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter((section): section is HTMLElement => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setVisibleSection(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [pathname]);

  // Menu mobile : blocage du défilement + fermeture avec Échap
  useEffect(() => {
    if (!menuOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <>
      <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
        <div className={`container ${styles.inner}`}>
          <Link href="/" className={styles.brand} onClick={close}>
            <Image
              src={logo}
              alt=""
              width={52}
              height={52}
              className={styles.logo}
            />
            <span>
              L&apos;Artiste <em>Visuel</em>
            </span>
          </Link>

          <nav className={styles.menu} aria-label="Navigation principale">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                href={`/#${link.id}`}
                className={active === link.id ? styles.active : ""}
                aria-current={active === link.id ? "true" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className={styles.cta}>
            <Magnetic>
              <Link href="/#contact" className="btn btn--primary btn--small">
                Démarrer un projet
                <ArrowUpRight size={16} />
              </Link>
            </Magnetic>
          </div>

          <button
            type="button"
            className={styles.burger}
            aria-label="Ouvrir le menu"
            aria-expanded={menuOpen}
            aria-controls="menu-mobile"
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={26} />
          </button>
        </div>
      </header>

      <div
        id="menu-mobile"
        className={`${styles.mobileMenu} ${menuOpen ? styles.mobileOpen : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        inert={!menuOpen}
      >
        <button
          type="button"
          className={styles.close}
          aria-label="Fermer le menu"
          onClick={close}
        >
          <X size={24} />
        </button>

        <nav className={styles.mobileLinks} aria-label="Navigation mobile">
          {navLinks.map((link, index) => (
            <Link
              key={link.id}
              href={`/#${link.id}`}
              onClick={close}
              style={{ transitionDelay: `${80 + index * 60}ms` }}
            >
              <small>0{index + 1}</small>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles.mobileFooter}>
          <Link href="/#contact" className="btn btn--primary" onClick={close}>
            Démarrer un projet
            <ArrowUpRight size={18} />
          </Link>

          <div className={styles.socials}>
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
              >
                {socialIcons[social.label]}
              </a>
            ))}

            <a href={`mailto:${site.email}`} aria-label="Email">
              <Mail size={18} />
            </a>
          </div>

          <p>Disponible pour vos projets · Réponse sous 24 h</p>
        </div>
      </div>
    </>
  );
}
