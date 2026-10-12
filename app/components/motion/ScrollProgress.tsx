"use client";

import { useEffect, useRef } from "react";

// Barre de progression de lecture, tout en haut de l'écran.
export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;

      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;

      if (ref.current) ref.current.style.transform = `scaleX(${progress.toFixed(4)})`;
    };

    const request = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);

    return () => {
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={ref} className="scroll-progress" aria-hidden="true" />;
}
