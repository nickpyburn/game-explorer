"use client";

import { useEffect, useState } from 'react'
import styles from './MainDashboard.module.css'
import { Game } from '../types/rawg'
import { GameQuery } from '../types/app';
import { fetchGames } from '../lib/utils';
import SideBar from './SideBar';
import GamesDisplay from './GamesDisplay';
import SearchAndSortControls from './SearchAndSortControls';

const PLATFORM_ID_MAP: Record<string, number> = {
    "PC": 1,
    "Playstation": 2,
    "XBox": 3,
};

function MainDashboard() {
    const [gameQuery, setGameQuery] = useState<GameQuery>({
        discoverMode: "Home",
        genres: [],
        parentPlatforms: [],
        sortOrder: "-added",
        searchText: "",
        page: 1,
    });

    const [games, setGames] = useState<Game[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        console.log("Fetching games with query:", gameQuery);
        fetchGames({ gameQuery, setLoading, setGames, setError });
    }, [gameQuery.searchText, JSON.stringify(gameQuery.genres), JSON.stringify(gameQuery.parentPlatforms), gameQuery.sortOrder, gameQuery.page, gameQuery.discoverMode]);

    const handleSetCategory = (category: string) => {
        setGameQuery((prevQuery) => {
            if (category === "Home") {
                // reset genres, platforms and page when switching to Home
                return { ...prevQuery, discoverMode: "Home", genres: [], parentPlatforms: [], page: 1 };
            }
            if (category === "New Releases") {
                return { ...prevQuery, discoverMode: "NewReleases", page: 1 };
            }
            if (category === "Best of the Year") {
                return { ...prevQuery, discoverMode: "BestOfYear", page: 1 };
            }

            if (category in PLATFORM_ID_MAP) {
                const targetId = PLATFORM_ID_MAP[category];
                const exists = prevQuery.parentPlatforms.includes(targetId);
                const updatedPlatforms = exists
                    ? prevQuery.parentPlatforms.filter(id => id !== targetId)
                    : [...prevQuery.parentPlatforms, targetId];
                return { ...prevQuery, parentPlatforms: updatedPlatforms, page: 1 };
            }

            const genreSlug = category.toLowerCase();
            const exists = prevQuery.genres.includes(genreSlug);
            const updatedGenres = exists
                ? prevQuery.genres.filter(g => g !== genreSlug)
                : [...prevQuery.genres, genreSlug];

            return { ...prevQuery, genres: updatedGenres, page: 1 };
        });
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className={styles.mainGrid}>
            <SideBar gameQuery={gameQuery} onCategorySelected={handleSetCategory} />
            <div className="d-flex flex-column flex-grow-1 overflow-hidden">
                <SearchAndSortControls
                    setSearchText={(text) => setGameQuery((prevQuery) => ({ ...prevQuery, searchText: text, page: 1 }))}
                    setSortOption={(option) => setGameQuery((prevQuery) => ({ ...prevQuery, sortOrder: option, page: 1 }))}
                    sortOption={gameQuery.sortOrder}
                />
                <GamesDisplay games={games} />
            </div>
        </div>
    )
}

export default MainDashboard;