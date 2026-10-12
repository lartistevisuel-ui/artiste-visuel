import Reveal from "../Reveal";
import AnimatedTitle from "../motion/AnimatedTitle";
import styles from "./Process.module.css";

const steps = [
  {
    title: "Échange",
    text: "Vous me présentez votre projet, vos goûts et vos objectifs.",
  },
  {
    title: "Proposition",
    text: "Je vous propose une direction créative et un devis clair.",
  },
  {
    title: "Création",
    text: "Je conçois vos visuels et je les ajuste avec vos retours.",
  },
  {
    title: "Livraison",
    text: "Vous recevez les fichiers finaux, prêts pour l'impression et le web.",
  },
];

export default function Process() {
  return (
    <section id="process" className={`section ${styles.process}`}>
      <div className="container">
        <Reveal variant="left">
          <span className="eyebrow">
            <b>04</b> Méthode
          </span>
        </Reveal>

        <AnimatedTitle
          className="section-title"
          segments={["De l'idée au", { accent: "résultat" }]}
        />

        <ol className={styles.steps}>
          {steps.map((step, index) => (
            <li key={step.title}>
              <Reveal delay={index * 220} className={styles.step}>
                <span className={styles.number}>0{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
