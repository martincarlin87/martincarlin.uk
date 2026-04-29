import { Head, Link } from '@inertiajs/react';
import CurlTerminal from '@/components/curl-terminal';
import { about, contact } from '@/routes';

const LOG = [
    {
        time: '2025',
        msg: 'Senior engineer at Fastdox · Laravel · Vue · Postgres',
    },
    {
        time: '2024',
        msg: 'Lead on document automation tooling · Inertia · TypeScript',
    },
    {
        time: '2023',
        msg: 'Internal platform refresh · React · Tailwind · CI',
    },
    {
        time: '2022',
        msg: 'API & integration layer · Laravel · Redis · Queues',
    },
];

const CURRENTLY = [
    { k: 'reading', v: 'A Philosophy of Software Design — John Ousterhout' },
    { k: 'building', v: 'A small CLI for tracking deploy windows' },
    { k: 'thinking', v: 'About the cost of premature abstractions' },
];

export default function Home() {
    return (
        <>
            <Head title="index" />

            {/* HERO ─────────────────────────────────────────────── */}
            <section className="relative px-6 pt-16 pb-24 md:px-10 md:pt-20 lg:px-14 lg:pt-24">
                <p
                    className="site-mono site-rise"
                    style={{ color: 'var(--dim)' }}
                >
                    <span style={{ color: 'var(--accent)' }}>$</span> whoami
                </p>

                <h1
                    className="site-display site-rise site-rise-2 mt-6"
                    style={{
                        fontSize: 'clamp(3.5rem, 13vw, 12rem)',
                    }}
                >
                    <span className="block">martin</span>
                    <span className="block">
                        <em>carlin</em>
                        <span className="site-cursor" aria-hidden />
                    </span>
                </h1>

                <div className="site-rise site-rise-3 mt-12 grid grid-cols-12 gap-x-6 gap-y-6 md:mt-16">
                    <div className="col-span-12 md:col-span-3">
                        <p
                            className="site-mono"
                            style={{ color: 'var(--dim)' }}
                        >
                            // role
                        </p>
                    </div>
                    <div className="col-span-12 md:col-span-7">
                        <p
                            style={{
                                fontSize: 'clamp(1.05rem, 1.4vw, 1.25rem)',
                                lineHeight: 1.55,
                                color: 'var(--ink-soft)',
                            }}
                        >
                            Software engineer in Glasgow, building long-running
                            products in{' '}
                            <span style={{ color: 'var(--ink)' }}>
                                Laravel and React
                            </span>
                            . Currently shipping at{' '}
                            <span
                                style={{
                                    fontFamily: 'var(--font-serif)',
                                    fontStyle: 'italic',
                                    color: 'var(--accent-2)',
                                    textShadow:
                                        '0 0 24px rgba(255, 43, 214, 0.3)',
                                }}
                            >
                                Fastdox
                            </span>
                            , tinkering on side projects after hours.
                        </p>

                        <div className="mt-10 flex flex-wrap items-center gap-5">
                            <Link href={contact().url} className="site-button">
                                send.message
                            </Link>
                            <Link
                                href={about().url}
                                className="site-link site-mono"
                            >
                                cat ./about →
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* TRY IT ───────────────────────────────────────────── */}
            <section className="px-6 pb-20 md:px-10 lg:px-14">
                <div className="grid grid-cols-12 gap-x-6 gap-y-6">
                    <div className="col-span-12 md:col-span-3">
                        <p
                            className="site-mono"
                            style={{ color: 'var(--dim)' }}
                        >
                            // try it
                        </p>
                        <p
                            className="mt-3"
                            style={{
                                color: 'var(--ink-soft)',
                                fontSize: '0.92rem',
                                lineHeight: 1.55,
                                maxWidth: '26ch',
                            }}
                        >
                            For the impatient. Server actually shells out to{' '}
                            <span
                                style={{
                                    fontFamily: 'var(--font-mono)',
                                    color: 'var(--accent)',
                                }}
                            >
                                curl
                            </span>
                            ; you&apos;ll see what it sees. Try it yourself in
                            your own terminal.
                        </p>
                    </div>
                    <div className="col-span-12 md:col-span-9">
                        <CurlTerminal />
                    </div>
                </div>
            </section>

            {/* CURRENTLY ─────────────────────────────────────────── */}
            <section className="px-6 md:px-10 lg:px-14">
                <div
                    className="border-t border-b"
                    style={{ borderColor: 'var(--rule)' }}
                >
                    <div className="grid grid-cols-12 gap-x-6 gap-y-6 py-10 md:py-12">
                        <div className="col-span-12 md:col-span-3">
                            <p
                                className="site-mono"
                                style={{ color: 'var(--dim)' }}
                            >
                                // currently
                            </p>
                        </div>
                        <ul className="col-span-12 space-y-3 md:col-span-9">
                            {CURRENTLY.map((row) => (
                                <li
                                    key={row.k}
                                    className="grid grid-cols-12 items-baseline gap-x-6"
                                >
                                    <span
                                        className="site-mono col-span-4 md:col-span-2"
                                        style={{
                                            color: 'var(--accent)',
                                        }}
                                    >
                                        {row.k}
                                    </span>
                                    <span
                                        className="col-span-8 md:col-span-10"
                                        style={{
                                            color: 'var(--ink-soft)',
                                        }}
                                    >
                                        {row.v}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* WORK LOG ─────────────────────────────────────────── */}
            <section className="px-6 py-20 md:px-10 lg:px-14">
                <div className="grid grid-cols-12 gap-x-6 gap-y-8">
                    <div className="col-span-12 md:col-span-3">
                        <p
                            className="site-mono"
                            style={{ color: 'var(--dim)' }}
                        >
                            // log
                        </p>
                        <h2
                            className="site-display mt-3"
                            style={{
                                fontSize: 'clamp(1.5rem, 2.4vw, 2rem)',
                                color: 'var(--ink)',
                            }}
                        >
                            tail -f
                            <br />
                            <em>career.log</em>
                        </h2>
                    </div>

                    <ol className="col-span-12 md:col-span-9">
                        {LOG.map((entry) => (
                            <li
                                key={entry.time + entry.msg}
                                className="grid grid-cols-12 items-baseline gap-x-6 border-t py-5"
                                style={{
                                    borderColor: 'var(--rule)',
                                }}
                            >
                                <span
                                    className="site-mono col-span-3 md:col-span-2"
                                    style={{ color: 'var(--accent)' }}
                                >
                                    {entry.time}
                                </span>
                                <span
                                    className="col-span-9 md:col-span-10"
                                    style={{
                                        color: 'var(--ink-soft)',
                                        fontSize: '0.95rem',
                                    }}
                                >
                                    {entry.msg}
                                </span>
                            </li>
                        ))}
                        <li
                            className="border-t"
                            style={{ borderColor: 'var(--rule)' }}
                        />
                    </ol>
                </div>
            </section>
        </>
    );
}
