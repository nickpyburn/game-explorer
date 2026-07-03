import { GameQuery } from "../types/app";
import { Game } from "../types/rawg";

export const fetchGames = async ({ gameQuery, setLoading, setGames, setError }: {
    gameQuery: GameQuery,
    setLoading: (loading: boolean) => void,
    setGames: (games: Game[]) => void,
    setError: (error: string | null) => void
}) => {
    try {
        setLoading(true);
        const params = new URLSearchParams();

        if (gameQuery.searchText) params.append('search', gameQuery.searchText);
        if (gameQuery.genres.length > 0) params.append('genres', gameQuery.genres.join(','));
        if (gameQuery.parentPlatforms.length > 0) params.append('parent_platforms', gameQuery.parentPlatforms.join(','));
        params.append('ordering', gameQuery.sortOrder);
        params.append('page', gameQuery.page.toString());

        const response = await fetch(`/api/games?${params.toString()}`);
        if (!response.ok) throw new Error(`HTTP error. status: ${response.status}`);

        const data = await response.json();
        setGames(data.results || []);
        setError(null);
    } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
        setLoading(false);
    }
};