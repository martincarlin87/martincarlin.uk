import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

const COMMAND = 'curl martincarlin.uk';
const TYPE_INTERVAL_MS = 28;
const PRE_RESPONSE_DELAY_MS = 200;
const LINE_REVEAL_INTERVAL_MS = 55;

async function fetchCurlOutput(): Promise<string> {
    const response = await fetch('/run-curl', { cache: 'no-store' });

    return response.text();
}

export default function CurlTerminal() {
    const [typedCharCount, setTypedCharCount] = useState(0);
    const [responseLines, setResponseLines] = useState<string[]>([]);
    const [isRunning, setIsRunning] = useState(false);
    const [hasRunBefore, setHasRunBefore] = useState(false);
    const pendingTimeouts = useRef<number[]>([]);
    const panelRef = useRef<HTMLDivElement>(null);

    const clearPendingTimeouts = () => {
        pendingTimeouts.current.forEach((timerId) =>
            window.clearTimeout(timerId),
        );
        pendingTimeouts.current = [];
    };

    const run = () => {
        if (isRunning) {
            return;
        }

        clearPendingTimeouts();
        setIsRunning(true);
        setHasRunBefore(true);
        setTypedCharCount(0);
        setResponseLines([]);

        const prefersReducedMotion =
            typeof window !== 'undefined' &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion) {
            setTypedCharCount(COMMAND.length);
        } else {
            for (let charIndex = 1; charIndex <= COMMAND.length; charIndex++) {
                pendingTimeouts.current.push(
                    window.setTimeout(
                        () => setTypedCharCount(charIndex),
                        charIndex * TYPE_INTERVAL_MS,
                    ),
                );
            }
        }

        const responseStartDelayMs = prefersReducedMotion
            ? 0
            : COMMAND.length * TYPE_INTERVAL_MS + PRE_RESPONSE_DELAY_MS;

        pendingTimeouts.current.push(
            window.setTimeout(async () => {
                let rawOutput: string;

                try {
                    rawOutput = await fetchCurlOutput();
                } catch (error) {
                    const errorMessage =
                        error instanceof Error ? error.message : 'unknown';
                    rawOutput = `curl: failed to execute\n* error: ${errorMessage}\n`;
                }

                const outputLines = rawOutput.replace(/\n$/, '').split('\n');

                if (prefersReducedMotion) {
                    setResponseLines(outputLines);
                    setIsRunning(false);

                    return;
                }

                for (
                    let lineCount = 1;
                    lineCount <= outputLines.length;
                    lineCount++
                ) {
                    pendingTimeouts.current.push(
                        window.setTimeout(
                            () =>
                                setResponseLines(
                                    outputLines.slice(0, lineCount),
                                ),
                            lineCount * LINE_REVEAL_INTERVAL_MS,
                        ),
                    );
                }

                pendingTimeouts.current.push(
                    window.setTimeout(
                        () => setIsRunning(false),
                        outputLines.length * LINE_REVEAL_INTERVAL_MS + 120,
                    ),
                );
            }, responseStartDelayMs),
        );
    };

    useEffect(() => clearPendingTimeouts, []);

    useEffect(() => {
        panelRef.current?.focus({ preventScroll: true });
    }, []);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (isRunning) {
            return;
        }

        if (
            event.key === 'Enter' ||
            (event.key === ' ' && event.target === event.currentTarget)
        ) {
            event.preventDefault();
            run();
        }
    };

    const showCursor = !hasRunBefore || isRunning;
    const displayedCommand = hasRunBefore
        ? COMMAND.slice(0, typedCharCount)
        : COMMAND;

    return (
        <div
            ref={panelRef}
            className="curl-term"
            tabIndex={0}
            role="region"
            aria-label="Interactive terminal — press Enter to run curl"
            aria-live="polite"
            onKeyDown={handleKeyDown}
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
                    disabled={isRunning}
                    className="curl-term-run"
                >
                    {isRunning
                        ? 'running…'
                        : hasRunBefore
                          ? '↻ run again'
                          : '▶ run'}
                </button>
            </div>

            <div className="curl-term-body">
                <div className="curl-term-prompt">
                    <span style={{ color: 'var(--accent)' }}>$</span>{' '}
                    <span style={{ color: 'var(--ink)' }}>
                        {displayedCommand}
                    </span>
                    {showCursor && <span className="site-cursor" aria-hidden />}
                </div>

                <BoxedResponse lines={responseLines} />
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

    const stripAnsiCodes = (line: string) =>
        // eslint-disable-next-line no-control-regex -- ANSI SGR escape codes
        line.replace(/\x1b\[[0-9;]*m/g, '');

    const isBorderCornerLine = (line: string) =>
        // Match both rounded (╭╮╰╯) and square (┌┐└┘) corners — different
        // sources of the bio use different sets.
        /[╭╮╰╯┌┐└┘]/.test(stripAnsiCodes(line));

    const isBoxedResponse = lines.some(isBorderCornerLine);

    if (!isBoxedResponse) {
        return (
            <>
                {lines.map((line, lineIndex) => (
                    <div className="row ansi-line" key={lineIndex}>
                        {stripAnsiCodes(line) === '' ? ' ' : renderAnsi(line)}
                    </div>
                ))}
            </>
        );
    }

    const innerLines = lines
        .filter((line) => !isBorderCornerLine(line))
        .map((line) =>
            line
                .replace(/[│]/g, '')
                // eslint-disable-next-line no-control-regex -- ANSI SGR escape codes
                .replace(/[ \t]+(\x1b\[0m)*$/, '$1'),
        );

    while (innerLines.length && stripAnsiCodes(innerLines[0]).trim() === '') {
        innerLines.shift();
    }

    while (
        innerLines.length &&
        stripAnsiCodes(innerLines[innerLines.length - 1]).trim() === ''
    ) {
        innerLines.pop();
    }

    return (
        <div className="curl-bio-box">
            {innerLines.map((line, lineIndex) => (
                <div className="row ansi-line" key={lineIndex}>
                    {stripAnsiCodes(line).trim() === ''
                        ? ' '
                        : renderAnsi(line)}
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
    const ESCAPE_CHAR = '\x1b';
    const renderedSpans: ReactNode[] = [];
    let pendingText = '';
    let isBold = false;
    let isDim = false;
    let activeColor: 'green' | 'cyan' | null = null;
    let nextSpanKey = 0;

    const flushPendingText = () => {
        if (!pendingText) {
            return;
        }

        const classes: string[] = [];

        if (isBold) {
            classes.push('ansi-bold');
        }

        if (isDim) {
            classes.push('ansi-dim');
        }

        if (activeColor) {
            classes.push(`ansi-${activeColor}`);
        }

        renderedSpans.push(
            <span
                key={nextSpanKey++}
                className={classes.join(' ') || undefined}
            >
                {pendingText}
            </span>,
        );
        pendingText = '';
    };

    for (let charIndex = 0; charIndex < text.length; charIndex++) {
        if (text[charIndex] === ESCAPE_CHAR && text[charIndex + 1] === '[') {
            const sequenceEndIndex = text.indexOf('m', charIndex + 2);

            if (sequenceEndIndex === -1) {
                pendingText += text[charIndex];
                continue;
            }

            flushPendingText();
            const codes = text
                .slice(charIndex + 2, sequenceEndIndex)
                .split(';')
                .map((code) => code.trim())
                .filter(Boolean);
            const codesToApply = codes.length ? codes : ['0'];

            for (const code of codesToApply) {
                if (code === '0') {
                    isBold = false;
                    isDim = false;
                    activeColor = null;
                } else if (code === '1') {
                    isBold = true;
                } else if (code === '2') {
                    isDim = true;
                } else if (code === '22') {
                    isBold = false;
                    isDim = false;
                } else if (code === '32') {
                    activeColor = 'green';
                } else if (code === '36') {
                    activeColor = 'cyan';
                } else if (code === '39') {
                    activeColor = null;
                }
            }

            charIndex = sequenceEndIndex;
        } else {
            pendingText += text[charIndex];
        }
    }

    flushPendingText();

    return renderedSpans;
}
