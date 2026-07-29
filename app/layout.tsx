import type { Metadata } from 'next';
import { JetBrains_Mono, Newsreader } from 'next/font/google';
import type { PropsWithChildren } from 'react';
import SiteFooter from '@/components/site-footer';
import SiteHeader from '@/components/site-header';
import './globals.css';

const jetbrainsMono = JetBrains_Mono({
    subsets: ['latin'],
    weight: ['400', '500', '600'],
    variable: '--font-jetbrains-mono',
});

const newsreader = Newsreader({
    subsets: ['latin'],
    weight: ['400', '500'],
    style: 'normal',
    variable: '--font-newsreader',
});

const APP_NAME = 'Martin Carlin - Laravel Developer Glasgow';

export const metadata: Metadata = {
    title: {
        template: `%s - ${APP_NAME}`,
        default: APP_NAME,
    },
    icons: {
        icon: [
            { url: '/favicon.ico', sizes: 'any' },
            { url: '/favicon.svg', type: 'image/svg+xml' },
        ],
        apple: '/apple-touch-icon.png',
    },
};

export default function RootLayout({ children }: PropsWithChildren) {
    return (
        <html
            lang="en"
            className={`${jetbrainsMono.variable} ${newsreader.variable}`}
        >
            <body className="antialiased">
                <div className="site-shell relative flex min-h-screen flex-col overflow-x-hidden">
                    <SiteHeader />
                    <main className="relative z-10 flex-1">{children}</main>
                    <SiteFooter />
                </div>
            </body>
        </html>
    );
}
