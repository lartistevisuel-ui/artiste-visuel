"use client";

import { useRef } from "react";
import { useReveal } from "../../lib/useReveal";

type Segment = string | { accent: string };

type Props = {
  as?: "h1" | "h2";
  className?: string;
  /** Morceaux du titre ; "\n" force un retour à la ligne, { accent } colore le texte */
  segments: Segment[];
  /** Anime lettre par lettre au lieu de mot par mot */
  chars?: boolean;
  delay?: number;
  afterIntro?: boolean;
};

type Piece = { text: string; index: number };
type Word = { pieces: Piece[] };
type Block = { accent: boolean; lineBreak: boolean; words: Word[] };

function build(segments: Segment[], chars: boolean) {
  const blocks: Block[] = [];
  let index = 0;

  for (const segment of segments) {
    const accent = typeof segment !== "string";
    const text = accent ? segment.accent : segment;

    if (text === "\n") {
      blocks.push({ accent: false, lineBreak: true, words: [] });
      continue;
    }

    const words = text
      .split(" ")
      .filter(Boolean)
      .map((word) => ({
        pieces: (chars ? Array.from(word) : [word]).map((piece) => ({
          text: piece,
          index: index++,
        })),
      }));

    blocks.push({ accent, lineBreak: false, words });
  }

  return blocks;
}

// Titre dont les mots (ou les lettres) montent un par un à l'apparition.
export default function AnimatedTitle({
  as: Tag = "h2",
  className = "",
  segments,
  chars = false,
  delay = 0,
  afterIntro = false,
}: Props) {
  const ref = useRef<HTMLHeadingElement>(null);

  useReveal(ref, { delay, afterIntro });

  const blocks = build(segments, chars);

  const label = segments
    .map((segment) => (typeof segment === "string" ? segment : segment.accent))
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();

  return (
    <Tag
      ref={ref}
      className={`split ${chars ? "split--chars" : ""} ${className}`}
      aria-label={label}
    >
      {blocks.map((block, blockIndex) => {
        if (block.lineBreak) return <br key={blockIndex} />;

        const words = block.words.map((word, wordIndex) => (
          <span key={wordIndex}>
            <span className="w" aria-hidden="true">
              {word.pieces.map((piece) => (
                <span
                  key={piece.index}
                  className="c"
                  style={{ "--i": piece.index } as React.CSSProperties}
                >
                  {piece.text}
                </span>
              ))}
            </span>{" "}
          </span>
        ));

        return block.accent ? (
          <em key={blockIndex}>{words}</em>
        ) : (
          <span key={blockIndex}>{words}</span>
        );
      })}
    </Tag>
  );
}
