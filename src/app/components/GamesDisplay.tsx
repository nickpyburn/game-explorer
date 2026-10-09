import React from 'react'
import styles from './GamesDisplay.module.css'
import { Game } from '../types/rawg'
import GameCard from './GameCard'

interface GamesDisplayProps {
  games: Game[];
  onClick?: (game: Game) => void;
} 

function GamesDisplay({ games, onClick }: Readonly<GamesDisplayProps>) {
  return (
    <div className={styles.mainGrid}>
        {games.map((game) => (
            <GameCard key={game.id} game={game} onClick={() => onClick?.(game)} />
        ))}
    </div>
  )
}

export default GamesDisplay