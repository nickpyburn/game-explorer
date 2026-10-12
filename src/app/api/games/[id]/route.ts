import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const apiKey = process.env.RAWG_API_KEY;

    if (!apiKey) {
        return NextResponse.json(
            { error: 'Internal Server Error: API key is missing.' },
            { status: 500 }
        );
    }

    try {
        const response = await fetch(`https://api.rawg.io/api/games/${params.id}?key=${apiKey}`, {
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