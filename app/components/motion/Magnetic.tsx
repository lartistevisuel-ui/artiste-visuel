"use client";

import { useEffect, useRef } from "react";
import { hasFinePointer, prefersReducedMotion } from "../../lib/scroll";

// Bouton « aimanté » : le contenu est attiré par la souris quand elle s'approche.
export default function Magnetic({
  children,
  strength = 0.35,
}: {
  children: React.ReactNode;
  strength?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !hasFinePointer() || prefersReducedMotion()) return;

    const move = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - (rect.left + rect.width / 2)) * strength;
      const y = (e.clientY - (rect.top + rect.height / 2)) * strength;

      el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
    };

    const leave = () => {
      el.style.transform = "";
    };

    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);

    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [strength]);

  return (
    <span ref={ref} className="magnetic">
      {children}
    </span>
  );
}
