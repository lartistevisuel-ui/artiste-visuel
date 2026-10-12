import type { StaticImageData } from "next/image";

import thumbMyFood from "@/public/portfolio/projet1.webp";
import thumbNumberOne from "@/public/portfolio/projet2.webp";
import thumbLuxuryLogo from "@/public/portfolio/projet3.webp";
import thumbMenuPremium from "@/public/portfolio/projet4.webp";

import myFoodHero from "@/public/images/my-food/hero.webp";
import myFood1 from "@/public/images/my-food/image1.webp";
import myFood2 from "@/public/images/my-food/image2.webp";
import myFood3 from "@/public/images/my-food/image3.webp";
import myFood4 from "@/public/images/my-food/image4.webp";

import numberOneHero from "@/public/images/la-esquina/hero.webp";
import numberOne1 from "@/public/images/la-esquina/image1.webp";
import numberOne2 from "@/public/images/la-esquina/image2.webp";
import numberOne3 from "@/public/images/la-esquina/image3.webp";
import numberOne4 from "@/public/images/la-esquina/image4.webp";

import luxuryHero from "@/public/images/luxury-logo/hero.webp";
import luxury2 from "@/public/images/luxury-logo/logo2.webp";
import luxury3 from "@/public/images/luxury-logo/logo3.webp";
import luxury4 from "@/public/images/luxury-logo/logo4.webp";

import menuHero from "@/public/images/menu-premium/hero.webp";
import menu1 from "@/public/images/menu-premium/menu1.webp";
import menu2 from "@/public/images/menu-premium/menu2.webp";
import menu3 from "@/public/images/menu-premium/menu3.webp";
import menu4 from "@/public/images/menu-premium/menu4.webp";

export type Project = {
  slug: string;
  title: string;
  tags: string[];
  headline: string;
  description: string;
  services: string[];
  thumb: StaticImageData;
  hero: StaticImageData;
  gallery: StaticImageData[];
};

export const projects: Project[] = [
  {
    slug: "my-food",
    title: "My Food",
    tags: ["Identité visuelle", "Branding", "Packaging"],
    headline: "Une identité visuelle pensée pour marquer les esprits.",
    description:
      "My Food est un projet de branding imaginé pour un restaurant moderne. L'objectif était de créer une identité forte, premium et facilement reconnaissable à travers le logo, les menus, le packaging et les supports de communication.",
    services: [
      "Logo",
      "Identité visuelle",
      "Packaging",
      "Menus",
      "Flyers",
      "Site internet",
    ],
    thumb: thumbMyFood,
    hero: myFoodHero,
    gallery: [myFood1, myFood2, myFood3, myFood4],
  },
  {
    slug: "number-one",
    title: "Number One",
    tags: ["Identité visuelle", "Branding", "Packaging"],
    headline: "Une identité visuelle pensée pour marquer les esprits.",
    description:
      "Number One est un projet de branding imaginé pour un restaurant moderne. L'objectif était de créer une identité forte, premium et facilement reconnaissable à travers le logo, les menus, le packaging et les supports de communication.",
    services: [
      "Logo",
      "Identité visuelle",
      "Packaging",
      "Menus",
      "Flyers",
      "Site internet",
    ],
    thumb: thumbNumberOne,
    hero: numberOneHero,
    gallery: [numberOne1, numberOne2, numberOne3, numberOne4],
  },
  {
    slug: "luxury-logo",
    title: "Luxury Logo",
    tags: ["Création de logo", "Identité premium"],
    headline: "Un logo conçu pour durer, avec une identité haut de gamme.",
    description:
      "Luxury Logo est un projet de création d'identité visuelle destiné aux marques souhaitant transmettre une image élégante, moderne et intemporelle.",
    services: [
      "Recherche créative",
      "Création du logo",
      "Palette de couleurs",
      "Typographie",
      "Charte graphique",
      "Mockups",
    ],
    thumb: thumbLuxuryLogo,
    hero: luxuryHero,
    gallery: [luxury2, luxury3, luxury4],
  },
  {
    slug: "menu-premium",
    title: "Menu Premium",
    tags: ["Design de menu", "Identité visuelle", "Impression"],
    headline: "Un menu pensé pour séduire avant même la première commande.",
    description:
      "Menu Premium est un projet de design graphique destiné à valoriser l'identité d'un restaurant. Chaque page est conçue pour mettre en avant les produits, améliorer l'expérience client et renforcer l'image de marque grâce à une mise en page moderne et élégante.",
    services: [
      "Conception du menu",
      "Design graphique",
      "Mise en valeur des produits",
      "Préparation pour l'impression",
      "Version numérique",
      "Mockups",
    ],
    thumb: thumbMenuPremium,
    hero: menuHero,
    gallery: [menu1, menu2, menu3, menu4],
  },
];

export function getProject(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);

  if (index === -1) throw new Error(`Projet inconnu : ${slug}`);

  return {
    project: projects[index],
    index,
    next: projects[(index + 1) % projects.length],
  };
}
