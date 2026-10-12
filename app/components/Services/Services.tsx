import {
  FileText,
  Globe,
  Palette,
  PenTool,
  Smartphone,
  UtensilsCrossed,
} from "lucide-react";
import Reveal from "../Reveal";
import AnimatedTitle from "../motion/AnimatedTitle";
import Fx from "../motion/Fx";
import styles from "./Services.module.css";

const services = [
  {
    icon: <Palette size={30} strokeWidth={1.6} />,
    title: "Identité visuelle",
    text: "Création d'une identité graphique forte et cohérente.",
  },
  {
    icon: <PenTool size={30} strokeWidth={1.6} />,
    title: "Logo",
    text: "Logos modernes, professionnels et mémorables.",
  },
  {
    icon: <FileText size={30} strokeWidth={1.6} />,
    title: "Flyers & affiches",
    text: "Affiches, flyers et supports publicitaires.",
  },
  {
    icon: <UtensilsCrossed size={30} strokeWidth={1.6} />,
    title: "Menus",
    text: "Menus premium pour restaurants et snacks.",
  },
  {
    icon: <Smartphone size={30} strokeWidth={1.6} />,
    title: "Réseaux sociaux",
    text: "Visuels pour Instagram, Facebook et TikTok.",
  },
  {
    icon: <Globe size={30} strokeWidth={1.6} />,
    title: "Sites web",
    text: "Création de sites modernes et immersifs.",
  },
];

export default function Services() {
  return (
    <section id="services" className={`section ${styles.services}`}>
      <div className="container">
        <Reveal variant="left">
          <span className="eyebrow">
            <b>03</b> Services
          </span>
        </Reveal>

        <AnimatedTitle
          className="section-title"
          segments={["Ce que je peux", { accent: "créer" }, "pour vous"]}
        />

        <div className={styles.grid}>
          {services.map((service, index) => (
            <Reveal key={service.title} delay={(index % 3) * 120} variant="scale">
              <Fx pointer className={styles.spot}>
                <article className={styles.card}>
                <div className={styles.cardTop}>
                  <div className={styles.icon}>{service.icon}</div>
                  <span className={styles.number}>0{index + 1}</span>
                </div>

                <h3>{service.title}</h3>

                <p>{service.text}</p>
                </article>
              </Fx>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
