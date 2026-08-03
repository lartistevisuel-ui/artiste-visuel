"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./LaEsquina.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function numberonePage() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const galleryRef = useRef<HTMLDivElement>(null);
    const heroImageRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (galleryRef.current) {
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
        }

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
                    src="/images/la-esquina/hero.jpg"
                    alt="La Esquina"
                    className={styles.heroImage}
                />

                <div className={styles.overlay}>

                    <div className={styles.heroContent}>

                        <h1 className={styles.title}>
                           NUMBER ONE 
                        </h1>

                        <p className={styles.subtitle}>
                            Identité visuelle • Branding • Packaging
                        </p>

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
                    Une identité visuelle pensée
                    <br />
                    pour marquer les esprits.
                </h2>

                <p className={styles.text}>
                    number one  est un projet de branding imaginé pour un restaurant
                    moderne. L'objectif était de créer une identité forte, premium
                    et facilement reconnaissable à travers le logo, les menus,
                    le packaging et les supports de communication.
                </p>

            </section>
            {/* SERVICES */}

            <section className={styles.section}>

                <span className={styles.sectionTitle}>
                    Services réalisés
                </span>

                <div className={styles.services}>

                    {[
                        "Logo",
                        "Identité visuelle",
                        "Packaging",
                        "Menus",
                        "Flyers",
                        "Site internet",
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
                        "/images/la-esquina/image1.jpg",
                        "/images/la-esquina/image2.jpg",
                        "/images/la-esquina/image3.jpg",
                        "/images/la-esquina/image4.jpg",
                    ].map((image) => (

                        <img
                            key={image}
                            src={image}
                            alt="La Esquina"
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
                        alt="Projet"

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