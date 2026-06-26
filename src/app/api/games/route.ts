import { NextRequest, NextResponse } from 'next/server';
import { mockGamesResponse } from "@/app/data/mockGames";

const useMockData = true;

export async function GET(request: NextRequest) {
    // if Dev Mode is active, bypass RAWG entirely and return local file. Saves API credits!
    if (useMockData) {
        return NextResponse.json(mockGamesResponse);
    }

    const { searchParams } = new URL(request.url);

    const search = searchParams.get('search') || '';
    const genres = searchParams.get('genres') || '';
    const parent_platforms = searchParams.get('parent_platforms') || '';
    const ordering = searchParams.get('ordering') || '-added';
    const page = searchParams.get('page') || '1';

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

    if (search) targetUrl.searchParams.append('search', search);
    if (genres) targetUrl.searchParams.append('genres', genres);
    if (parent_platforms) targetUrl.searchParams.append('parent_platforms', parent_platforms);
    if (ordering) targetUrl.searchParams.append('ordering', ordering);
    if (page) targetUrl.searchParams.append('page', page);

    try {
        const response = await fetch(targetUrl.toString(), {
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

    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to communicate with RAWG API.' },
            { status: 500 }
        );
    }
}