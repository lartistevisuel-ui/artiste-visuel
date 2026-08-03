"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./LuxuryLogo.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function LuxuryLogoPage() {

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
                scale: .95,
            },

            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: .8,
                stagger: .15,
                ease: "power3.out",

                scrollTrigger: {
                    trigger: galleryRef.current,
                    start: "top 80%",
                }

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
                    src="/images/luxury-logo/hero.jpg"
                    alt="Luxury Logo"
                    className={styles.heroImage}
                />

                <div className={styles.overlay}>

                    <div className={styles.heroContent}>

                        <h1 className={styles.title}>
                            LUXURY LOGO
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
                            Création d'identité visuelle • Premium
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
                    Un logo conçu pour durer
                    <br />
                    avec une identité haut de gamme.
                </h2>

                <p className={styles.text}>
                    Luxury Logo est un projet de création
                    d'identité visuelle destiné aux marques
                    souhaitant transmettre une image élégante,
                    moderne et intemporelle.
                </p>

            </section>
            {/* SERVICES */}

            <section className={styles.section}>

                <span className={styles.sectionTitle}>
                    Services réalisés
                </span>

                <div className={styles.services}>

                    {[
                        "Recherche créative",
                        "Création du logo",
                        "Palette de couleurs",
                        "Typographie",
                        "Charte graphique",
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
                        "/images/luxury-logo/logo1.jpg",
                        "/images/luxury-logo/logo2.jpg",
                        "/images/luxury-logo/logo3.jpg",
                        "/images/luxury-logo/logo4.jpg",
                    ].map((image) => (

                        <img
                            key={image}
                            src={image}
                            alt="Luxury Logo"
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
                        alt="Luxury Logo"

                        style={{
                            maxWidth: "92%",
                            maxHeight: "90vh",
                            borderRadius: "20px",
                            boxShadow: "0 0 60px rgba(0,0,0,.6)",
                        }}
                    />

                </div>

            )}
            {/* NAVIGATION */}

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