"use client";

import { useState } from "react";
import styles from "./Contact.module.css";
import ContactModal from "../contactModal/ContactModal";

export default function Contact() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section id="contact" className={styles.contact}>

        <span className={styles.subtitle}>
          CONTACT
        </span>

        <h2>Parlons de votre projet.</h2>

        <p>
          Vous avez un projet de logo, de branding,
          de site web ou de communication ?
          Contactez-moi et créons quelque chose
          d'unique ensemble.
        </p>

        <button
          className={styles.button}
          onClick={() => setOpen(true)}
        >
          Démarrer un projet →
        </button>

      </section>

      <ContactModal
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}