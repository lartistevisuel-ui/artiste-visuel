import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "../../portfolio/projects";
import Reveal from "../Reveal";
import AnimatedTitle from "../motion/AnimatedTitle";
import Fx from "../motion/Fx";
import styles from "./Portfolio.module.css";

export default function Portfolio() {
  return (
    <section id="portfolio" className={`section ${styles.portfolio}`}>
      <div className="container">
        <div className={styles.head}>
          <div>
            <Reveal variant="left">
              <span className="eyebrow">
                <b>02</b> Portfolio
              </span>
            </Reveal>

            <AnimatedTitle
              className="section-title"
              segments={["Mes dernières", { accent: "créations" }]}
            />
          </div>

          <Reveal delay={240}>
            <p className="lead">
              Une sélection de projets de branding, de logos et de supports
              imprimés.
            </p>
          </Reveal>
        </div>

        <div className={styles.grid}>
          {projects.map((project, index) => (
            <Reveal key={project.slug} delay={(index % 2) * 140} variant="scale">
              <Fx scroll="through" pointer className={styles.scene}>
                <Link
                  href={`/portfolio/${project.slug}`}
                  className={styles.card}
                  data-cursor="Voir"
                >
                  <span className={styles.glare} />

                  <div className={styles.media}>
                  <Image
                    src={project.thumb}
                    alt={`Projet ${project.title}`}
                    sizes="(max-width: 768px) 92vw, 600px"
                  />
                </div>

                <div className={styles.info}>
                  <span className={styles.number}>0{index + 1}</span>

                  <div className={styles.text}>
                    <h3>{project.title}</h3>
                    <p>{project.tags.join(" · ")}</p>
                  </div>

                  <span className={styles.arrow}>
                    <ArrowUpRight size={22} />
                  </span>
                </div>
                </Link>
              </Fx>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
