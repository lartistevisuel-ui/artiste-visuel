import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Reveal from "../components/Reveal";
import AnimatedTitle from "../components/motion/AnimatedTitle";
import Fx from "../components/motion/Fx";
import Magnetic from "../components/motion/Magnetic";
import ProjectGallery from "./ProjectGallery";
import { getProject, projects } from "./projects";
import styles from "./project.module.css";

export function projectMetadata(slug: string): Metadata {
  const { project } = getProject(slug);

  return {
    title: `${project.title} — ${project.tags[0]}`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [{ url: project.hero.src, width: project.hero.width, height: project.hero.height }],
    },
  };
}

export default function ProjectPage({ slug }: { slug: string }) {
  const { project, index, next } = getProject(slug);

  return (
    <main className={styles.main}>
      {/* HERO */}

      <section className={`container ${styles.hero}`}>
        <div className={styles.heroText}>
          <Reveal variant="left">
            <Link href="/#portfolio" className={styles.back}>
              <ArrowLeft size={18} />
              Retour au portfolio
            </Link>
          </Reveal>

          <Reveal delay={80} variant="left">
            <span className="eyebrow">
              <b>
                0{index + 1} / 0{projects.length}
              </b>{" "}
              Projet
            </span>
          </Reveal>

          <AnimatedTitle
            as="h1"
            chars
            delay={160}
            className={styles.title}
            segments={[project.title]}
          />

          <Reveal delay={520}>
            <ul className={styles.tags}>
              {project.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={200} variant="clip" className={styles.heroScene}>
          <Fx scroll="exit" pointer className={styles.heroTilt}>
            <div className={styles.heroMedia}>
              <Image
                src={project.hero}
                alt={`Projet ${project.title}`}
                sizes="(max-width: 900px) 92vw, 560px"
                placeholder="blur"
                preload
              />
            </div>
          </Fx>
        </Reveal>
      </section>

      {/* PRESENTATION */}

      <section className={`container ${styles.presentation}`}>
        <div>
          <Reveal variant="left">
            <span className="eyebrow">Présentation</span>
          </Reveal>

          <AnimatedTitle className={styles.heading} segments={[project.headline]} />
        </div>

        <Reveal delay={240} className={styles.details}>
          <p className="lead">{project.description}</p>

          <h3>Services réalisés</h3>

          <ul className={styles.services}>
            {project.services.map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* GALERIE */}

      <section className={`container ${styles.gallerySection}`}>
        <Reveal variant="left">
          <span className="eyebrow">Galerie</span>
        </Reveal>

        <AnimatedTitle className={styles.heading} segments={["Découvrez le projet"]} />

        <ProjectGallery images={project.gallery} title={project.title} />
      </section>

      {/* SUITE */}

      <section className={`container ${styles.bottom}`}>
        <Reveal>
          <Link
            href={`/portfolio/${next.slug}`}
            className={styles.next}
            data-cursor="Suivant"
          >
            <span>Projet suivant</span>

            <strong>
              {next.title}
              <ArrowUpRight size={40} strokeWidth={1.5} />
            </strong>
          </Link>
        </Reveal>

        <Reveal delay={120} className={styles.cta}>
          <p>Un projet du même genre en tête&nbsp;?</p>

          <Magnetic>
            <Link href="/#contact" className="btn btn--primary">
              Démarrer un projet
              <ArrowUpRight size={18} />
            </Link>
          </Magnetic>
        </Reveal>
      </section>
    </main>
  );
}
