// Suivi du défilement partagé : un seul écouteur pour tous les éléments animés.
// Chaque élément suivi reçoit une variable CSS --p (de 0 à 1) que le CSS exploite.

type Mode = "through" | "exit";

type Entry = {
  el: HTMLElement;
  mode: Mode;
};

const entries = new Set<Entry>();
let ticking = false;
let bound = false;

function measure() {
  ticking = false;

  const vh = window.innerHeight;

  entries.forEach(({ el, mode }) => {
    const rect = el.getBoundingClientRect();

    if (rect.bottom < -vh * 0.25 || rect.top > vh * 1.25) return;

    // through : 0 quand l'élément entre par le bas, 1 quand il sort par le haut
    // exit    : 0 tant que l'élément est en haut de page, 1 quand il a disparu
    const progress =
      mode === "exit"
        ? -rect.top / rect.height
        : (vh - rect.top) / (vh + rect.height);

    el.style.setProperty("--p", Math.min(1, Math.max(0, progress)).toFixed(4));
  });
}

function request() {
  if (ticking) return;

  ticking = true;
  requestAnimationFrame(measure);
}

export function trackScroll(el: HTMLElement, mode: Mode = "through") {
  const entry = { el, mode };

  entries.add(entry);

  if (!bound) {
    bound = true;
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
  }

  request();

  return () => {
    entries.delete(entry);
  };
}

export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function hasFinePointer() {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}
