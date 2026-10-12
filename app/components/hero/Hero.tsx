import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import logo from "@/public/images/logo-transparent.webp";
import Reveal from "../Reveal";
import AnimatedTitle from "../motion/AnimatedTitle";
import Fx from "../motion/Fx";
import Magnetic from "../motion/Magnetic";
import styles from "./Hero.module.css";

const creations = [
  "des logos.",
  "des identités.",
  "des affiches.",
  "des menus.",
  "des sites web.",
];

export default function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      <Fx scroll="exit" pointer className={`container ${styles.inner}`}>
        <div className={styles.content}>
          <Reveal afterIntro variant="left">
            <span className="eyebrow">Designer graphique · Branding · Web</span>
          </Reveal>

          <AnimatedTitle
            as="h1"
            chars
            afterIntro
            delay={120}
            className={styles.title}
            segments={["L'Artiste", "\n", { accent: "Visuel" }]}
          />

          <Reveal afterIntro delay={620}>
            <p className={styles.rotator}>
              Je crée{" "}
              <span className={styles.words}>
                <span className={styles.wordsTrack}>
                  {[...creations, creations[0]].map((word, index) => (
                    <span key={index} aria-hidden={index === creations.length}>
                      {word}
                    </span>
                  ))}
                </span>
              </span>
            </p>

            <p className={styles.text}>
              Je donne à votre marque une image qui se remarque et dont on se
              souvient.
            </p>
          </Reveal>

          <Reveal afterIntro delay={760} className={styles.actions}>
            <Magnetic>
              <Link href="/#contact" className="btn btn--primary">
                Démarrer un projet
                <ArrowUpRight size={18} />
              </Link>
            </Magnetic>

            <Magnetic>
              <Link href="/#portfolio" className="btn btn--ghost">
                Voir les créations
              </Link>
            </Magnetic>
          </Reveal>

          <Reveal afterIntro delay={880} className={styles.status}>
            <span className={styles.dot} />
            Disponible pour vos projets — réponse sous 24&nbsp;h
          </Reveal>
        </div>

        <Reveal afterIntro delay={260} variant="scale" className={styles.visual}>
          <div className={styles.stage}>
            <div className={styles.halo} />
            <div className={styles.ring} />
            <div className={`${styles.ring} ${styles.ringOuter}`} />

            <Image
              src={logo}
              alt="Logo L'Artiste Visuel"
              sizes="(max-width: 960px) 70vw, 520px"
              className={styles.logo}
              preload
            />

            <svg className={styles.badge} viewBox="0 0 200 200" aria-hidden="true">
              <defs>
                <path
                  id="badge-circle"
                  d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0"
                />
              </defs>
              <text>
                <textPath href="#badge-circle" textLength="484">
                  LOGO ✦ BRANDING ✦ AFFICHES ✦ MENUS ✦ WEB ✦
                </textPath>
              </text>
            </svg>
          </div>
        </Reveal>
      </Fx>

      <a href="#about" className={styles.scroll} aria-label="Défiler vers la suite">
        <ArrowDown size={18} />
      </a>
    </section>
  );
}
