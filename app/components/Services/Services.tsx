"use client";

import styles from "./Services.module.css";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
    Palette,
    PenTool,
    FileText,
    UtensilsCrossed,
    Smartphone,
    Globe,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
    {
        icon: <Palette size={42} strokeWidth={1.8} />,
        title: "Identité visuelle",
        text: "Création d'une identité graphique forte et cohérente.",
    },
    {
        icon: <PenTool size={42} strokeWidth={1.8} />,
        title: "Logo",
        text: "Logos modernes, professionnels et mémorables.",
    },
    {
        icon: <FileText size={42} strokeWidth={1.8} />,
        title: "Flyers",
        text: "Affiches, flyers et supports publicitaires.",
    },
    {
        icon: <UtensilsCrossed size={42} strokeWidth={1.8} />,
        title: "Menus",
        text: "Menus premium pour restaurants et snacks.",
    },
    {
        icon: <Smartphone size={42} strokeWidth={1.8} />,
        title: "Réseaux sociaux",
        text: "Visuels pour Instagram, Facebook et TikTok.",
    },
    {
        icon: <Globe size={42} strokeWidth={1.8} />,
        title: "Sites web",
        text: "Création de sites modernes et immersifs.",
    },
];

export default function Services() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        gsap.fromTo(
            sectionRef.current.querySelectorAll(".service-card"),
            {
                opacity: 0,
                y: 60,
                scale: 0.95,
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.7,
                stagger: 0.12,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                    toggleActions: "play none none reverse",
                },
            }
        );
    }, []);

    return (
        <section
            id="services"
            ref={sectionRef}
            className={styles.services}
        >
            <span className={styles.subtitle}>SERVICES</span>

            <h2>Ce que je peux créer pour vous</h2>

            <div className={styles.grid}>
                {services.map((service, index) => (
                    <div
                        key={index}
                        className={`${styles.card} service-card`}
                    >
                        <div className={styles.icon}>
                            {service.icon}
                        </div>

                        <h3>{service.title}</h3>

                        <p>{service.text}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}