import { NextRequest, NextResponse } from 'next/server';
import { mockGamesResponse } from "@/app/data/mockGames";

export const dynamic = 'force-dynamic';

const useMockData = false;

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);

    const search = searchParams.get('search') || '';
    const genres = searchParams.get('genres') || '';
    const parent_platforms = searchParams.get('parent_platforms') || '';
    const ordering = searchParams.get('ordering') || '-added';
    const page = searchParams.get('page') || '1';
    const dates = searchParams.get('dates') || '';
    
    if (useMockData) {
        let filteredResults = [...mockGamesResponse.results];

        if (search) {
            filteredResults = filteredResults.filter(game =>
                game.name.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (genres) {
            const genreList = genres.split(',').map(g => g.toLowerCase());
            filteredResults = filteredResults.filter(game =>
                game.genres?.some(g => genreList.includes(g.slug.toLowerCase()))
            );
        }

        if (parent_platforms) {
            const platformList = new Set(parent_platforms.split(',').map(Number));
            filteredResults = filteredResults.filter(game =>
                game.parent_platforms?.some(p => platformList.has(p.platform.id))
            );
        }

        return NextResponse.json({
            ...mockGamesResponse,
            count: filteredResults.length,
            results: filteredResults,
        });
    }
    
    const apiKey = process.env.RAWG_API_KEY;

    if (!apiKey) {
        return NextResponse.json(
            { error: 'Internal Server Error: API key is missing.' },
            { status: 500 }
        );
    }

    const targetUrl = new URL('https://api.rawg.io/api/games');
    targetUrl.searchParams.append('key', apiKey);
    targetUrl.searchParams.append('page_size', '20');

    if (search) {
        targetUrl.searchParams.append('search', search);
        targetUrl.searchParams.append('search_exact', 'true');
    }
    if (genres) targetUrl.searchParams.append('genres', genres);
    if (parent_platforms) targetUrl.searchParams.append('parent_platforms', parent_platforms);
    if (ordering) targetUrl.searchParams.append('ordering', ordering);
    if (page) targetUrl.searchParams.append('page', page);
    if (dates) targetUrl.searchParams.append('dates', dates);

    try {
        const response = await fetch(targetUrl.toString(), {
            cache: 'no-store',
            headers: {
                'User-Agent': 'Gamevault-Dev-Project/1.0',
            },
        });

        if (!response.ok) {
            return NextResponse.json(
                { error: `RAWG API responded with status ${response.status}` },
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json(data);

    } catch {
        return NextResponse.json(
            { error: 'Failed to communicate with RAWG API.' },
            { status: 500 }
        );
    }
}