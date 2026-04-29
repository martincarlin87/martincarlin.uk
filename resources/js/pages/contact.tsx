import { Form, Head } from '@inertiajs/react';
import { Mail, MapPin } from 'lucide-react';
import type { ReactNode } from 'react';
import ContactController from '@/actions/App/Http/Controllers/ContactController';

const ICON_PX = 14;

function GithubIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            width={ICON_PX}
            height={ICON_PX}
            fill="currentColor"
            aria-hidden
        >
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
    );
}

function LinkedinIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            width={ICON_PX}
            height={ICON_PX}
            fill="currentColor"
            aria-hidden
        >
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
    );
}

function StackOverflowIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            width={ICON_PX}
            height={ICON_PX}
            fill="currentColor"
            aria-hidden
        >
            <path d="M15.725 0l-1.72 1.277 6.39 8.588 1.716-1.277L15.725 0zm-3.94 3.418l-1.369 1.644 8.225 6.85 1.369-1.644-8.225-6.85zm-3.15 4.465l-.905 1.94 9.702 4.517.904-1.94-9.701-4.517zm-1.85 4.86l-.44 2.093 10.473 2.201.44-2.092-10.473-2.203zM1.89 15.47V24h19.19v-8.53h-2.133v6.397H4.021v-6.396H1.89zm4.265 2.133v2.13h10.66v-2.13H6.154Z" />
        </svg>
    );
}

function LaravelIcon() {
    return (
        <svg
            viewBox="0 0 50 52"
            width={ICON_PX}
            height={ICON_PX}
            fill="currentColor"
            aria-hidden
        >
            <path d="M49.626 11.564a.809.809 0 0 1 .028.209v10.972a.8.8 0 0 1-.402.694l-9.209 5.302V39.25c0 .286-.152.55-.4.694L20.42 51.01c-.044.025-.092.041-.14.058-.018.006-.035.017-.054.022a.805.805 0 0 1-.41 0c-.022-.006-.042-.018-.063-.026-.044-.016-.09-.03-.132-.054L.402 39.944A.801.801 0 0 1 0 39.25V6.334c0-.072.01-.142.028-.21.006-.023.02-.044.028-.067.015-.042.029-.085.051-.124.015-.026.037-.047.055-.071.023-.032.044-.065.071-.093.023-.023.053-.04.079-.06.029-.024.055-.05.088-.069h.001l9.61-5.533a.802.802 0 0 1 .8 0l9.61 5.533h.002c.032.02.059.045.088.068.026.02.055.038.078.06.028.029.048.062.072.094.017.024.04.045.054.071.023.04.036.082.052.124.008.023.022.044.028.068a.809.809 0 0 1 .028.209v20.559l8.008-4.611v-10.51c0-.07.01-.141.028-.208.007-.024.02-.045.028-.068.016-.042.03-.085.052-.124.015-.026.037-.047.054-.071.024-.032.044-.065.072-.093.023-.023.052-.04.078-.06.03-.024.056-.05.088-.069h.001l9.611-5.533a.801.801 0 0 1 .8 0l9.61 5.533c.034.02.06.045.09.068.025.02.054.038.077.06.028.029.048.062.072.094.018.024.04.045.054.071.023.039.036.082.052.124.009.023.022.044.028.068zm-1.574 10.718v-9.124l-3.363 1.936-4.646 2.675v9.124l8.01-4.611zm-9.61 16.505v-9.13l-4.57 2.61-13.05 7.448v9.216l17.62-10.144zM1.602 7.719v31.068L19.22 48.93v-9.214l-9.204-5.209-.003-.002-.004-.002c-.031-.018-.057-.044-.086-.066-.025-.02-.054-.036-.076-.06l-.002-.003c-.026-.025-.044-.056-.066-.084-.02-.027-.044-.05-.06-.078l-.001-.003c-.018-.03-.029-.066-.042-.1-.013-.03-.03-.058-.038-.09v-.001c-.01-.038-.012-.078-.016-.117-.004-.03-.012-.06-.012-.09v-21.483L4.965 9.654 1.602 7.72zm8.81-5.994L2.405 6.334l8.005 4.609 8.006-4.61-8.006-4.608zm4.164 28.764l4.645-2.674V7.719l-3.363 1.936-4.646 2.675v20.096l3.364-1.937zM39.243 7.164l-8.006 4.609 8.006 4.609 8.005-4.61-8.005-4.608zm-.801 10.605l-4.646-2.675-3.363-1.936v9.124l4.645 2.674 3.364 1.937v-9.124zM20.02 38.33l11.743-6.704 5.87-3.35-8-4.606-9.211 5.303-8.395 4.833 7.993 4.524z" />
        </svg>
    );
}

