import React from 'react'
import styles from './MetacriticBadge.module.css'

interface MetacriticBadgeProps {
    score: number;
}

const ScoreColor = (score: number): string => {
    if (score >= 75) {
        return styles.green;
    } else if (score >= 50) {
        return styles.amber;
    } else {
        return styles.red;
    }
}

function MetacriticBadge({ score }: Readonly<MetacriticBadgeProps>) {
    return (
        <div className={`${styles.mainDiv} ${ScoreColor(score)}`}>
            <span className={styles.scoreText}>{score}</span>
        </div>
    )
}

export default MetacriticBadge