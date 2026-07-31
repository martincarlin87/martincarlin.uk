const GREEN = '\x1b[32m';
const CYAN = '\x1b[36m';
const DIM = '\x1b[2m';
const BOLD = '\x1b[1m';
const RESET = '\x1b[0m';

const BOX_WIDTH = 62;

const SCOTLAND_FLAG = '🏴\u{E0067}\u{E0062}\u{E0073}\u{E0063}\u{E0074}\u{E007F}';

/**
 * ANSI-coloured bio served to terminal clients (curl, wget, …).
 * Ported from the Laravel HomeController.
 */
export function buildBio(): string {
    const rows: string[] = [];

    rows.push(GREEN + '╭' + '─'.repeat(BOX_WIDTH) + '╮' + RESET);
    rows.push(boxLine(''));
    rows.push(boxLine(`      ${GREEN}${BOLD}Martin Carlin${RESET}`));
    rows.push(boxLine(`      Software Engineer based in ${SCOTLAND_FLAG}`));
    rows.push(boxLine(''));
    rows.push(boxLine(linkRow('Twitter', 'https://twitter.com/', 'martincarlin87', '')));
    rows.push(boxLine(linkRow('LinkedIn', 'https://linkedin.com/in/', 'martincarlin87', '')));
    rows.push(boxLine(linkRow('Github', 'https://github.com/', 'martincarlin87', '')));
    rows.push(boxLine(linkRow('SO', 'https://stackoverflow.com/u/', '634120', '')));
    rows.push(boxLine(''));
    rows.push(boxLine(linkRow('Website', 'https://', 'martincarlin', '.uk')));
    rows.push(boxLine(''));
    rows.push(GREEN + '╰' + '─'.repeat(BOX_WIDTH) + '╯' + RESET);

    return rows.join('\n') + '\n';
}

function boxLine(content: string): string {
    const strippedContent = content.replace(/\x1b\[[0-9;]*m/g, '');
    const paddingLength = Math.max(0, BOX_WIDTH - visibleWidth(strippedContent));

    return `${GREEN}│${RESET}${content}` + ' '.repeat(paddingLength) + `${GREEN}│${RESET}`;
}

function linkRow(label: string, urlPrefix: string, handle: string, urlSuffix: string): string {
    const paddedLabel = label.padEnd(10, ' ');

    return `  ${GREEN}${paddedLabel}${RESET}  ${DIM}${urlPrefix}${RESET}${CYAN}${handle}${RESET}${DIM}${urlSuffix}${RESET}`;
}

/**
 * Terminal column width for the characters we emit: ASCII counts 1,
 * the waving-flag base (U+1F3F4) counts 2 and the emoji tag characters
 * (U+E0020–U+E007F) count 0 — terminals render the whole Scotland flag
 * sequence as one 2-column glyph.
 */
function visibleWidth(text: string): number {
    let width = 0;

    for (const character of text) {
        const codePoint = character.codePointAt(0) ?? 0;

        if (codePoint >= 0xe0020 && codePoint <= 0xe007f) {
            continue;
        }

        width += codePoint === 0x1f3f4 ? 2 : 1;
    }

    return width;
}
