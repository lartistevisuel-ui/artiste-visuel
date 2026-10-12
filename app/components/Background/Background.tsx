import Embers from "./Embers";
import styles from "./Background.module.css";

export default function Background() {
  return (
    <div className={styles.background} aria-hidden="true">
      <div className={styles.grid} />
      <div className={`${styles.blob} ${styles.red}`} />
      <div className={`${styles.blob} ${styles.gold}`} />
      <Embers />
      <div className={styles.spotlight} />
      <div className={styles.grain} />
    </div>
  );
}
