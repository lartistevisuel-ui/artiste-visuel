"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./cursor.module.css";

// Anneau qui suit la souris, uniquement sur les appareils avec une vraie souris.
export default function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => setEnabled(finePointer.matches && !reducedMotion.matches);

    update();
    finePointer.addEventListener("change", update);
    reducedMotion.addEventListener("change", update);

    return () => {
      finePointer.removeEventListener("change", update);
      reducedMotion.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const root = document.documentElement;
    const target = { x: -100, y: -100 };
    const current = { x: -100, y: -100 };
    let frame = 0;
    let visible = false;

    const render = () => {
      current.x += (target.x - current.x) * 0.2;
      current.y += (target.y - current.y) * 0.2;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;
      }

      const settled =
        Math.abs(target.x - current.x) < 0.1 &&
        Math.abs(target.y - current.y) < 0.1;

      frame = settled ? 0 : requestAnimationFrame(render);
    };

    const move = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;

      root.style.setProperty("--cx", `${e.clientX}px`);
      root.style.setProperty("--cy", `${e.clientY}px`);

      if (!visible) {
        visible = true;
        current.x = target.x;
        current.y = target.y;
        ringRef.current?.classList.add(styles.visible);
      }

      const element = e.target as Element | null;

      // Un élément marqué data-cursor="Texte" affiche ce texte dans le curseur
      const label = element?.closest?.<HTMLElement>("[data-cursor]")?.dataset.cursor;
      const interactive = element?.closest?.(
        "a, button, [role='button'], input, textarea, label"
      );

      if (labelRef.current && label) labelRef.current.textContent = label;

      ringRef.current?.classList.toggle(styles.label, Boolean(label));
      ringRef.current?.classList.toggle(styles.active, Boolean(interactive) && !label);

      if (!frame) frame = requestAnimationFrame(render);
    };

    const leave = () => {
      visible = false;
      ringRef.current?.classList.remove(styles.visible);
    };

    window.addEventListener("mousemove", move, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);

    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.removeEventListener("mouseleave", leave);
      cancelAnimationFrame(frame);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div ref={ringRef} className={styles.cursor} aria-hidden="true">
      <span>
        <i ref={labelRef} />
      </span>
    </div>
  );
}
