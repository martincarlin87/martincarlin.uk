<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\ContactRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    public function show(): Response
    {
        return Inertia::render('contact');
    }

    public function store(ContactRequest $request): RedirectResponse
    {
        Log::info('Contact form submission', $request->validated());

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => 'Thanks — your message has been sent.',
        ]);

        return to_route('contact');
    }
}
