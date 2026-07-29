'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV = [
    { index: '01', label: 'index', href: '/' },
    { index: '02', label: 'about', href: '/about' },
    { index: '03', label: 'contact', href: '/contact' },
];

export default function SiteHeader() {
    const pathname = usePathname();
    const path = pathname === '/' ? 'index' : pathname.replace(/^\//, '');

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
                                ? pathname === '/'
                                : pathname.startsWith(item.href);

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
                </nav>
            </div>
        </header>
    );
}
