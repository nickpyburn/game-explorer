import { GameQuery } from "../types/app";
import { Game } from "../types/rawg";

export const fetchGames = async ({params, gameQuery, setLoading, setGames, setError}: {params: URLSearchParams, gameQuery: GameQuery, setLoading: (loading: boolean) => void, setGames: (games: Game[]) => void, setError: (error: string | null) => void}) => {
            try {
                setLoading(true);

                if (gameQuery.searchText) params.append('search', gameQuery.searchText);
                if (gameQuery.genre) params.append('genres', gameQuery.genre);
                if (gameQuery.platform) params.append('parent_platforms', gameQuery.platform.toString());
                params.append('ordering', gameQuery.sortOrder);
                params.append('page', gameQuery.page.toString());
                
                const response = await fetch(`/api/games?${params.toString()}`);

                if (!response.ok) {
                    throw new Error(`HTTP error. status: ${response.status}`);
                }

                const data = await response.json();
                
                setGames(data.results || []);
                setError(null);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('Something went wrong');
                }
            } finally {
                setLoading(false);
            }
        };