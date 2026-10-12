"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "../../lib/scroll";
import styles from "./Marquee.module.css";

const words = [
  "Logo",
  "Identité visuelle",
  "Affiches",
  "Flyers",
  "Menus",
  "Réseaux sociaux",
  "Sites web",
];

const COPIES = 4;
const BASE_SPEED = 70;

function Band({ className }: { className: string }) {
  return (
    <div className={`${styles.band} ${className}`}>
      <div className={styles.track} data-track>
        {Array.from({ length: COPIES }, (_, copy) => (
          <div key={copy} className={styles.group}>
            {words.map((word) => (
              <span key={word}>
                {word}
                <i>✦</i>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// Deux bandeaux croisés qui défilent en sens opposés
// et accélèrent avec la vitesse de défilement de la page.
export default function Marquee() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;

    const tracks = Array.from(root.querySelectorAll<HTMLElement>("[data-track]"));
    const offsets = tracks.map(() => 0);

    let frame = 0;
    let last = performance.now();
    let lastScroll = window.scrollY;
    let velocity = 0;

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000) || 0.016;
      last = now;

      const scroll = window.scrollY;
      const raw = Math.max(-3000, Math.min(3000, (scroll - lastScroll) / dt));
      lastScroll = scroll;
      velocity += (raw - velocity) * 0.08;

      tracks.forEach((track, index) => {
        const width = track.scrollWidth / COPIES;
        const direction = index % 2 === 0 ? -1 : 1;

        offsets[index] += direction * (BASE_SPEED + velocity * 0.4) * dt;
        offsets[index] = ((offsets[index] % width) - width) % width;

        track.style.transform = `translate3d(${offsets[index].toFixed(1)}px, 0, 0)`;
      });

      frame = requestAnimationFrame(tick);
    };

    // L'animation ne tourne que lorsque le bandeau est visible
    const observer = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(frame);

      if (entry.isIntersecting) {
        last = performance.now();
        lastScroll = window.scrollY;
        frame = requestAnimationFrame(tick);
      }
    });

    observer.observe(root);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={rootRef} className={styles.marquee} aria-hidden="true">
      <Band className={styles.back} />
      <Band className={styles.front} />
    </div>
  );
}
