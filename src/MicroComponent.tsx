import * as React from "react";
import styles from "./MicroComponent.module.css";

const MicroComponent = () => (
    <div className={styles.card}>
        Greetings from the Micro Frontend!
        <div>
            I was loaded remotely!
        </div>
    </div>
);

export default MicroComponent;