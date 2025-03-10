import { useState } from "react";
import styles from "./Gallery.module.css";

// Custom gallery component to display multiple images
function Gallery({imageList}) {
    const [index, setIndex] = useState(0);
    const lastIndex = imageList.length - 1;
    // Carousel handlers
    const goBack = () => {
        setIndex(prev => {
            if (prev === 0) return lastIndex;
            return prev - 1;
        });
    }
    const goForward = () => {
        setIndex(prev => {
            if (prev === lastIndex) return 0;
            return prev + 1;
        });
    }
    return (
        <div>
                <img className={styles.slide} src={imageList[index]} alt="gallery" loading="lazy"/>
            <div className={styles.navigation}>
                <button onClick={goBack}>⇦</button>
                <p>{index + 1}/{imageList.length}</p>
                <button onClick={goForward}>⇨</button>
            </div>
        </div>
    );
}

export default Gallery;