"use client";

import { useEffect, useRef } from "react";
import { hasFinePointer, prefersReducedMotion, trackScroll } from "../../lib/scroll";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Expose --p (0 à 1) selon la position de l'élément dans l'écran */
  scroll?: "through" | "exit";
  /** Expose la position de la souris : --mx/--my (0 à 1) et --tx/--ty (-1 à 1) */
  pointer?: boolean;
};

// Enveloppe qui fournit des variables CSS d'animation à ses enfants.
// Le rendu visuel est entièrement décrit dans les fichiers CSS.
export default function Fx({ children, className = "", scroll, pointer = false }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !scroll || prefersReducedMotion()) return;

    return trackScroll(el, scroll);
  }, [scroll]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !pointer || !hasFinePointer() || prefersReducedMotion()) return;

    const move = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const mx = (e.clientX - rect.left) / rect.width;
      const my = (e.clientY - rect.top) / rect.height;

      el.style.setProperty("--mx", mx.toFixed(3));
      el.style.setProperty("--my", my.toFixed(3));
      el.style.setProperty("--tx", ((mx - 0.5) * 2).toFixed(3));
      el.style.setProperty("--ty", ((my - 0.5) * 2).toFixed(3));
      el.dataset.hover = "";
    };

    const leave = () => {
      el.style.setProperty("--tx", "0");
      el.style.setProperty("--ty", "0");
      delete el.dataset.hover;
    };

    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);

    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [pointer]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
