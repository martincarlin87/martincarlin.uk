import { Head } from '@inertiajs/react';

const STACK = [
    {
        label: 'languages',
        value: 'PHP 8.5 · TypeScript · SQL · a little Go',
    },
    { label: 'server', value: 'Laravel 13 · MySQL · Redis · queues' },
    { label: 'client', value: 'React 19 · Inertia 3 · Tailwind 4 · Vite' },
    {
        label: 'tooling',
        value: 'Laravel Sail · GitHub Actions · Pint · PHPStan · ESLint · Pest',
    },
    {
        label: 'integrations',
        value: 'Stripe · AWS Bedrock · Slack · Microsoft · Google · Okta · Hubspot',
    },
    {
        label: 'likes',
        value: 'Boring tech, fast feedback loops, small PRs, careful reviews',
    },
];

const META = [
    { label: 'location', value: 'Glasgow, UK · 55.86° N' },
    { label: 'years', value: '~14 shipping' },
    { label: 'status', value: 'open to good problems' },
];

const ELSEWHERE = [
    {
        label: 'github',
        value: '@martincarlin87',
        href: 'https://github.com/martincarlin87',
    },
    {
        label: 'linkedin',
        value: '/in/martincarlin87',
        href: 'https://www.linkedin.com/in/martincarlin87/',
    },
    {
        label: 'stack',
        value: '10k+ rep',
        href: 'https://stackoverflow.com/users/634120/martincarlin87',
    },
    {
        label: 'laramap',
        value: 'developer profile',
        href: 'https://laramap.dev/developer/019a639c-89ef-73a3-92d8-5a912d333c0f',
    },
];

