"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Portfolio.module.css";

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        title: "My Food",
        image: "/portfolio/projet1.webp",
        link: "/portfolio/my-food",
    },
    {
        title: "Number one",
        image: "/portfolio/projet2.webp",
        link: "/portfolio/number-one",
    },
    {
        title: "Luxury Logo",
        image: "/portfolio/projet3.webp",
        link: "/portfolio/luxury-logo",
    },
    {
        title: "Menu Premium",
        image: "/portfolio/projet4.webp",
        link: "/portfolio/menu-premium",
    },
];

export default function Portfolio() {
    const sectionRef = useRef<HTMLElement>(null);
    useEffect(() => {
        if (!sectionRef.current) return;

        gsap.fromTo(
            sectionRef.current.querySelectorAll(`.${styles.card}`),
            {
                opacity: 0,
                y: 80,
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                    toggleActions: "play none none reverse",
                },
            }
        );
    }, []);
    return (
        <section id="portfolio" className={styles.portfolio} ref={sectionRef}>
            <span className={styles.subtitle}>PORTFOLIO</span>

            <h2>Mes dernières créations</h2>

            <div className={styles.grid}>
                {projects.map((project, index) => (
                    <a
                        key={index}
                        className={styles.card}
                        href={project.link}
                        onMouseMove={(e) => {
                            const card = e.currentTarget;

                            const rect = card.getBoundingClientRect();

                            const x = e.clientX - rect.left;
                            const y = e.clientY - rect.top;

                            const rotateY = ((x / rect.width) - 0.5) * 14;
                            const rotateX = ((y / rect.height) - 0.5) * -14;

                            card.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                scale(1.03)
              `;
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform =
                                "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
                        }}
                    >
                        <img src={project.image} alt={project.title} />

                        <div className={styles.overlay}>
                            <h3>{project.title}</h3>

                            <div className={styles.viewProject}>
                                <span>Voir le projet</span>
                                <span>→</span>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
}