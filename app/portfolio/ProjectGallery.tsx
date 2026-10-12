"use client";

import { useEffect, useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Reveal from "../components/Reveal";
import styles from "./project.module.css";

type Props = {
  images: StaticImageData[];
  title: string;
};

export default function ProjectGallery({ images, title }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const isOpen = selected !== null;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  const step = (direction: number) =>
    setSelected((current) =>
      current === null
        ? current
        : (current + direction + images.length) % images.length
    );

  return (
    <>
      <div className={styles.gallery}>
        {images.map((image, index) => (
          <Reveal
            key={image.src}
            variant="clip"
            delay={(index % 2) * 140}
            className={styles.thumbWrap}
          >
            <button
              type="button"
              className={styles.thumb}
              data-cursor="Zoom"
              aria-label={`Agrandir l'image ${index + 1} du projet ${title}`}
              onClick={() => setSelected(index)}
            >
              <Image
                src={image}
                alt={`${title} — visuel ${index + 1}`}
                sizes="(max-width: 700px) 92vw, 620px"
                placeholder="blur"
              />
            </button>
          </Reveal>
        ))}
      </div>

      {/* LIGHTBOX */}

      <dialog
        ref={dialogRef}
        className={styles.lightbox}
        aria-label={`Galerie du projet ${title}`}
        onClose={() => setSelected(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setSelected(null);
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") step(-1);
          if (e.key === "ArrowRight") step(1);
        }}
      >
        {selected !== null && (
          <>
            <Image
              key={images[selected].src}
              src={images[selected]}
              alt={`${title} — visuel ${selected + 1}`}
              sizes="94vw"
              className={styles.lightboxImage}
            />

            <button
              type="button"
              className={`${styles.control} ${styles.closeButton}`}
              aria-label="Fermer"
              onClick={() => setSelected(null)}
            >
              <X size={22} />
            </button>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  className={`${styles.control} ${styles.prev}`}
                  aria-label="Image précédente"
                  onClick={() => step(-1)}
                >
                  <ChevronLeft size={24} />
                </button>

                <button
                  type="button"
                  className={`${styles.control} ${styles.nextButton}`}
                  aria-label="Image suivante"
                  onClick={() => step(1)}
                >
                  <ChevronRight size={24} />
                </button>

                <span className={styles.counter}>
                  {selected + 1} / {images.length}
                </span>
              </>
            )}
          </>
        )}
      </dialog>
    </>
  );
}
