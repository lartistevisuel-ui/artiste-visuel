import { Layers, MessagesSquare, Target } from "lucide-react";
import Reveal from "../Reveal";
import AnimatedTitle from "../motion/AnimatedTitle";
import styles from "./About.module.css";

const pillars = [
  {
    icon: <Target size={26} strokeWidth={1.7} />,
    title: "Sur mesure",
    text: "Chaque création part de votre activité, de votre public et de vos objectifs.",
  },
  {
    icon: <Layers size={26} strokeWidth={1.7} />,
    title: "Du logo au site web",
    text: "Un seul interlocuteur pour toute votre image : identité, imprimés, réseaux sociaux et web.",
  },
  {
    icon: <MessagesSquare size={26} strokeWidth={1.7} />,
    title: "Réactif",
    text: "Une réponse sous 24 h et des échanges simples tout au long du projet.",
  },
];

export default function About() {
  return (
    <section id="about" className={`section ${styles.about}`}>
      <div className="container">
        <div className={styles.top}>
          <div>
            <Reveal variant="left">
              <span className="eyebrow">
                <b>01</b> À propos
              </span>
            </Reveal>

            <AnimatedTitle
              className="section-title"
              segments={["Je transforme les idées en", { accent: "identités visuelles." }]}
            />
          </div>

          <Reveal delay={260} className={styles.intro}>
            <p className="lead">
              Je conçois des logos, des affiches, des flyers, des identités
              visuelles et des expériences graphiques modernes pour les
              entreprises et les créateurs.
            </p>

            <p className="lead">
              Mon objectif&nbsp;: que votre marque soit reconnue au premier coup
              d&apos;œil, sur une vitrine comme sur un écran.
            </p>
          </Reveal>
        </div>

        <div className={styles.pillars}>
          {pillars.map((pillar, index) => (
            <Reveal key={pillar.title} delay={index * 130} className={styles.pillar}>
              <div className={styles.icon}>{pillar.icon}</div>
              <h3>{pillar.title}</h3>
              <p>{pillar.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
