import React from 'react'
import styles from './GameCard.module.css'
import Image from 'next/image'
import { Game } from '../types/rawg'
import MetacriticBadge from './MetacriticBadge';
import { parentPlatforms } from '../lib/ParentPlatforms';

interface GameCardProps {
  game: Game;
}

function GameCard({ game }: Readonly<GameCardProps>) {
  const hasValidImage = typeof game.background_image === 'string' && game.background_image.trim().length > 0;
  return (
    <div className={styles.mainDiv}>
      <div className={styles.imageWrapper}>
        {hasValidImage ? (
          <Image
            className={styles.gameImage}
            src={game.background_image}
            alt={game.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        ) : (
          <div className="w-100 h-100 bg-secondary d-flex align-items-center justify-content-center">
            <i className="bi bi-controller text-white-50" style={{ fontSize: '3rem' }}></i>
          </div>
        )}
        {Boolean(game.metacritic) && <MetacriticBadge score={game.metacritic} />}
      </div>

      <div className="p-3 d-flex flex-column flex-grow-1 justify-content-between">
        <h2 className={styles.gameTitle} title={game.name}>{game.name}</h2>
        <div className="d-flex gap-2 text-secondary fs-5 mt-2">
          {game.parent_platforms?.map(platform => {
            const parentPlatform = parentPlatforms.find(p => p.id === platform.platform.id);

            return parentPlatform ? (
              <i
                key={parentPlatform.id}
                className={parentPlatform.icon}
                title={parentPlatform.name}
                aria-label={parentPlatform.name}
              />
            ) : null;
          })}
        </div>
      </div>
    </div>
  )
}

export default GameCard;