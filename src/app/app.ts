export interface GameQuery {
    genre: string | null;
    platform: string | null;
    sortOrder: string;
    searchText: string;
    page: number;
}