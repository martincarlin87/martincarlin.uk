import { Head, Link, usePage } from '@inertiajs/react';
import type { PropsWithChildren } from 'react';
import { about, contact, dashboard, home, login } from '@/routes';

const NAV = [
    { index: '01', label: 'index', href: home().url },
    { index: '02', label: 'about', href: about().url },
    { index: '03', label: 'contact', href: contact().url },
];

export default function SiteLayout({ children }: PropsWithChildren) {
    const { url, props } = usePage();
    const auth = props.auth;
    const path = pathFromUrl(url);

    return (
        <div className="site-shell relative flex min-h-screen flex-col overflow-x-hidden">
            <Head>
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    rel="stylesheet"
                    href="https://fonts.bunny.net/css?family=jetbrains-mono:400,500,600|newsreader:400i,500i&display=swap"
                />
            </Head>

            <SiteHeader
                path={path}
                authed={Boolean(auth?.user)}
                currentUrl={url}
            />

            <main className="relative z-10 flex-1">{children}</main>

            <SiteFooter />
        </div>
    );
}

function pathFromUrl(url: string): string {
    if (url === '/') {
        return 'index';
    }

    return url.replace(/^\//, '').split('?')[0];
}

function SiteHeader({
    path,
    authed,
    currentUrl,
}: {
    path: string;
    authed: boolean;
    currentUrl: string;
}) {
    return (
        <header className="relative z-20 px-6 pt-6 md:px-10 lg:px-14">
            <div
                className="flex flex-wrap items-center justify-between gap-6 border-b py-3"
                style={{ borderColor: 'var(--rule)' }}
            >
                <Link
                    href="/"
                    className="site-path inline-flex items-center gap-3"
                >
                    <span className="site-pulse" aria-hidden />
                    <span>
                        <span className="tilde">~</span>
                        <span className="slash">/</span>
                        <span style={{ color: 'var(--ink)' }}>
                            martin.carlin
                        </span>
                        <span className="slash">/</span>
                        <span>{path}</span>
                    </span>
                </Link>

                <nav className="flex flex-wrap items-center gap-5 md:gap-7">
                    {NAV.map((item) => {
                        const active =
                            item.href === '/'
                                ? currentUrl === '/'
                                : currentUrl.startsWith(item.href);

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                data-active={active}
                                className="site-link site-mono"
                            >
                                <span
                                    className="mr-1.5"
                                    style={{ color: 'var(--accent)' }}
                                >
                                    {item.index}
                                </span>
                                {item.label}
                            </Link>
                        );
                    })}
                    <span
                        aria-hidden
                        className="hidden h-3 w-px md:inline-block"
                        style={{ background: 'var(--rule-strong)' }}
                    />
                    <Link
                        href={authed ? dashboard().url : login().url}
                        className="site-link site-mono"
                    >
                        {authed ? 'desk →' : 'login →'}
                    </Link>
                </nav>
            </div>
        </header>
    );
}

function SiteFooter() {
    const year = new Date().getFullYear();

    return (
        <footer className="relative z-20 mt-32 px-6 md:px-10 lg:px-14">
            <hr className="site-rule" />
            <div className="flex flex-wrap items-center justify-between gap-4 py-6">
                <span className="site-path">
                    <span className="tilde">~</span>
                    <span className="slash">/</span>
                    <span style={{ color: 'var(--dim)' }}>EOF</span>
                </span>
                <span className="site-mono" style={{ color: 'var(--dim)' }}>
                    © {year} · Martin Carlin · Glasgow
                </span>
                <span className="site-mono" style={{ color: 'var(--dim)' }}>
                    Laravel · Inertia · React
                </span>
            </div>
        </footer>
    );
}
