// src/app/components/MainDashboard.tsx
"use client";

import { useEffect, useState } from 'react'
import styles from './MainDashboard.module.css'
import { Game } from '../types/rawg'
import { GameQuery } from '../types/app';
import { fetchGames } from '../lib/utils';
import { parentPlatforms } from '../lib/ParentPlatforms';
import SideBar from './SideBar';
import GamesDisplay from './GamesDisplay';
import SearchAndSortControls from './SearchAndSortControls';

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
        // Debounce search input so request fires 300ms after user stops typing
        const handler = setTimeout(async () => {
            try {
                setLoading(true);
                setError(null);
                await fetchGames({ gameQuery, setGames });
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        }, 300);

        // Cleanup function cancels pending timers if user types another letter before 300ms
        return () => clearTimeout(handler);

        // Clean, primitive dependency array tracking
    }, [
        gameQuery.searchText,
        gameQuery.genres,
        gameQuery.parentPlatforms,
        gameQuery.sortOrder,
        gameQuery.page,
        gameQuery.discoverMode
    ]);

    const handleSetCategory = (category: string) => {
        setGameQuery((prevQuery) => {
            if (category === "Home") {
                return { ...prevQuery, discoverMode: "Home", genres: [], parentPlatforms: [], page: 1 };
            }
            if (category === "New Releases") {
                return { ...prevQuery, discoverMode: "NewReleases", page: 1 };
            }
            if (category === "Best of the Year") {
                return { ...prevQuery, discoverMode: "BestOfYear", page: 1 };
            }

            const matchedPlatform = parentPlatforms.find(
                (p) => p.name.toLowerCase() === category.toLowerCase()
            );

            if (matchedPlatform) {
                const targetId = matchedPlatform.id;
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

    return (
        <div className={styles.mainGrid}>
            <SideBar gameQuery={gameQuery} onCategorySelected={handleSetCategory} />
            <div className="d-flex flex-column flex-grow-1 overflow-hidden">
                <SearchAndSortControls
                    setSearchText={(text) => setGameQuery((prevQuery) => ({ ...prevQuery, searchText: text, page: 1 }))}
                    setSortOption={(option) => setGameQuery((prevQuery) => ({ ...prevQuery, sortOrder: option, page: 1 }))}
                    gameQuery={gameQuery}
                    onRemoveGenre={(targetGenre) => setGameQuery((prev) => ({
                        ...prev,
                        genres: prev.genres.filter(g => g !== targetGenre),
                        page: 1
                    }))}
                    onRemovePlatform={(targetId) => setGameQuery((prev) => ({
                        ...prev,
                        parentPlatforms: prev.parentPlatforms.filter(id => id !== targetId),
                        page: 1
                    }))}
                />

                {loading && (
                    <div className="d-flex flex-grow-1 align-items-center justify-content-center text-white">
                        <p className="fs-4">Searching catalog...</p>
                    </div>
                )}

                {error && (
                    <div className="d-flex flex-grow-1 align-items-center justify-content-center text-white">
                        <p className="fs-4 text-danger">Error: {error}</p>
                    </div>
                )}

                {!loading && !error && <GamesDisplay games={games} />}
            </div>
        </div>
    )
}

export default MainDashboard;