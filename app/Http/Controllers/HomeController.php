<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class HomeController extends Controller
{
    public function __invoke(Request $request): Response|InertiaResponse
    {
        if ($this->isTerminalClient($request)) {
            return response($this->bio(), 200, [
                'Content-Type' => 'text/plain; charset=utf-8',
                'Cache-Control' => 'no-store',
                'Server' => 'martin-carlin/v1',
            ]);
        }

        return Inertia::render('home');
    }

    private function isTerminalClient(Request $request): bool
    {
        $ua = (string) $request->header('User-Agent', '');

        return (bool) preg_match('/\b(curl|wget|httpie|fetch|powershell)\b/i', $ua);
    }

    /**
     * ANSI-coloured bio. SGR codes:
     *   \e[32m green · \e[36m cyan · \e[2m dim · \e[1m bold · \e[0m reset
     */
    private function bio(): string
    {
        $g = "\e[32m";
        $c = "\e[36m";
        $d = "\e[2m";
        $b = "\e[1m";
        $r = "\e[0m";

        $width = 62;
        $top = $g . '╭' . str_repeat('─', $width) . '╮' . $r;
        $bot = $g . '╰' . str_repeat('─', $width) . '╯' . $r;

        $rows = [];
        $rows[] = $top;
        $rows[] = $this->boxLine('', $width, $g, $r);
        $rows[] = $this->boxLine("      {$g}{$b}Martin Carlin{$r}", $width, $g, $r);
        $rows[] = $this->boxLine('      Software Engineer based in 🏴󠁧󠁢󠁳󠁣󠁴󠁿', $width, $g, $r);
        $rows[] = $this->boxLine('', $width, $g, $r);
        $rows[] = $this->boxLine($this->linkRow('Twitter', 'https://twitter.com/', 'martincarlin87', '', $g, $c, $d, $r), $width, $g, $r);
        $rows[] = $this->boxLine($this->linkRow('LinkedIn', 'https://linkedin.com/in/', 'martincarlin87', '', $g, $c, $d, $r), $width, $g, $r);
        $rows[] = $this->boxLine($this->linkRow('Github', 'https://github.com/', 'martincarlin87', '', $g, $c, $d, $r), $width, $g, $r);
        $rows[] = $this->boxLine($this->linkRow('SO', 'https://stackoverflow.com/users/634120/', 'martincarlin87', '', $g, $c, $d, $r), $width, $g, $r);
        $rows[] = $this->boxLine('', $width, $g, $r);
        $rows[] = $this->boxLine($this->linkRow('Website', 'https://', 'martincarlin', '.uk', $g, $c, $d, $r), $width, $g, $r);
        $rows[] = $this->boxLine('', $width, $g, $r);
        $rows[] = $bot;

        return implode("\n", $rows) . "\n";
    }

    private function boxLine(string $content, int $width, string $g, string $r): string
    {
        $stripped = preg_replace('/\e\[[0-9;]*m/', '', $content) ?? '';
        $visible = mb_strwidth($stripped, 'UTF-8');
        $pad = max(0, $width - $visible);

        return "{$g}│{$r}{$content}" . str_repeat(' ', $pad) . "{$g}│{$r}";
    }

    private function linkRow(string $label, string $prefix, string $handle, string $suffix, string $g, string $c, string $d, string $r): string
    {
        $padded = str_pad($label, 10, ' ');

        return "  {$g}{$padded}{$r}  {$d}{$prefix}{$r}{$c}{$handle}{$r}{$d}{$suffix}{$r}";
    }
}
