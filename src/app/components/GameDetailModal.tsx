"use client";

import { useEffect, useState } from 'react';
import { Game } from '../types/rawg';
import { fetchGameDetails } from '../lib/utils';
import Image from 'next/image';
import styles from './GameDetailModal.module.css';

interface GameDetailModalProps {
    game: Game;
    onClose: () => void;
}

function GameDetailModal({ game, onClose }: Readonly<GameDetailModalProps>) {
    const [details, setDetails] = useState<Game | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        let isMounted = true;

        const loadDetails = async () => {
            setLoading(true);
            setDetails(null);

            try {
                const data = await fetchGameDetails(game.id);
                if (isMounted)
                    setDetails(data);

            } catch (error) {
                console.error("Error loading extra game details:", error);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        void loadDetails();

        return () => {
            isMounted = false;
        };
    }, [game.id]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'unset';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    // clean description check (filters Cyrillic text)
    const cleanDescription = details?.description_raw && !/[\u0400-\u04FF]/.test(details.description_raw)
        ? details.description_raw
        : null;

    // filter top English tags (limit to 6)
    const topTags = details?.tags
        ?.filter(t => !t.language || t.language === 'eng')
        .slice(0, 6) || [];

    // safe image string check
    const hasValidImage = typeof game.background_image === 'string' && game.background_image.trim().length > 0;

    return (
        <div className={styles.mainDiv}>
            <button
                type="button"
                className={styles.backdrop}
                onClick={onClose}
                aria-label="Close game details"
            />
            <div className={styles.innerDiv}>
                <div className={styles.detailsDiv}>
                    <div>
                        <h2 className="mb-1 fw-bold">{game.name}</h2>
                        {details?.publishers && details.publishers.length > 0 && (
                            <span className="text-secondary small">Published by {details.publishers.map(p => p.name).join(', ')}</span>
                        )}
                    </div>
                    <button className="btn-close btn-close-white" onClick={onClose} aria-label="Close"></button>
                </div>

                {hasValidImage && (
                    <div className="position-relative w-100 mb-4" style={{ height: '280px' }}>
                        <Image
                            src={game.background_image}
                            alt={game.name}
                            fill
                            style={{ objectFit: 'cover', borderRadius: '8px' }}
                        />
                    </div>
                )}

                {loading ? (
                    <div className="text-center py-4 text-secondary">
                        <output className="spinner-border text-light mb-2"></output>
                        <p>Loading game specifications...</p>
                    </div>
                ) : (
                    <>
                        <div className="d-flex flex-wrap gap-2 mb-4">
                            {!!(game.metacritic) && (
                                <span className="badge bg-success fs-6 p-2">
                                    Metacritic: {game.metacritic}
                                </span>
                            )}
                            {game.rating > 0 && (
                                <span className="badge bg-warning text-dark fs-6 p-2">
                                    ★ {game.rating} / 5
                                </span>
                            )}
                            {details?.playtime ? (
                                <span className="badge bg-info text-dark fs-6 p-2">
                                    Avg Playtime: {details.playtime} Hours
                                </span>
                            ) : null}
                            {details?.esrb_rating && (
                                <span className="badge bg-secondary fs-6 p-2">
                                    ESRB: {details.esrb_rating.name}
                                </span>
                            )}
                        </div>

                        <div className="row g-3 mb-4 bg-black bg-opacity-50 rounded p-3 m-0 border border-dark">
                            <div className="col-6 col-md-4">
                                <span className="text-secondary d-block small">Developer</span>
                                <strong>{details?.developers?.map(d => d.name).join(', ') || 'N/A'}</strong>
                            </div>
                            <div className="col-6 col-md-4">
                                <span className="text-secondary d-block small">Release Date</span>
                                <strong>{game.released || 'TBA'}</strong>
                            </div>
                            <div className="col-6 col-md-4">
                                <span className="text-secondary d-block small">Genres</span>
                                <strong>{details?.genres?.map(g => g.name).join(', ') || 'N/A'}</strong>
                            </div>
                        </div>

                        {topTags.length > 0 && (
                            <div className="mb-4">
                                <h6 className="text-secondary mb-2">Features & Tags</h6>
                                <div className="d-flex flex-wrap gap-2">
                                    {topTags.map(tag => (
                                        <span key={tag.id} className="badge bg-dark border border-secondary text-light fw-normal p-2">
                                            #{tag.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {cleanDescription && (
                            <div className="mb-4">
                                <h6 className="text-secondary mb-2">About</h6>
                                <p className="text-light-50 small" style={{ whiteSpace: 'pre-line', maxHeight: '200px', overflowY: 'auto' }}>
                                    {cleanDescription}
                                </p>
                            </div>
                        )}

                        <div className="d-flex flex-wrap justify-content-between align-items-center pt-3 border-top border-secondary gap-2">
                            <div className="d-flex gap-2">
                                {details?.stores?.map(s => (
                                    <span key={s.id} className="badge bg-secondary">
                                        {s.store.name}
                                    </span>
                                ))}
                            </div>
                            {details?.website && (
                                <a
                                    href={details.website}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="btn btn-outline-info btn-sm"
                                >
                                    Official Website <i className="bi bi-box-arrow-up-right ms-1"></i>
                                </a>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default GameDetailModal;