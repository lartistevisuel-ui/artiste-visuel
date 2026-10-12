import Fx from "../motion/Fx";
import styles from "./Tagline.module.css";

// Grande devise qui glisse horizontalement au rythme du défilement.
export default function Tagline() {
  return (
    <Fx scroll="through" className={styles.tagline}>
      <p className={styles.line}>
        Créer <i>✦</i> Inspirer <i>✦</i> Marquer <i>✦</i> Créer <i>✦</i> Inspirer
      </p>

      <p className={`${styles.line} ${styles.reverse}`} aria-hidden="true">
        Marquer <i>✦</i> Inspirer <i>✦</i> Créer <i>✦</i> Marquer <i>✦</i> Inspirer
      </p>
    </Fx>
  );
}
