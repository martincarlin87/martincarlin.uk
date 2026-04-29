import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

const COMMAND = 'curl martincarlin.uk';
const TYPE_MS = 28;
const PRE_RESPONSE_MS = 200;
const LINE_MS = 55;

async function runCurl(): Promise<string> {
    const r = await fetch('/run-curl', { cache: 'no-store' });

    return r.text();
}

export default function CurlTerminal() {
    const [typed, setTyped] = useState(0);
    const [lines, setLines] = useState<string[]>([]);
    const [running, setRunning] = useState(false);
    const [hasRun, setHasRun] = useState(false);
    const timers = useRef<number[]>([]);
    const panelRef = useRef<HTMLDivElement>(null);

    const clear = () => {
        timers.current.forEach((id) => window.clearTimeout(id));
        timers.current = [];
    };

    const run = () => {
        if (running) {
            return;
        }

        clear();
        setRunning(true);
        setHasRun(true);
        setTyped(0);
        setLines([]);

        const reduced =
            typeof window !== 'undefined' &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (reduced) {
            setTyped(COMMAND.length);
        } else {
            for (let i = 1; i <= COMMAND.length; i++) {
                timers.current.push(
                    window.setTimeout(() => setTyped(i), i * TYPE_MS),
                );
            }
        }

        const startResponseAt = reduced
            ? 0
            : COMMAND.length * TYPE_MS + PRE_RESPONSE_MS;

        timers.current.push(
            window.setTimeout(async () => {
                let raw: string;

                try {
                    raw = await runCurl();
                } catch (err) {
                    const msg = err instanceof Error ? err.message : 'unknown';
                    raw = `curl: failed to execute\n* error: ${msg}\n`;
                }

                const responseLines = raw.replace(/\n$/, '').split('\n');

                if (reduced) {
                    setLines(responseLines);
                    setRunning(false);

                    return;
                }

                for (let i = 1; i <= responseLines.length; i++) {
                    timers.current.push(
                        window.setTimeout(
                            () => setLines(responseLines.slice(0, i)),
                            i * LINE_MS,
                        ),
                    );
                }

                timers.current.push(
                    window.setTimeout(
                        () => setRunning(false),
                        responseLines.length * LINE_MS + 120,
                    ),
                );
            }, startResponseAt),
        );
    };

    useEffect(() => clear, []);

    useEffect(() => {
        panelRef.current?.focus({ preventScroll: true });
    }, []);

    const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (running) {
            return;
        }

        if (
            e.key === 'Enter' ||
            (e.key === ' ' && e.target === e.currentTarget)
        ) {
            e.preventDefault();
            run();
        }
    };

    const showCursor = !hasRun || running;
    const typedCmd = hasRun ? COMMAND.slice(0, typed) : COMMAND;

    return (
        <div
            ref={panelRef}
            className="curl-term"
            tabIndex={0}
            role="region"
            aria-label="Interactive terminal — press Enter to run curl"
            aria-live="polite"
            onKeyDown={onKeyDown}
        >
            <div className="curl-term-bar">
                <span
                    className="curl-term-dot"
                    style={{
                        background: 'var(--accent-2)',
                        boxShadow: '0 0 6px var(--accent-2-soft)',
                    }}
                    aria-hidden
                />
                <span
                    className="curl-term-dot"
                    style={{
                        background: 'var(--accent)',
                        boxShadow: '0 0 6px var(--accent-soft)',
                    }}
                    aria-hidden
                />
                <span
                    className="curl-term-dot"
                    style={{ background: 'var(--dim)' }}
                    aria-hidden
                />
                <span className="curl-term-title">
                    martin@carlin: ~{' '}
                    <span style={{ opacity: 0.5 }}>· press</span>{' '}
                    <kbd className="curl-term-kbd">enter</kbd>{' '}
                    <span style={{ opacity: 0.5 }}>to run</span>
                </span>
                <button
                    type="button"
                    onClick={run}
                    disabled={running}
                    className="curl-term-run"
                >
                    {running ? 'running…' : hasRun ? '↻ run again' : '▶ run'}
                </button>
            </div>

            <div className="curl-term-body">
                <div className="curl-term-prompt">
                    <span style={{ color: 'var(--accent)' }}>$</span>{' '}
                    <span style={{ color: 'var(--ink)' }}>{typedCmd}</span>
                    {showCursor && <span className="site-cursor" aria-hidden />}
                </div>

                <BoxedResponse lines={lines} />
            </div>
        </div>
    );
}

