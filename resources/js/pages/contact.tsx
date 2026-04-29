import { Form, Head } from '@inertiajs/react';
import ContactController from '@/actions/App/Http/Controllers/ContactController';

const CHANNELS = [
    { k: 'email', v: 'martin@martincarlin.uk' },
    { k: 'github', v: '@martincarlin87' },
    { k: 'linkedin', v: '/in/martincarlin87' },
    { k: 'where', v: 'Glasgow, UK' },
];

export default function Contact() {
    return (
        <>
            <Head title="contact" />

            <section className="px-6 pt-16 pb-12 md:px-10 md:pt-20 lg:px-14">
                <p
                    className="site-mono site-rise"
                    style={{ color: 'var(--dim)' }}
                >
                    <span style={{ color: 'var(--accent)' }}>$</span> echo
                    &quot;hello&quot; | mail martin
                </p>

                <h1
                    className="site-display site-rise site-rise-2 mt-6"
                    style={{ fontSize: 'clamp(3rem, 10vw, 9rem)' }}
                >
                    drop a <em>line</em>
                </h1>
            </section>

            <section className="px-6 pb-24 md:px-10 lg:px-14">
                <div
                    className="border-t"
                    style={{ borderColor: 'var(--rule)' }}
                >
                    <div className="grid grid-cols-12 gap-x-6 gap-y-12 pt-12">
                        {/* Channels ────────────────────────── */}
                        <aside className="col-span-12 space-y-8 md:col-span-4">
                            <div>
                                <p
                                    className="site-mono mb-4"
                                    style={{ color: 'var(--dim)' }}
                                >
                                    // channels
                                </p>
                                <dl className="space-y-3">
                                    {CHANNELS.map((c) => (
                                        <div
                                            key={c.k}
                                            className="grid grid-cols-3 items-baseline gap-x-3 border-b py-2.5"
                                            style={{
                                                borderColor: 'var(--rule)',
                                            }}
                                        >
                                            <dt
                                                className="site-mono"
                                                style={{
                                                    color: 'var(--accent)',
                                                }}
                                            >
                                                {c.k}
                                            </dt>
                                            <dd
                                                className="col-span-2"
                                                style={{
                                                    fontFamily:
                                                        'var(--font-mono)',
                                                    fontSize: '0.85rem',
                                                    color: 'var(--ink-soft)',
                                                }}
                                            >
                                                {c.v}
                                            </dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>

                            <p
                                style={{
                                    fontSize: '0.95rem',
                                    lineHeight: 1.6,
                                    color: 'var(--ink-soft)',
                                    maxWidth: '32ch',
                                }}
                            >
                                Best for{' '}
                                <span
                                    style={{
                                        fontFamily: 'var(--font-serif)',
                                        fontStyle: 'italic',
                                        color: 'var(--ink)',
                                    }}
                                >
                                    contract work, collaborations, or a chat
                                </span>{' '}
                                about something interesting. I read everything,
                                even if I&apos;m slow to reply.
                            </p>
                        </aside>

                        {/* Form ────────────────────────────── */}
                        <div className="col-span-12 md:col-span-8 md:pl-10 md:[border-left:1px_solid_var(--rule)]">
                            <Form
                                {...ContactController.store.form()}
                                resetOnSuccess
                                className="space-y-8"
                            >
                                {({ processing, errors }) => (
                                    <>
                                        <Field
                                            label="name"
                                            name="name"
                                            autoComplete="name"
                                            error={errors.name}
                                        />
                                        <Field
                                            label="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            error={errors.email}
                                        />
                                        <div>
                                            <PromptLabel
                                                label="message"
                                                htmlFor="message"
                                            />
                                            <textarea
                                                id="message"
                                                name="message"
                                                required
                                                rows={6}
                                                className="site-field"
                                                placeholder="// what's on your mind?"
                                            />
                                            {errors.message && (
                                                <p
                                                    className="site-mono mt-2"
                                                    style={{
                                                        color: 'var(--accent-2)',
                                                    }}
                                                >
                                                    err: {errors.message}
                                                </p>
                                            )}
                                        </div>

                                        <div className="flex flex-wrap items-center gap-6 pt-3">
                                            <button
                                                type="submit"
                                                disabled={processing}
                                                className="site-button"
                                            >
                                                {processing
                                                    ? 'sending…'
                                                    : 'send'}
                                            </button>
                                            <span
                                                className="site-mono"
                                                style={{
                                                    color: 'var(--dim)',
                                                }}
                                            >
                                                avg. reply &lt; 48h
                                            </span>
                                        </div>
                                    </>
                                )}
                            </Form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

function PromptLabel({ label, htmlFor }: { label: string; htmlFor: string }) {
    return (
        <label
            htmlFor={htmlFor}
            className="site-mono mb-2 flex items-baseline gap-2"
            style={{ color: 'var(--ink-soft)' }}
        >
            <span style={{ color: 'var(--accent)' }}>&gt;</span>
            {label}
        </label>
    );
}

function Field({
    label,
    name,
    type = 'text',
    autoComplete,
    error,
}: {
    label: string;
    name: string;
    type?: string;
    autoComplete?: string;
    error?: string;
}) {
    return (
        <div>
            <PromptLabel label={label} htmlFor={name} />
            <input
                id={name}
                name={name}
                type={type}
                required
                autoComplete={autoComplete}
                className="site-field"
            />
            {error && (
                <p
                    className="site-mono mt-2"
                    style={{ color: 'var(--accent-2)' }}
                >
                    err: {error}
                </p>
            )}
        </div>
    );
}
