"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "../../lib/scroll";
import styles from "./Background.module.css";

type Ember = {
  x: number;
  y: number;
  radius: number;
  speed: number;
  sway: number;
  phase: number;
  color: string;
};

const COLORS = ["255, 45, 45", "255, 122, 61", "245, 184, 46"];

// Étincelles qui montent doucement en arrière-plan.
export default function Embers() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!canvas || !ctx || prefersReducedMotion()) return;

    let width = 0;
    let height = 0;
    let embers: Ember[] = [];
    let frame = 0;
    let last = performance.now();

    const spawn = (anywhere: boolean): Ember => ({
      x: Math.random() * width,
      y: anywhere ? Math.random() * height : height + 10,
      radius: 0.6 + Math.random() * 1.8,
      speed: 14 + Math.random() * 38,
      sway: 8 + Math.random() * 22,
      phase: Math.random() * Math.PI * 2,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    });

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);

      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * ratio;
      canvas.height = height * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

      const count = width < 768 ? 28 : 60;
      embers = Array.from({ length: count }, () => spawn(true));
    };

    const draw = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";

      embers.forEach((ember, index) => {
        ember.y -= ember.speed * dt;
        ember.phase += dt;

        if (ember.y < -10) embers[index] = spawn(false);

        const x = ember.x + Math.sin(ember.phase) * ember.sway;
        const life = Math.min(1, ember.y / height + 0.15);
        const flicker = 0.55 + Math.sin(ember.phase * 3) * 0.25;
        const alpha = life * flicker;

        ctx.fillStyle = `rgba(${ember.color}, ${(alpha * 0.18).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(x, ember.y, ember.radius * 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(${ember.color}, ${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(x, ember.y, ember.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      frame = requestAnimationFrame(draw);
    };

    const start = () => {
      if (frame) return;
      last = performance.now();
      frame = requestAnimationFrame(draw);
    };

    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const onVisibility = () => (document.hidden ? stop() : start());

    resize();
    start();

    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.embers} />;
}
