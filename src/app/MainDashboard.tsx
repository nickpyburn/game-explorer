"use client";

import { useEffect, useState } from 'react'
import { Game } from './types/rawg'
import { GameQuery } from './types/app';
import {fetchGames} from './lib/utils';

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
        const params = new URLSearchParams();
        fetchGames({ params, gameQuery, setLoading, setGames, setError });
    }, [gameQuery]);

    return (
        // <div>
        //     {loading && <p>Loading...</p>}
        //     {error && <p>Error: {error}</p>}
        //     {!loading && !error && <h1>{JSON.stringify(games, null, 2)}</h1>}
        // </div>
        <div>
            hello
        </div>
    )
}

export default MainDashboard