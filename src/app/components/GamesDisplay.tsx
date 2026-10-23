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
        {games.map((game, index) => (
            <GameCard 
              key={game.id} 
              game={game} 
              onClick={() => onClick?.(game)} 
              priority={index < 4} // eagerly load the first 4 images
            />
        ))}
    </div>
  )
}

export default GamesDisplay