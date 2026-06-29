import React from 'react'
import styles from './GameCard.module.css'
import Image from 'next/image'
import { Game } from '../types/rawg'
import MetacriticBadge from './MetacriticBadge';

interface GameCardProps {
  game: Game;
}

function GameCard({ game }: Readonly<GameCardProps>) {
  return (
    <div className={styles.mainDiv}>
      <div className={styles.imageWrapper}>
        <Image
          className={styles.gameImage}
          src={game.background_image}
          alt={game.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        { Boolean(game.metacritic) && <MetacriticBadge score={game.metacritic} /> }
      </div>
      <h2 className={styles.gameTitle}>{game.name}</h2>
    </div>
  )
}

export default GameCard