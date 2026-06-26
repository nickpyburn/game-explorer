import React from 'react'
import styles from './GamesDisplay.module.css'
import { Game } from '../types/rawg'
import GameCard from './GameCard'

function GamesDisplay({ games }: Readonly<{ games: Game[] }>) {
  return (
    <div className={styles.mainGrid}>
        {games.map((game) => (
            <GameCard key={game.id} game={game} />
        ))}
    </div>
  )
}

export default GamesDisplay