/**
 * The server emits a full ASCII-boxed bio so a real `curl` from a terminal
 * shows the complete border. In the browser, character widths drift (flag
 * emoji, box-drawing chars) so the ASCII box can't align — we strip the box
 * chars and render the content inside a CSS-bordered container instead.
 */
function BoxedResponse({ lines }: { lines: string[] }) {
    if (lines.length === 0) {
        return null;
    }

    // eslint-disable-next-line no-control-regex -- ANSI SGR escape codes
    const stripCodes = (line: string) => line.replace(/\x1b\[[0-9;]*m/g, '');

    const isCorner = (line: string) => /[╭╮╰╯]/.test(stripCodes(line));
    const isBoxResponse = lines.some(isCorner);

    if (!isBoxResponse) {
        return (
            <>
                {lines.map((line, idx) => (
                    <div className="row ansi-line" key={idx}>
                        {stripCodes(line) === '' ? ' ' : renderAnsi(line)}
                    </div>
                ))}
            </>
        );
    }

    const stripped = lines
        .filter((line) => !isCorner(line))
        .map((line) =>
            // eslint-disable-next-line no-control-regex -- ANSI SGR escape codes
            line.replace(/[│]/g, '').replace(/[ \t]+(\x1b\[0m)*$/, '$1'),
        );

    while (stripped.length && stripCodes(stripped[0]).trim() === '') {
        stripped.shift();
    }

    while (
        stripped.length &&
        stripCodes(stripped[stripped.length - 1]).trim() === ''
    ) {
        stripped.pop();
    }

    return (
        <div className="curl-bio-box">
            {stripped.map((line, idx) => (
                <div className="row ansi-line" key={idx}>
                    {stripCodes(line).trim() === '' ? ' ' : renderAnsi(line)}
                </div>
            ))}
        </div>
    );
}

/**
 * Minimal ANSI SGR parser. Handles the codes we emit from HomeController:
 *   0 reset · 1 bold · 2 dim · 32 green · 36 cyan
 */
function renderAnsi(text: string): ReactNode[] {
    const ESC = '\x1b';
    const out: ReactNode[] = [];
    let buf = '';
    let bold = false;
    let dim = false;
    let color: 'green' | 'cyan' | null = null;
    let key = 0;

    const flush = () => {
        if (!buf) {
            return;
        }

        const classes: string[] = [];

        if (bold) {
            classes.push('ansi-bold');
        }

        if (dim) {
            classes.push('ansi-dim');
        }

        if (color) {
            classes.push(`ansi-${color}`);
        }

        out.push(
            <span key={key++} className={classes.join(' ') || undefined}>
                {buf}
            </span>,
        );
        buf = '';
    };

    for (let i = 0; i < text.length; i++) {
        if (text[i] === ESC && text[i + 1] === '[') {
            const end = text.indexOf('m', i + 2);

            if (end === -1) {
                buf += text[i];
                continue;
            }

            flush();
            const codes = text
                .slice(i + 2, end)
                .split(';')
                .map((s) => s.trim())
                .filter(Boolean);
            const apply = codes.length ? codes : ['0'];

            for (const c of apply) {
                if (c === '0') {
                    bold = false;
                    dim = false;
                    color = null;
                } else if (c === '1') {
                    bold = true;
                } else if (c === '2') {
                    dim = true;
                } else if (c === '22') {
                    bold = false;
                    dim = false;
                } else if (c === '32') {
                    color = 'green';
                } else if (c === '36') {
                    color = 'cyan';
                } else if (c === '39') {
                    color = null;
                }
            }

            i = end;
        } else {
            buf += text[i];
        }
    }

    flush();

    return out;
}
