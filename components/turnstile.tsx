'use client';

import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';

type TurnstileApi = {
    render: (
        container: HTMLElement,
        options: { sitekey: string; theme?: 'light' | 'dark' | 'auto' },
    ) => string;
    reset: (widgetId: string) => void;
    remove: (widgetId: string) => void;
};

declare global {
    interface Window {
        turnstile?: TurnstileApi;
    }
}

/**
 * Cloudflare Turnstile widget. Adds a hidden `cf-turnstile-response` field to
 * the enclosing form, which the server action verifies.
 *
 * Tokens are single-use, so the widget is reset whenever `resetSignal`
 * changes (i.e. after each submission).
 */
export default function Turnstile({
    siteKey,
    resetSignal,
}: {
    siteKey: string;
    resetSignal: unknown;
}) {
    const containerRef = useRef<HTMLDivElement>(null);
    const widgetIdRef = useRef<string | null>(null);
    const lastSignalRef = useRef(resetSignal);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        if (!ready || !containerRef.current || !window.turnstile) {
            return;
        }

        const widgetId = window.turnstile.render(containerRef.current, {
            sitekey: siteKey,
            theme: 'dark',
        });
        widgetIdRef.current = widgetId;

        return () => {
            window.turnstile?.remove(widgetId);
            widgetIdRef.current = null;
        };
    }, [ready, siteKey]);

    useEffect(() => {
        if (lastSignalRef.current === resetSignal) {
            return;
        }

        lastSignalRef.current = resetSignal;

        if (widgetIdRef.current) {
            window.turnstile?.reset(widgetIdRef.current);
        }
    }, [resetSignal]);

    return (
        <>
            <Script
                src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
                onReady={() => setReady(true)}
            />
            <div ref={containerRef} />
        </>
    );
}
