import React, {useEffect, useState} from 'react'
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

    useEffect(() => {
        // add fetch logic here
    }, [gameQuery]);

  return (
    <div>
        
    </div>
  )
}

export default MainDashboard