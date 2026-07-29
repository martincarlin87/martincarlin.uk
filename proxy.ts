import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

/**
 * Terminal clients (curl, wget, …) hitting the homepage get the
 * ANSI-coloured plain-text bio instead of the HTML page.
 */
export default function proxy(request: NextRequest) {
    const userAgent = request.headers.get('user-agent') ?? '';

    if (/\b(curl|wget|httpie|fetch|powershell)\b/i.test(userAgent)) {
        return NextResponse.rewrite(new URL('/bio', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/',
};
