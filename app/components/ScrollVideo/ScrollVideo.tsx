"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ScrollVideo.module.css";

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 285;

export default function ScrollVideo() {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Préchargement des images
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `/frames/frame_${String(i).padStart(4, "0")}.webp`;
    }

    ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "+=5000",
      scrub: true,

      onUpdate: (self) => {
        if (!imgRef.current) return;

        const frame = Math.min(
          TOTAL_FRAMES,
          Math.max(
            1,
            Math.round(self.progress * TOTAL_FRAMES)
          )
        );

        imgRef.current.src =
          `/frames/frame_${String(frame).padStart(4, "0")}.webp`;
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className={styles.container}>
      <img
        ref={imgRef}
        className={styles.video}
        src="/frames/frame_0001.webp"
        alt=""
        draggable={false}
      />

      <div className={styles.overlay}></div>
    </div>
  );
}