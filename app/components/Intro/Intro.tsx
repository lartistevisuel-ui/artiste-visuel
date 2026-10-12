"use client";

import Image from "next/image";
import logo from "@/public/images/logo-transparent.webp";
import styles from "./Intro.module.css";

// Rideau d'ouverture : joué une seule fois par chargement complet du site.
export default function Intro() {
  return (
    <div
      className={styles.intro}
      aria-hidden="true"
      onAnimationEnd={(e) => {
        if (e.target === e.currentTarget) {
          document.documentElement.dataset.introDone = "1";
        }
      }}
    >
      <Image
        src={logo}
        alt=""
        width={180}
        height={180}
        className={styles.logo}
        preload
      />

      <span className={styles.bar} />
    </div>
  );
}
