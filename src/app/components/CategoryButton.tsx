import Image from 'next/image';
import styles from './CategoryButton.module.css';
import React from 'react'

interface CategoryButtonProps {
    category: string;
    iconImagePath: string;
    onClick?: (category: string) => void;
    isSelected?: boolean;
}

function CategoryButton({ category, iconImagePath, onClick, isSelected }: Readonly<CategoryButtonProps>) {
    return (
        <button className={`${styles.mainButton} ${isSelected ? styles.selected : styles.unselected}`} onClick={() => onClick?.(category)}>
            <Image src={iconImagePath} alt={category} width={24} height={24} />
            <p className={styles.categoryText}>{category}</p>
        </button>
    )
}

export default CategoryButton