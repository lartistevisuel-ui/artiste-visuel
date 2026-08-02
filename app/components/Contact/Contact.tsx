"use client";

import styles from "./Contact.module.css";

export default function Contact() {
  return (
    <section id="contact" className={styles.contact}>

      <span className={styles.subtitle}>CONTACT</span>

      <h2>Parlons de votre projet.</h2>

      <p>
        Vous avez un projet de logo, de branding, de site web ou de communication ?
        Contactez-moi et créons quelque chose d'unique ensemble.
      </p>

      <a
        href="mailto:contact@tonsite.com"
        className={styles.button}
      >
        Me contacter →
      </a>

    </section>
  );
}