"use client";

import { useEffect, useState } from "react";
import styles from "./loader.module.css";

export default function LoaderProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.progressContainer}>
      <span className={styles.percent}>{progress}%</span>

      <div className={styles.bar}>
        <div
          className={styles.progress}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}