import { Head, Link } from '@inertiajs/react';
import CurlTerminal from '@/components/curl-terminal';
import { about, contact } from '@/routes';

const LOG = [
    {
        year: '2026 →',
        summary:
            'Senior dev at Fastdox · Laravel 13 + Inertia + React · AI document verification',
    },
    {
        year: '2023–25',
        summary:
            'Senior dev at CultureAI · PHP 8.3 + Laravel 11 microservices · Vue 3 + Inertia · AWS Bedrock GenAI features',
    },
    {
        year: '2020–22',
        summary:
            'Tech lead at Product Guru · Stripe · Jitsi virtual events · Hubspot migration · React Native',
    },
    {
        year: '2019–20',
        summary:
            'Senior at Cyberhawk Innovations · Drone imagery tooling in Go · Laravel proof-of-concept rewrites',
    },
    {
        year: '2018–19',
        summary:
            'Software dev at Valipat / Envoy / Delegate / IPAN · refactoring legacy code, AWS migrations',
    },
    {
        year: '2016–18',
        summary:
            'Web app dev at TOM Vehicle Rental · Customer Portal, Fleet Manager, offline-first checksheets',
    },
    {
        year: '2013–16',
        summary:
            'Sole dev at Commsworld · Ruby on Rails CRM · EchoSign integration · ISO 27001 tooling',
    },
    {
        year: '2011–13',
        summary:
            'Web dev at Optical Express · marketing campaigns, landing pages, the odd Facebook app',
    },
];

const CURRENTLY = [
    {
        label: 'shipping',
        value: 'AI document verification at Fastdox — Laravel 13 + Inertia',
    },
    {
        label: 'building',
        value: 'Plantfitter — Laravel 13, Inertia 3, React 19, full GitHub Actions CI',
    },
    {
        label: 'offline',
        value: 'Bass in a wedding band touring Scotland · PUBG & EAFC · one Husky and three Ragdoll cats',
    },
];

export default function Home() {
    return (
        <>
            <Head title="Home" />

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
                            </span>{' '}
                            since 2011. Currently shipping AI document
                            verification at{' '}
                            <span
                                style={{
                                    fontFamily: 'var(--font-serif)',
                                    color: 'var(--accent-2)',
                                    textShadow:
                                        '0 0 24px rgba(255, 43, 214, 0.3)',
                                }}
                            >
                                Fastdox
                            </span>
                            ; side projects in the evenings; bass in a wedding
                            band on weekends.
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
                            {CURRENTLY.map((item) => (
                                <li
                                    key={item.label}
                                    className="grid grid-cols-12 items-baseline gap-x-6"
                                >
                                    <span
                                        className="site-mono col-span-4 md:col-span-2"
                                        style={{
                                            color: 'var(--accent)',
                                        }}
                                    >
                                        {item.label}
                                    </span>
                                    <span
                                        className="col-span-8 md:col-span-10"
                                        style={{
                                            color: 'var(--ink-soft)',
                                        }}
                                    >
                                        {item.value}
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
                                key={entry.year + entry.summary}
                                className="grid grid-cols-12 items-baseline gap-x-6 border-t py-5"
                                style={{
                                    borderColor: 'var(--rule)',
                                }}
                            >
                                <span
                                    className="site-mono col-span-3 md:col-span-2"
                                    style={{ color: 'var(--accent)' }}
                                >
                                    {entry.year}
                                </span>
                                <span
                                    className="col-span-9 md:col-span-10"
                                    style={{
                                        color: 'var(--ink-soft)',
                                        fontSize: '0.95rem',
                                    }}
                                >
                                    {entry.summary}
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
