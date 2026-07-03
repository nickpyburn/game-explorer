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
                <CategoryButton category="Home" iconImagePath="/icons/home.svg" onClick={onCategorySelected} isSelected={gameQuery.discoverMode === "Home"} />
                <CategoryButton category="New Releases" iconImagePath="/icons/party.png" onClick={onCategorySelected} isSelected={gameQuery.discoverMode === "NewReleases"} />
                <CategoryButton category="Best of the Year" iconImagePath="/icons/trophy.png" onClick={onCategorySelected} isSelected={gameQuery.discoverMode === "BestOfYear"} />
            </section>
            
            <section aria-label="Genre Categories" className="mt-4 w-100 gap-1 d-flex flex-column">
                <h3 className={styles.subtitle}>genres</h3>
                <CategoryButton category="Action" iconImagePath="/icons/explosion.png" onClick={onCategorySelected} isSelected={gameQuery.genres.includes("action")} />
                <CategoryButton category="Adventure" iconImagePath="/icons/swords.png" onClick={onCategorySelected} isSelected={gameQuery.genres.includes("adventure")} />
                <CategoryButton category="Strategy" iconImagePath="/icons/chess.png" onClick={onCategorySelected} isSelected={gameQuery.genres.includes("strategy")} />
            </section>
            
            <section aria-label="Platform Categories" className="mt-4 w-100 gap-1 d-flex flex-column">
                <h3 className={styles.subtitle}>platforms</h3>
                <CategoryButton category="PC" iconImagePath="/icons/windows.png" onClick={onCategorySelected} isSelected={gameQuery.parentPlatforms.includes(1)} />
                <CategoryButton category="Playstation" iconImagePath="/icons/playstation.png" onClick={onCategorySelected} isSelected={gameQuery.parentPlatforms.includes(2)} />
                <CategoryButton category="XBox" iconImagePath="/icons/xbox.png" onClick={onCategorySelected} isSelected={gameQuery.parentPlatforms.includes(3)} />
            </section>
        </aside>
    )
}

export default SideBar;