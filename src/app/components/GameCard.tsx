import React from 'react'
import styles from './GameCard.module.css'
import Image from 'next/image'
import { Game } from '../types/rawg'

interface GameCardProps {
    game: Game;
}

function GameCard({ game }: Readonly<GameCardProps>) {
  return (
    <div className={styles.mainDiv}>
        <Image className={styles.gameImage} src={game.background_image} alt={game.name} width={300} height={200} />
        <h2 className={styles.gameTitle}>{game.name}</h2>
    </div>
  )
}

export default GameCard