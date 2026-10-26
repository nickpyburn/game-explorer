import React from 'react'
import styles from './SideBar.module.css'
import HomeLogoButton from './HomeLogoButton'
import CategoryButton from './CategoryButton'
import { GameQuery } from '../types/app'

interface SideBarProps {
    gameQuery: GameQuery;
    onCategorySelected?: (category: string) => void;
}

function SideBar({ gameQuery, onCategorySelected }: Readonly<SideBarProps>) {
    return (
        <aside aria-label="Main Navigation" className={styles.mainDiv}>
            <div className="align-self-center">
                <HomeLogoButton onClick={() => onCategorySelected?.("Home")} />
            </div>
            
            <section aria-label="Discover Categories" className="mt-4 w-100 gap-1 d-flex flex-column">
                <h3 className={styles.subtitle}>discover</h3>
                <CategoryButton category="Home" ImageClass="bi bi-house" onClick={onCategorySelected} isSelected={gameQuery.discoverMode === "Home"} />
                <CategoryButton category="New Releases" ImageClass="bi bi-stars" onClick={onCategorySelected} isSelected={gameQuery.discoverMode === "NewReleases"} />
                <CategoryButton category="Best of the Year" ImageClass="bi bi-trophy" onClick={onCategorySelected} isSelected={gameQuery.discoverMode === "BestOfYear"} />
            </section>
            
            <section aria-label="Genre Categories" className="mt-4 w-100 gap-1 d-flex flex-column">
                <h3 className={styles.subtitle}>genres</h3>
                <CategoryButton category="Action" ImageClass="bi bi-fire" onClick={onCategorySelected} isSelected={gameQuery.genres.includes("action")} />
                <CategoryButton category="Adventure" ImageClass="bi bi-shield-shaded" onClick={onCategorySelected} isSelected={gameQuery.genres.includes("adventure")} />
                <CategoryButton category="Strategy" ImageClass="bi bi-dice-5-fill" onClick={onCategorySelected} isSelected={gameQuery.genres.includes("strategy")} />
            </section>
            
            <section aria-label="Platform Categories" className="mt-4 w-100 gap-1 d-flex flex-column">
                <h3 className={styles.subtitle}>platforms</h3>
                <CategoryButton category="PC" ImageClass="bi bi-windows" onClick={onCategorySelected} isSelected={gameQuery.parentPlatforms.includes(1)} />
                <CategoryButton category="Playstation" ImageClass="bi bi-playstation" onClick={onCategorySelected} isSelected={gameQuery.parentPlatforms.includes(2)} />
                <CategoryButton category="XBox" ImageClass="bi bi-xbox" onClick={onCategorySelected} isSelected={gameQuery.parentPlatforms.includes(3)} />
                <CategoryButton category="Nintendo" ImageClass="bi bi-dpad-fill" onClick={onCategorySelected} isSelected={gameQuery.parentPlatforms.includes(7)} />
            </section>
        </aside>
    )
}

export default SideBar;