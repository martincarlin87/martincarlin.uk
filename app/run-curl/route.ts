import type { NextRequest } from 'next/server';
import { buildBio } from '@/lib/bio';

export const dynamic = 'force-dynamic';

/**
 * Backs the interactive terminal on the homepage: requests `/` the way a
 * terminal client would (curl user-agent) and relays the plain-text response.
 * Falls back to serving the bio directly if the self-request fails (e.g.
 * password-protected Vercel preview deployments).
 */
export async function GET(request: NextRequest): Promise<Response> {
    const origin = new URL(request.url).origin;
    let output: string;

    try {
        const response = await fetch(`${origin}/`, {
            headers: { 'User-Agent': 'curl/8.0 (martincarlin-terminal)' },
            cache: 'no-store',
            signal: AbortSignal.timeout(8_000),
        });

        const contentType = response.headers.get('content-type') ?? '';

        output =
            response.ok && contentType.includes('text/plain')
                ? await response.text()
                : buildBio();
    } catch {
        output = buildBio();
    }

    return new Response(output, {
        status: 200,
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'no-store',
        },
    });
}
