"use client";

import { useEffect, useState } from "react";
import styles from "./loader.module.css";

const words = [
    "Designer",
    "Graphiste",
    "Branding",
    "Motion",
    "Web",
    "Créer. Inspirer. Marquer."
];

export default function LoaderWords() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index >= words.length - 1) return;

        const timer = setTimeout(() => {
            setIndex(index + 1);
        }, 800);

        return () => clearTimeout(timer);
    }, [index]);

    return (
        <p className={styles.words}>
            {words[index]}
        </p>
    );
}