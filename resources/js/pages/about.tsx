import { Head } from '@inertiajs/react';

const STACK = [
    { k: 'languages', v: 'PHP · TypeScript · SQL · a little Go' },
    { k: 'server', v: 'Laravel · Postgres · Redis · queues' },
    { k: 'client', v: 'React · Inertia · Tailwind · Vite' },
    { k: 'plumbing', v: 'GitHub Actions · Forge · Cloud · Docker' },
    { k: 'likes', v: 'Boring tech, fast feedback loops, small PRs' },
];

const META = [
    { k: 'location', v: 'Glasgow, UK · 55.86° N' },
    { k: 'years', v: '~12 shipping' },
    { k: 'status', v: 'open to good problems' },
];

export default function About() {
    return (
        <>
            <Head title="about" />

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
                                    {META.map((m) => (
                                        <div
                                            key={m.k}
                                            className="grid grid-cols-3 gap-x-3"
                                        >
                                            <dt
                                                className="site-mono"
                                                style={{
                                                    color: 'var(--accent)',
                                                }}
                                            >
                                                {m.k}
                                            </dt>
                                            <dd
                                                className="col-span-2"
                                                style={{
                                                    color: 'var(--ink-soft)',
                                                    fontSize: '0.85rem',
                                                }}
                                            >
                                                {m.v}
                                            </dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>

                            <div>
                                <p
                                    className="site-mono mb-2"
                                    style={{ color: 'var(--dim)' }}
                                >
                                    // signature
                                </p>
                                <p
                                    className="site-italic"
                                    style={{
                                        fontSize: '2.4rem',
                                        lineHeight: 0.95,
                                    }}
                                >
                                    mc.
                                </p>
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
                                I&apos;m a software engineer based in Glasgow.
                                Most of my career has been spent inside the{' '}
                                <span style={{ color: 'var(--ink)' }}>
                                    Laravel and React
                                </span>{' '}
                                ecosystems, building internal-facing tools and
                                the kind of customer-facing products that have
                                to keep running for years rather than quarters.
                            </p>
                            <p>
                                I care about the unfashionable bits of the craft
                                — clean migrations, observable queues, a test
                                suite that runs in under a minute, commit
                                messages that read like sentences. The faster
                                the feedback loop, the better the decisions
                                further down the line.
                            </p>
                            <p>
                                Outside of work I tinker with side projects,
                                keep one eye on the JavaScript world (it never
                                stops), and the rest on family life. This site
                                is part portfolio, part field notebook —{' '}
                                <span
                                    style={{
                                        fontFamily: 'var(--font-serif)',
                                        fontStyle: 'italic',
                                        color: 'var(--ink)',
                                    }}
                                >
                                    equal parts of both
                                </span>
                                .
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
                            {STACK.map((row) => (
                                <div
                                    key={row.k}
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
                                        {row.k}
                                    </dt>
                                    <dd
                                        className="col-span-8 md:col-span-9"
                                        style={{
                                            color: 'var(--ink-soft)',
                                        }}
                                    >
                                        {row.v}
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
