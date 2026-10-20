export interface Platform {
    id: number;
    name: string;
    slug: string;
}

export interface ParentPlatform {
    platform: Platform;
}

export interface Game {
    metacritic: number;
    id: number;
    slug: string;
    name: string;
    released: string;
    background_image: string;
    rating: number;
    parent_platforms: ParentPlatform[];
    description_raw?: string;
    developers?: { id: number; name: string }[];
    publishers?: { id: number; name: string }[];
    genres?: { id: number; name: string }[];
    playtime?: number;
    esrb_rating?: { id: number; name: string } | null;
    website?: string;
    tags?: { id: number; name: string; language: string }[];
    stores?: { id: number; store: { name: string; domain: string } }[];
}

export interface RAWGResponse<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}