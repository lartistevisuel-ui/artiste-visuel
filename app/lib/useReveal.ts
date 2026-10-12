import { useEffect, type RefObject } from "react";
import { prefersReducedMotion } from "./scroll";

type Options = {
  /** Délai en ms, pour décaler les éléments d'un même groupe */
  delay?: number;
  /** Attend la fin de l'intro au premier chargement */
  afterIntro?: boolean;
};

const INTRO_DURATION = 1100;

// Ajoute la classe "in" quand l'élément entre dans l'écran.
export function useReveal(
  ref: RefObject<HTMLElement | null>,
  { delay = 0, afterIntro = false }: Options = {}
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        const introRunning =
          afterIntro &&
          !document.documentElement.dataset.introDone &&
          !prefersReducedMotion();

        const total = delay + (introRunning ? INTRO_DURATION : 0);

        el.style.setProperty("--d", `${total}ms`);
        el.classList.add("in");
        observer.disconnect();
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [ref, delay, afterIntro]);
}
