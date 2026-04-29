<?php

declare(strict_types=1);

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use RuntimeException;

class Smtp2goClient
{
    private const ENDPOINT = 'https://api.smtp2go.com/v3/email/send';

    public function __construct(
        private readonly ?string $apiKey,
        private readonly string $sender,
        private readonly string $recipient,
    ) {}

    /**
     * Send a contact form submission as a transactional email.
     *
     * If no API key is configured (e.g. local dev), the submission is logged
     * instead of sent so the form still works without external setup.
     */
    public function sendContactMessage(string $fromName, string $fromEmail, string $message): void
    {
        if (empty($this->apiKey)) {
            Log::info('Contact form (no SMTP2GO key — logged only)', [
                'from' => "{$fromName} <{$fromEmail}>",
                'message' => $message,
            ]);

            return;
        }

        $response = Http::withHeaders([
            'X-Smtp2go-Api-Key' => $this->apiKey,
            'Accept' => 'application/json',
        ])
            ->timeout(10)
            ->post(self::ENDPOINT, [
                'sender' => $this->sender,
                'to' => [$this->recipient],
                'subject' => "Contact form: {$fromName}",
                'text_body' => $this->renderBody($fromName, $fromEmail, $message),
                'custom_headers' => [
                    [
                        'header' => 'Reply-To',
                        'value' => "{$fromName} <{$fromEmail}>",
                    ],
                ],
            ]);

        $failedRaw = $response->json('data.failed');
        $failedCount = is_numeric($failedRaw) ? (int) $failedRaw : 0;

        if ($response->failed() || $failedCount > 0) {
            Log::warning('SMTP2GO send failed', [
                'status' => $response->status(),
                'body' => $response->json(),
            ]);

            throw new RuntimeException('SMTP2GO API rejected the contact form submission.');
        }
    }

    private function renderBody(string $name, string $email, string $message): string
    {
        return <<<TXT
            New contact form submission via martincarlin.uk

            From:    {$name} <{$email}>

            Message:

            {$message}
            TXT;
    }
}
