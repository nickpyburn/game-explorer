import Image from 'next/image';
import styles from './CategoryButton.module.css';
import React from 'react'

interface CategoryButtonProps {
    category: string;
    ImageClass?: string;
    onClick?: (category: string) => void;
    isSelected?: boolean;
}

function CategoryButton({ category, ImageClass, onClick, isSelected }: Readonly<CategoryButtonProps>) {
    return (
        <button className={`${styles.mainButton} ${isSelected ? styles.selected : styles.unselected}`} onClick={() => onClick?.(category)}>
            <i className={`${ImageClass} ${styles.imageClass}`}></i>
            <p className={styles.categoryText}>{category}</p>
        </button>
    )
}

export default CategoryButton