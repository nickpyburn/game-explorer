export interface Platform {
    id: number;
    name: string;
    slug: string;
}

export interface ParentPlatform {
    platform: Platform;
}

export interface Game {
    id: number;
    slug: string;
    name: string;
    released: string;
    background_image: string;
    rating: number;
    parent_platforms: ParentPlatform[];
}

export interface RAWGResponse<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}