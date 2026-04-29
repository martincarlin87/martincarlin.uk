<?php

declare(strict_types=1);

use Illuminate\Http\Client\Request;
use Illuminate\Support\Facades\Http;

beforeEach(function () {
    config()->set('services.smtp2go.api_key', 'test-key');
    config()->set('services.smtp2go.sender', 'noreply@martincarlin.uk');
    config()->set('services.smtp2go.recipient', 'martin@martincarlin.uk');
});

test('contact submission validates required fields', function () {
    $this->post(route('contact.store'), [])
        ->assertSessionHasErrors(['name', 'email', 'message']);
});

test('contact submission sends email via SMTP2GO and redirects back', function () {
    Http::fake([
        'api.smtp2go.com/*' => Http::response([
            'request_id' => 'req-abc',
            'data' => [
                'succeeded' => 1,
                'failed' => 0,
                'failures' => [],
                'email_id' => 'em-xyz',
            ],
        ], 200),
    ]);

    $this->post(route('contact.store'), [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'message' => 'Hello there, this is a test message.',
    ])
        ->assertRedirect(route('contact'))
        ->assertSessionHasNoErrors();

    Http::assertSent(function (Request $request) {
        $payload = $request->data();
        $subject = data_get($payload, 'subject');
        $body = data_get($payload, 'text_body');

        return $request->url() === 'https://api.smtp2go.com/v3/email/send'
            && $request->hasHeader('X-Smtp2go-Api-Key', 'test-key')
            && data_get($payload, 'sender') === 'noreply@martincarlin.uk'
            && in_array('martin@martincarlin.uk', (array) data_get($payload, 'to'), true)
            && is_string($subject)
            && str_contains($subject, 'Test User')
            && is_string($body)
            && str_contains($body, 'this is a test message');
    });
});

test('contact submission still succeeds if SMTP2GO key is not configured', function () {
    config()->set('services.smtp2go.api_key', null);
    Http::fake();

    $this->post(route('contact.store'), [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'message' => 'Hello there, this is a test message.',
    ])
        ->assertRedirect(route('contact'))
        ->assertSessionHasNoErrors();

    Http::assertNothingSent();
});

test('register route is disabled', function () {
    $this->get('/register')->assertNotFound();
});
