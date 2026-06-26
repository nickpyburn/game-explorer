"use client";

import { useEffect, useState } from 'react'
import styles from './MainDashboard.module.css'
import { Game } from '../types/rawg'
import { GameQuery } from '../types/app';
import {fetchGames} from '../lib/utils';
import SideBar from './SideBar';

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
        <div className={styles.mainDiv}>
            <div style={{ gridColumn: "1", gridRow: "1" }}>
                <SideBar />
            </div>
        </div>
    )
}

export default MainDashboard