import React from 'react'
import styles from './SideBar.module.css'
import HomeLogoButton from './HomeLogoButton'
import CategoryButton from './CategoryButton'

interface SideBarProps {
    selectedCategory: string;
    onCategorySelected?: (category: string) => void;
}

function SideBar({ selectedCategory, onCategorySelected }: Readonly<SideBarProps>) {
    return (
        <aside aria-label="Main Navigation" className={styles.mainDiv}>
            <div className="align-self-center">
                <HomeLogoButton onClick={() => console.log("Home button clicked")} />
            </div>
            <section aria-label="Discover Categories" className="mt-4 w-100 gap-1 d-flex flex-column">
                <h3 className={styles.subtitle}>discover</h3>
                <CategoryButton category="Home" iconImagePath="/icons/home.svg" onClick={onCategorySelected} isSelected={selectedCategory === "Home"} />
                <CategoryButton category="New Releases" iconImagePath="/icons/party.png" onClick={onCategorySelected} isSelected={selectedCategory === "New Releases"} />
                <CategoryButton category="Best of the Year" iconImagePath="/icons/trophy.png" onClick={onCategorySelected} isSelected={selectedCategory === "Best of the Year"} />
            </section>
            <section aria-label="Genre Categories" className="mt-4 w-100 gap-1 d-flex flex-column">
                <h3 className={styles.subtitle}>genres</h3>
                <CategoryButton category="Action" iconImagePath="/icons/explosion.png" onClick={onCategorySelected} isSelected={selectedCategory === "Action"} />
                <CategoryButton category="Adventure" iconImagePath="/icons/swords.png" onClick={onCategorySelected} isSelected={selectedCategory === "Adventure"} />
                <CategoryButton category="Strategy" iconImagePath="/icons/chess.png" onClick={onCategorySelected} isSelected={selectedCategory === "RPG"} />
            </section>
            <section aria-label="Platform Categories" className="mt-4 w-100 gap-1 d-flex flex-column">
                <h3 className={styles.subtitle}>platforms</h3>
                <CategoryButton category="PC" iconImagePath="/icons/windows.png" onClick={onCategorySelected} isSelected={selectedCategory === "PC"} />
                <CategoryButton category="Playstation" iconImagePath="/icons/playstation.png" onClick={onCategorySelected} isSelected={selectedCategory === "Playstation"} />
                <CategoryButton category="XBox" iconImagePath="/icons/xbox.png" onClick={onCategorySelected} isSelected={selectedCategory === "XBox"} />
            </section>
        </aside>
    )
}

export default SideBar