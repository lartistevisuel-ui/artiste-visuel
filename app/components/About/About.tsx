"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./About.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
    const sectionRef = useRef<HTMLElement>(null);
    useEffect(() => {
  if (!sectionRef.current) return;

  gsap.fromTo(
    sectionRef.current,
    {
      opacity: 0,
      y: 80,
    },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
    }
  );
}, []);
    return (
        <section id="about" className={styles.about} ref={sectionRef}>

            <span>À PROPOS</span>

            <h2>
                Je transforme les idées
                en identités visuelles.
            </h2>

            <p>
                Je conçois des logos, des affiches,
                des flyers, des identités visuelles
                et des expériences graphiques
                modernes pour les entreprises
                et les créateurs.
            </p>
            <div className={styles.scroll}>
                ↓
            </div>

        </section>
    );
}
