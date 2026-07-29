import { buildBio } from '@/lib/bio';

export function GET(): Response {
    return new Response(buildBio(), {
        status: 200,
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'no-store',
            Server: 'martin-carlin/v1',
        },
    });
}
