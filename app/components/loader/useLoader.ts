import { useEffect, useState } from "react";

export function useLoader() {
    const [progress, setProgress] = useState(0);
    const [finished, setFinished] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setFinished(true);
                    return 100;
                }

                return prev + 1;
            });
        }, 30);

        return () => clearInterval(interval);
    }, []);

    return {
        progress,
        finished,
    };
}