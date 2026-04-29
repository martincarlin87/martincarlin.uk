<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\ContactRequest;
use App\Services\Smtp2goClient;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class ContactController extends Controller
{
    public function show(): Response
    {
        return Inertia::render('contact');
    }

    public function store(ContactRequest $request, Smtp2goClient $mailer): RedirectResponse
    {
        try {
            $mailer->sendContactMessage(
                fromName: $request->string('name')->toString(),
                fromEmail: $request->string('email')->toString(),
                message: $request->string('message')->toString(),
            );

            Inertia::flash('toast', [
                'type' => 'success',
                'message' => 'Thanks — your message has been sent.',
            ]);
        } catch (Throwable $error) {
            Log::error('Contact form send failed', [
                'error' => $error->getMessage(),
                'submission' => $request->validated(),
            ]);

            Inertia::flash('toast', [
                'type' => 'error',
                'message' => 'Sorry, something went wrong sending your message. Please email me directly at martin@martincarlin.uk.',
            ]);
        }

        return to_route('contact');
    }
}
