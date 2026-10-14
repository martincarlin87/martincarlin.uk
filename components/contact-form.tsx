'use client';

import { useActionState } from 'react';
import type { ContactFormState } from '@/app/contact/actions';
import { submitContact } from '@/app/contact/actions';
import Turnstile from '@/components/turnstile';

const INITIAL_STATE: ContactFormState = { status: 'idle' };

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export default function ContactForm() {
    const [state, formAction, isPending] = useActionState(
        submitContact,
        INITIAL_STATE,
    );

    return (
        <form action={formAction} className="space-y-8">
            <Field
                label="name"
                name="name"
                autoComplete="name"
                error={state.errors?.name}
            />
            <Field
                label="email"
                name="email"
                type="email"
                autoComplete="email"
                error={state.errors?.email}
            />
            <div>
                <PromptLabel label="message" htmlFor="message" />
                <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    className="site-field"
                    placeholder="// what's on your mind?"
                />
                {state.errors?.message && (
                    <p
                        className="site-mono mt-2"
                        style={{ color: 'var(--accent-2)' }}
                    >
                        err: {state.errors.message}
                    </p>
                )}
            </div>

            {/* Honeypot: hidden from people, irresistible to bots. */}
            <div
                aria-hidden
                style={{
                    position: 'absolute',
                    left: '-10000px',
                    width: 1,
                    height: 1,
                    overflow: 'hidden',
                }}
            >
                <label htmlFor="website">website</label>
                <input
                    id="website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                />
            </div>

            {TURNSTILE_SITE_KEY && (
                <Turnstile siteKey={TURNSTILE_SITE_KEY} resetSignal={state} />
            )}

            <div className="flex flex-wrap items-center gap-6 pt-3">
                <button
                    type="submit"
                    disabled={isPending}
                    className="site-button"
                >
                    {isPending ? 'sending…' : 'send'}
                </button>
                <span className="site-mono" style={{ color: 'var(--dim)' }}>
                    avg. reply &lt; 48h
                </span>
            </div>

            {!isPending && state.status === 'success' && state.message && (
                <p
                    className="site-mono"
                    role="status"
                    style={{ color: 'var(--accent)' }}
                >
                    ok: {state.message}
                </p>
            )}
            {!isPending && state.status === 'error' && state.message && (
                <p
                    className="site-mono"
                    role="alert"
                    style={{ color: 'var(--accent-2)' }}
                >
                    err: {state.message}
                </p>
            )}
        </form>
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
