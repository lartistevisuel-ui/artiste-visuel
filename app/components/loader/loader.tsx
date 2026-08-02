"use client";

import LoaderProgress from "./loaderProgress";
import LoaderWords from "./loaderWords";
import styles from "./loader.module.css";
import { useLoader } from "./useLoader";

export default function Loader() {
    const { finished } = useLoader();
    return (
        <div
            className={`${styles.loader} ${finished ? styles.hidden : ""}`}
        >

            <div className={styles.content}>

                <img
                    src="/images/logo.jpg"
                    alt="Logo"
                    className={styles.logo}
                />

                <h1>L'ARTISTE VISUEL</h1>

                <LoaderWords />

                <LoaderProgress />

            </div>

        </div>
    );
}