type Channel = {
    label: string;
    value: string;
    href?: string;
    icon: ReactNode;
};

const CHANNELS: Channel[] = [
    {
        label: 'email',
        value: 'martin@martincarlin.uk',
        href: 'mailto:martin@martincarlin.uk',
        icon: <Mail size={ICON_PX} strokeWidth={1.75} aria-hidden />,
    },
    {
        label: 'github',
        value: '@martincarlin87',
        href: 'https://github.com/martincarlin87',
        icon: <GithubIcon />,
    },
    {
        label: 'linkedin',
        value: '/in/martincarlin87',
        href: 'https://www.linkedin.com/in/martincarlin87/',
        icon: <LinkedinIcon />,
    },
    {
        label: 'stackoverflow',
        value: '@martincarlin87 · 10k+ rep',
        href: 'https://stackoverflow.com/users/634120/martincarlin87',
        icon: <StackOverflowIcon />,
    },
    {
        label: 'laramap',
        value: 'developer profile',
        href: 'https://laramap.dev/developer/019a639c-89ef-73a3-92d8-5a912d333c0f',
        icon: <LaravelIcon />,
    },
    {
        label: 'where',
        value: 'Glasgow, UK',
        icon: <MapPin size={ICON_PX} strokeWidth={1.75} aria-hidden />,
    },
];

export default function Contact() {
    return (
        <>
            <Head title="Contact" />

            <section className="px-6 pt-16 pb-12 md:px-10 md:pt-20 lg:px-14">
                <p
                    className="site-mono site-rise"
                    style={{ color: 'var(--dim)' }}
                >
                    <span style={{ color: 'var(--accent)' }}>$</span> echo
                    &quot;hello&quot; | mail martin@martincarlin.uk
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
                                <ul className="space-y-2">
                                    {CHANNELS.map((channel) => (
                                        <li
                                            key={channel.label}
                                            className="grid items-center gap-x-3 border-b py-2.5"
                                            style={{
                                                gridTemplateColumns: `${ICON_PX}px 7rem 1fr`,
                                                borderColor: 'var(--rule)',
                                            }}
                                        >
                                            <span
                                                style={{
                                                    color: 'var(--accent)',
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                {channel.icon}
                                            </span>
                                            <span
                                                className="site-mono"
                                                style={{
                                                    color: 'var(--accent)',
                                                }}
                                            >
                                                {channel.label}
                                            </span>
                                            <span
                                                style={{
                                                    fontFamily:
                                                        'var(--font-mono)',
                                                    fontSize: '0.85rem',
                                                    color: 'var(--ink-soft)',
                                                }}
                                            >
                                                {channel.href ? (
                                                    <a
                                                        href={channel.href}
                                                        className="site-link"
                                                        target={
                                                            channel.href.startsWith(
                                                                'mailto:',
                                                            )
                                                                ? undefined
                                                                : '_blank'
                                                        }
                                                        rel={
                                                            channel.href.startsWith(
                                                                'mailto:',
                                                            )
                                                                ? undefined
                                                                : 'noopener noreferrer'
                                                        }
                                                    >
                                                        {channel.value}
                                                    </a>
                                                ) : (
                                                    channel.value
                                                )}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
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
                                        color: 'var(--ink)',
                                    }}
                                >
                                    contract work, collaborations, or a chat
                                </span>{' '}
                                about something interesting. I read everything,
                                and not usually slow to reply.
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
