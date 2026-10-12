"use client";

import { useRef } from "react";
import { useReveal } from "../lib/useReveal";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Délai en ms, pour décaler les éléments d'un même groupe */
  delay?: number;
  /** Attend la fin de l'intro au premier chargement */
  afterIntro?: boolean;
  /** Style d'apparition (voir globals.css) */
  variant?: "up" | "scale" | "left" | "right" | "clip" | "blur";
};

export default function Reveal({
  children,
  className = "",
  delay = 0,
  afterIntro = false,
  variant = "up",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useReveal(ref, { delay, afterIntro });

  return (
    <div ref={ref} className={`reveal ${className}`} data-v={variant}>
      {children}
    </div>
  );
}
