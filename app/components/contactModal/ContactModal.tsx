"use client";

import { useState } from "react";
import styles from "./ContactModal.module.css";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function ContactModal({
  open,
  onClose,
}: Props) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  if (!open) return null;

  async function handleSubmit() {

    if (!name || !email || !message) {
      alert("Merci de remplir les champs obligatoires.");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        message,
      }),
    });

    setLoading(false);

    if (res.ok) {

      alert("✅ Votre demande a été envoyée.");

      setName("");
      setEmail("");
      setPhone("");
      setMessage("");

      onClose();

    } else {

      alert("❌ Une erreur est survenue.");

    }
  }

  return (
    <div className={styles.overlay}>

      <div className={styles.modal}>

        <button
          className={styles.close}
          onClick={onClose}
        >
          ✕
        </button>

        <h2>Démarrer un projet</h2>

        <input
          type="text"
          placeholder="Nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="text"
          placeholder="Téléphone (optionnel)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <textarea
          placeholder="Décrivez votre projet..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button
          className={styles.send}
          onClick={handleSubmit}
        >
          {loading ? "Envoi..." : "Envoyer"}
        </button>

      </div>

    </div>
  );
}