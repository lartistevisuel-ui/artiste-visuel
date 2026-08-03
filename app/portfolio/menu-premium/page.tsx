"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./menupremium.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function menuPremiumPage() {

  const [selectedImage, setSelectedImage] =
    useState<string | null>(null);

  const galleryRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {

    if (!galleryRef.current) return;

    gsap.fromTo(

      galleryRef.current.children,

      {
        opacity: 0,
        y: 80,
        scale: 0.95,
      },

      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",

        scrollTrigger: {
          trigger: galleryRef.current,
          start: "top 80%",
        },

      }

    );

    if (heroImageRef.current) {

      gsap.to(heroImageRef.current, {

        y: 180,

        ease: "none",

        scrollTrigger: {

          trigger: heroImageRef.current,

          start: "top top",

          end: "bottom top",

          scrub: true,

        },

      });

    }

  }, []);

  return (

    <main className={styles.main}>

      {/* HERO */}

      <section className={styles.hero}>

        <img
          ref={heroImageRef}
          src="/images/menu-premium/hero.jpg"
          alt="Menu Premium"
          className={styles.heroImage}
        />

        <div className={styles.overlay}>

          <div className={styles.heroContent}>

            <h1 className={styles.title}>
              MENU PREMIUM
            </h1>

            <button
              className={styles.discover}
              onClick={() => {
                document
                  .getElementById("presentation")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  });
              }}
            >
              Découvrir le projet ↓
            </button>

            <p className={styles.subtitle}>
              Design de menu • Identité visuelle • Impression
            </p>

          </div>

        </div>

      </section>

      {/* PRESENTATION */}

      <section
        id="presentation"
        className={styles.section}
      >

        <span className={styles.sectionTitle}>
          Présentation
        </span>

        <h2 className={styles.heading}>
          Un menu pensé pour séduire
          <br />
          avant même la première commande.
        </h2>

        <p className={styles.text}>
          Menu Premium est un projet de design graphique destiné à
          valoriser l'identité d'un restaurant. Chaque page est
          conçue pour mettre en avant les produits, améliorer
          l'expérience client et renforcer l'image de marque grâce
          à une mise en page moderne et élégante.
        </p>

      </section>
      {/* SERVICES */}

      <section className={styles.section}>

        <span className={styles.sectionTitle}>
          Services réalisés
        </span>

        <div className={styles.services}>

          {[
            "Conception du menu",
            "Design graphique",
            "Mise en valeur des produits",
            "Préparation pour l'impression",
            "Version numérique",
            "Mockups",
          ].map((item) => (

            <div
              key={item}
              className={styles.card}
            >
              <h3>{item}</h3>
            </div>

          ))}

        </div>

      </section>

      {/* GALERIE */}

      <section className={styles.section}>

        <span className={styles.sectionTitle}>
          Galerie
        </span>

        <h2 className={styles.heading}>
          Découvrez le projet
        </h2>

        <div
          ref={galleryRef}
          className={styles.gallery}
        >

          {[
            "/images/menu-premium/menu1.jpg",
            "/images/menu-premium/menu2.jpg",
            "/images/menu-premium/menu3.jpg",
            "/images/menu-premium/menu4.jpg",
          ].map((image) => (

            <img
              key={image}
              src={image}
              alt="Menu Premium"
              onClick={() => setSelectedImage(image)}
            />

          ))}

        </div>

      </section>

      {/* LIGHTBOX */}

      {selectedImage && (

        <div
          onClick={() => setSelectedImage(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,.95)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 99999,
            cursor: "zoom-out",
          }}
        >

          <img
            src={selectedImage}
            alt="Menu Premium"

            style={{
              maxWidth: "92%",
              maxHeight: "90vh",
              borderRadius: "20px",
              boxShadow: "0 0 60px rgba(0,0,0,.6)",
            }}
          />

        </div>

      )}            {/* NAVIGATION */}

      <section className={styles.section}>

        <div className={styles.bottom}>

          <a href="/#portfolio">
            ← Retour au Portfolio
          </a>

        </div>

      </section>

    </main>

  );

}