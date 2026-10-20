import { GameQuery } from "../types/app";
import { Game } from "../types/rawg";

const getDiscoverDatesParam = (mode: "Home" | "NewReleases" | "BestOfYear"): string => {
    const today = new Date();
    const currentYear = today.getFullYear();

    if (mode === "NewReleases") {
        const ninetyDaysAgo = new Date();
        ninetyDaysAgo.setDate(today.getDate() - 90);

        const formatDate = (date: Date) => date.toISOString().split('T')[0];
        return `${formatDate(ninetyDaysAgo)},${formatDate(today)}`;
    }

    if (mode === "BestOfYear") {
        return `${currentYear}-01-01,${currentYear}-12-31`;
    }

    return "";
};

export const fetchGames = async (gameQuery: GameQuery): Promise<{ games: Game[], hasNextPage: boolean }> => {
    const params = new URLSearchParams();

    if (gameQuery.searchText) params.append('search', gameQuery.searchText);
    if (gameQuery.genres.length > 0) params.append('genres', gameQuery.genres.join(','));
    if (gameQuery.parentPlatforms.length > 0) params.append('parent_platforms', gameQuery.parentPlatforms.join(','));
    
    params.append('ordering', gameQuery.sortOrder);
    params.append('page', gameQuery.page.toString());

    const dateRange = getDiscoverDatesParam(gameQuery.discoverMode);
    if (dateRange) {
        params.append('dates', dateRange);
    }

    const response = await fetch(`/api/games?${params.toString()}`);
    if (!response.ok) throw new Error(`HTTP error. status: ${response.status}`);

    const data = await response.json();

    return { games: data.results || [], hasNextPage: !!data.next };
};

export const fetchGameDetails = async (id: number): Promise<Game> => {
    const response = await fetch(`/api/games/${id}`);
    if (!response.ok) throw new Error(`HTTP error. status: ${response.status}`);

    return response.json();
};