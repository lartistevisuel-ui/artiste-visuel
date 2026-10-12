"use client";

import { useState } from "react";
import { ArrowUpRight, CircleCheck } from "lucide-react";
import styles from "./Contact.module.css";

type Status = "idle" | "sending" | "success" | "error";

const emptyForm = { name: "", email: "", phone: "", message: "", website: "" };

export default function ContactForm() {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const update =
    (field: keyof typeof emptyForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "");
      }

      setForm(emptyForm);
      setStatus("success");
    } catch (err) {
      setError(
        (err instanceof Error && err.message) ||
          "Une erreur est survenue. Réessayez ou écrivez-moi directement par email."
      );
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className={`${styles.form} ${styles.success}`} role="status">
        <CircleCheck size={44} strokeWidth={1.5} />
        <h3>Message envoyé</h3>
        <p>Merci&nbsp;! Je reviens vers vous sous 24&nbsp;h.</p>

        <button
          type="button"
          className="btn btn--ghost"
          onClick={() => setStatus("idle")}
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label className={styles.field}>
          <span>Nom</span>
          <input
            type="text"
            name="name"
            autoComplete="name"
            required
            maxLength={100}
            value={form.name}
            onChange={update("name")}
          />
        </label>

        <label className={styles.field}>
          <span>Email</span>
          <input
            type="email"
            name="email"
            autoComplete="email"
            required
            maxLength={200}
            value={form.email}
            onChange={update("email")}
          />
        </label>
      </div>

      <label className={styles.field}>
        <span>
          Téléphone <small>(optionnel)</small>
        </span>
        <input
          type="tel"
          name="phone"
          autoComplete="tel"
          maxLength={40}
          value={form.phone}
          onChange={update("phone")}
        />
      </label>

      <label className={styles.field}>
        <span>Votre projet</span>
        <textarea
          name="message"
          required
          minLength={10}
          maxLength={5000}
          placeholder="Logo, menu, site web… décrivez votre besoin en quelques lignes."
          value={form.message}
          onChange={update("message")}
        />
      </label>

      {/* Champ piège anti-robots, invisible pour les visiteurs */}
      <div className={styles.trap} aria-hidden="true">
        <label>
          Site web
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={form.website}
            onChange={update("website")}
          />
        </label>
      </div>

      {status === "error" && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        className="btn btn--primary"
        disabled={status === "sending"}
      >
        {status === "sending" ? "Envoi en cours…" : "Envoyer ma demande"}
        <ArrowUpRight size={18} />
      </button>
    </form>
  );
}
