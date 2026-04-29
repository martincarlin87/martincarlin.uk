<?php

declare(strict_types=1);

test('contact submission validates required fields', function () {
    $this->post(route('contact.store'), [])
        ->assertSessionHasErrors(['name', 'email', 'message']);
});

test('contact submission redirects back on success', function () {
    $this->post(route('contact.store'), [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'message' => 'Hello there, this is a test message.',
    ])->assertRedirect(route('contact'))
        ->assertSessionHasNoErrors();
});

test('register route is disabled', function () {
    $this->get('/register')->assertNotFound();
});