export default function About() {
    return (
        <>
            <Head title="About" />

            <section className="px-6 pt-16 pb-12 md:px-10 md:pt-20 lg:px-14">
                <p
                    className="site-mono site-rise"
                    style={{ color: 'var(--dim)' }}
                >
                    <span style={{ color: 'var(--accent)' }}>$</span> cat
                    ./about.md
                </p>

                <h1
                    className="site-display site-rise site-rise-2 mt-6"
                    style={{ fontSize: 'clamp(3rem, 9vw, 8rem)' }}
                >
                    on the <em>record</em>
                </h1>
            </section>

            <section className="px-6 pb-12 md:px-10 lg:px-14">
                <div
                    className="border-t"
                    style={{ borderColor: 'var(--rule)' }}
                >
                    <div className="grid grid-cols-12 gap-x-6 gap-y-12 pt-12">
                        {/* Side meta — man page style ─────────── */}
                        <aside className="col-span-12 space-y-8 md:col-span-3">
                            <div>
                                <p
                                    className="site-mono mb-3"
                                    style={{ color: 'var(--dim)' }}
                                >
                                    // meta
                                </p>
                                <dl className="space-y-2">
                                    {META.map((metaItem) => (
                                        <div
                                            key={metaItem.label}
                                            className="grid grid-cols-3 gap-x-3"
                                        >
                                            <dt
                                                className="site-mono"
                                                style={{
                                                    color: 'var(--accent)',
                                                }}
                                            >
                                                {metaItem.label}
                                            </dt>
                                            <dd
                                                className="col-span-2"
                                                style={{
                                                    color: 'var(--ink-soft)',
                                                    fontSize: '0.85rem',
                                                }}
                                            >
                                                {metaItem.value}
                                            </dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>

                            <div>
                                <p
                                    className="site-mono mb-3"
                                    style={{ color: 'var(--dim)' }}
                                >
                                    // elsewhere
                                </p>
                                <ul className="space-y-2">
                                    {ELSEWHERE.map((entry) => (
                                        <li
                                            key={entry.label}
                                            className="grid grid-cols-3 items-baseline gap-x-3"
                                        >
                                            <span
                                                className="site-mono"
                                                style={{
                                                    color: 'var(--accent)',
                                                }}
                                            >
                                                {entry.label}
                                            </span>
                                            <a
                                                href={entry.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="site-link col-span-2"
                                                style={{
                                                    fontFamily:
                                                        'var(--font-mono)',
                                                    fontSize: '0.78rem',
                                                    color: 'var(--ink-soft)',
                                                }}
                                            >
                                                {entry.value}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </aside>

                        {/* Body ─────────────────────────────── */}
                        <article
                            className="col-span-12 space-y-6 md:col-span-9"
                            style={{
                                fontSize: '1rem',
                                lineHeight: 1.7,
                                color: 'var(--ink-soft)',
                                maxWidth: '60ch',
                            }}
                        >
                            <p>
                                <span
                                    style={{
                                        color: 'var(--accent)',
                                    }}
                                >
                                    {'> '}
                                </span>
                                I&apos;m a software engineer based in Glasgow,
                                building for the web professionally since 2011.
                                Mostly{' '}
                                <span style={{ color: 'var(--ink)' }}>
                                    PHP and Laravel
                                </span>
                                , and increasingly{' '}
                                <span style={{ color: 'var(--ink)' }}>
                                    React via Inertia
                                </span>{' '}
                                — the kind of work that has to keep running for
                                years rather than quarters.
                            </p>
                            <p>
                                Currently a senior dev at Fastdox , where I
                                recently shipped an AI document verification
                                microservice (Laravel 13 + Inertia + React, full
                                test suite) after taking the project over from a
                                deadline that wasn&apos;t going to be hit.
                                Before that, three years at CultureAI shipping
                                Gen AI features through AWS Bedrock and
                                integrating with most of the identity providers
                                you can name; before that, tech lead at Product
                                Guru, taking the company from zero to £500k+
                                revenue.
                            </p>
                            <p>
                                I care about the unfashionable bits of the craft
                                - clean migrations, observable queues, a test
                                suite that runs in under a minute, commit
                                messages that read like sentences. I review pull
                                requests carefully, answer Laravel questions on
                                Stack Overflow (~10k rep), and write up anything
                                I&apos;ve solved that wasn&apos;t already
                                documented.
                            </p>
                            <p>
                                Outside of work I tinker with side projects,
                                play bass in a wedding band that tours Scotland,
                                and split the rest of my time between
                                practising, gaming, a Husky called Luna, and
                                three Ragdoll cats.
                            </p>
                        </article>
                    </div>
                </div>
            </section>

            {/* Stack table ──────────────────────────────────────── */}
            <section className="px-6 pb-24 md:px-10 lg:px-14">
                <div
                    className="border-t"
                    style={{ borderColor: 'var(--rule)' }}
                >
                    <div className="grid grid-cols-12 gap-x-6 gap-y-8 pt-12">
                        <div className="col-span-12 md:col-span-3">
                            <p
                                className="site-mono"
                                style={{ color: 'var(--dim)' }}
                            >
                                // stack
                            </p>
                            <h2
                                className="site-display mt-3"
                                style={{
                                    fontSize: 'clamp(1.5rem, 2.4vw, 2rem)',
                                }}
                            >
                                the <em>tools</em>
                            </h2>
                        </div>
                        <dl className="col-span-12 md:col-span-9">
                            {STACK.map((stackItem) => (
                                <div
                                    key={stackItem.label}
                                    className="grid grid-cols-12 items-baseline gap-x-6 border-t py-4"
                                    style={{
                                        borderColor: 'var(--rule)',
                                    }}
                                >
                                    <dt
                                        className="site-mono col-span-4 md:col-span-3"
                                        style={{
                                            color: 'var(--accent)',
                                        }}
                                    >
                                        {stackItem.label}
                                    </dt>
                                    <dd
                                        className="col-span-8 md:col-span-9"
                                        style={{
                                            color: 'var(--ink-soft)',
                                        }}
                                    >
                                        {stackItem.value}
                                    </dd>
                                </div>
                            ))}
                            <div
                                className="border-t"
                                style={{ borderColor: 'var(--rule)' }}
                            />
                        </dl>
                    </div>
                </div>
            </section>
        </>
    );
}
