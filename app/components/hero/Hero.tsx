"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./Hero.module.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const subtitleRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);


  useEffect(() => {
    const ctx = gsap.context(() => {

      const playAnimation = () => {

        gsap.set(
          [
            subtitleRef.current,
            titleRef.current,
            textRef.current,
          ],
          {
            clearProps: "all",
          }
        );

        const tl = gsap.timeline();

        tl.from(subtitleRef.current, {
          y: 40,
          opacity: 0,
          duration: 0.6,
        })
          .from(
            titleRef.current,
            {
              y: 80,
              opacity: 0,
              duration: 0.9,
            },
            "-=0.2"
          )
          .from(
            textRef.current,
            {
              y: 30,
              opacity: 0,
              duration: 0.6,
            },
            "-=0.3"
          )
          ;
      };

      playAnimation();

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            playAnimation();
            ScrollTrigger.create({
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true,

              animation: gsap.to(sectionRef.current, {
                opacity: 0,
                y: 120,
                ease: "none",
              }),
            });
          }
        },
        {
          threshold: 0.8,
        }
      );

      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }

      return () => observer.disconnect();

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      className={styles.hero}
      ref={sectionRef}
    >
      <div className={styles.content}>

        <span
          ref={subtitleRef}
          className={styles.subtitle}
        >
          DESIGNER • GRAPHISTE • BRANDING
        </span>

        <h1 ref={titleRef}>
          L'ARTISTE
          <br />
          VISUEL
        </h1>

        <p ref={textRef}>
          Je crée des identités visuelles,
          des logos,
          des affiches
          et des expériences graphiques.
        </p>
        <div className={styles.scrollIndicator}>
          ↓
        </div>


      </div>
    </section>
  );
}