"use client";

import { useEffect, useState } from 'react'
import { Game } from './types/rawg'
import { GameQuery } from './types/app';

function MainDashboard() {

    const [gameQuery, setGameQuery] = useState<GameQuery>({
        genre: null,
        platform: null,
        sortOrder: "-added", // default to popular
        searchText: "",
        page: 1,
    });

    const [games, setGames] = useState<Game[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                setLoading(true);
                
                const params = new URLSearchParams();
                if (gameQuery.searchText) params.append('search', gameQuery.searchText);
                if (gameQuery.genre) params.append('genres', gameQuery.genre);
                if (gameQuery.platform) params.append('parent_platforms', gameQuery.platform.toString());
                params.append('ordering', gameQuery.sortOrder);
                params.append('page', gameQuery.page.toString());
                
                const response = await fetch(`/api/games?${params.toString()}`);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                
                setGames(data.results || []);
                setError(null);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('Something went wrong');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchGames();
    }, [gameQuery]);

    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {!loading && !error && <h1>{JSON.stringify(games, null, 2)}</h1>}
        </div>
    )
}

export default MainDashboard