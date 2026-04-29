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
        $userAgent = (string) $request->header('User-Agent', '');

        return (bool) preg_match('/\b(curl|wget|httpie|fetch|powershell)\b/i', $userAgent);
    }

    /**
     * ANSI-coloured bio. SGR codes:
     *   \e[32m green · \e[36m cyan · \e[2m dim · \e[1m bold · \e[0m reset
     */
    private function bio(): string
    {
        $green = "\e[32m";
        $cyan = "\e[36m";
        $dim = "\e[2m";
        $bold = "\e[1m";
        $reset = "\e[0m";

        $boxWidth = 62;
        $topBorder = $green . '╭' . str_repeat('─', $boxWidth) . '╮' . $reset;
        $bottomBorder = $green . '╰' . str_repeat('─', $boxWidth) . '╯' . $reset;

        $rows = [];
        $rows[] = $topBorder;
        $rows[] = $this->boxLine('', $boxWidth, $green, $reset);
        $rows[] = $this->boxLine("      {$green}{$bold}Martin Carlin{$reset}", $boxWidth, $green, $reset);
        $rows[] = $this->boxLine('      Software Engineer based in 🏴󠁧󠁢󠁳󠁣󠁴󠁿', $boxWidth, $green, $reset);
        $rows[] = $this->boxLine('', $boxWidth, $green, $reset);
        $rows[] = $this->boxLine($this->linkRow('Twitter', 'https://twitter.com/', 'martincarlin87', '', $green, $cyan, $dim, $reset), $boxWidth, $green, $reset);
        $rows[] = $this->boxLine($this->linkRow('LinkedIn', 'https://linkedin.com/in/', 'martincarlin87', '', $green, $cyan, $dim, $reset), $boxWidth, $green, $reset);
        $rows[] = $this->boxLine($this->linkRow('Github', 'https://github.com/', 'martincarlin87', '', $green, $cyan, $dim, $reset), $boxWidth, $green, $reset);
        $rows[] = $this->boxLine($this->linkRow('SO', 'https://stackoverflow.com/users/634120/', 'martincarlin87', '', $green, $cyan, $dim, $reset), $boxWidth, $green, $reset);
        $rows[] = $this->boxLine('', $boxWidth, $green, $reset);
        $rows[] = $this->boxLine($this->linkRow('Website', 'https://', 'martincarlin', '.uk', $green, $cyan, $dim, $reset), $boxWidth, $green, $reset);
        $rows[] = $this->boxLine('', $boxWidth, $green, $reset);
        $rows[] = $bottomBorder;

        return implode("\n", $rows) . "\n";
    }

    private function boxLine(string $content, int $boxWidth, string $green, string $reset): string
    {
        $strippedContent = preg_replace('/\e\[[0-9;]*m/', '', $content) ?? '';
        $visibleWidth = mb_strwidth($strippedContent, 'UTF-8');
        $paddingLength = max(0, $boxWidth - $visibleWidth);

        return "{$green}│{$reset}{$content}" . str_repeat(' ', $paddingLength) . "{$green}│{$reset}";
    }

    private function linkRow(string $label, string $urlPrefix, string $handle, string $urlSuffix, string $green, string $cyan, string $dim, string $reset): string
    {
        $paddedLabel = str_pad($label, 10, ' ');

        return "  {$green}{$paddedLabel}{$reset}  {$dim}{$urlPrefix}{$reset}{$cyan}{$handle}{$reset}{$dim}{$urlSuffix}{$reset}";
    }
}
