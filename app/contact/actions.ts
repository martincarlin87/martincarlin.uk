'use server';

const SMTP2GO_ENDPOINT = 'https://api.smtp2go.com/v3/email/send';

export type ContactFormState = {
    status: 'idle' | 'success' | 'error';
    message?: string;
    errors?: Partial<Record<'name' | 'email' | 'message', string>>;
};

const ERROR_MESSAGE =
    'Sorry, something went wrong sending your message. Please email me directly at martin@martincarlin.uk.';

export async function submitContact(
    _previousState: ContactFormState,
    formData: FormData,
): Promise<ContactFormState> {
    const name = String(formData.get('name') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim();
    const message = String(formData.get('message') ?? '').trim();

    const errors: ContactFormState['errors'] = {};

    if (!name) {
        errors.name = 'The name field is required.';
    } else if (name.length > 255) {
        errors.name = 'The name field must not be greater than 255 characters.';
    }

    if (!email) {
        errors.email = 'The email field is required.';
    } else if (email.length > 255 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = 'The email field must be a valid email address.';
    }

    if (!message) {
        errors.message = 'The message field is required.';
    } else if (message.length < 10) {
        errors.message = 'The message field must be at least 10 characters.';
    } else if (message.length > 5000) {
        errors.message =
            'The message field must not be greater than 5000 characters.';
    }

    if (Object.keys(errors).length > 0) {
        return { status: 'error', errors };
    }

    try {
        await sendContactMessage(name, email, message);

        return {
            status: 'success',
            message: 'Thanks — your message has been sent.',
        };
    } catch (error) {
        console.error('Contact form send failed', {
            error: error instanceof Error ? error.message : String(error),
            submission: { name, email },
        });

        return { status: 'error', message: ERROR_MESSAGE };
    }
}

/**
 * Send a contact form submission via the SMTP2GO transactional API.
 *
 * If no API key is configured (e.g. local dev), the submission is logged
 * instead of sent so the form still works without external setup.
 */
async function sendContactMessage(
    fromName: string,
    fromEmail: string,
    message: string,
): Promise<void> {
    const apiKey = process.env.SMTP2GO_API_KEY;
    const sender = process.env.CONTACT_FROM_ADDRESS ?? 'noreply@martincarlin.uk';
    const recipient = process.env.CONTACT_TO_ADDRESS ?? 'martin@martincarlin.uk';

    if (!apiKey) {
        console.info('Contact form (no SMTP2GO key — logged only)', {
            from: `${fromName} <${fromEmail}>`,
            message,
        });

        return;
    }

    const response = await fetch(SMTP2GO_ENDPOINT, {
        method: 'POST',
        headers: {
            'X-Smtp2go-Api-Key': apiKey,
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        signal: AbortSignal.timeout(10_000),
        body: JSON.stringify({
            sender,
            to: [recipient],
            subject: `Contact form: ${fromName}`,
            text_body: [
                'New contact form submission via martincarlin.uk',
                '',
                `From:    ${fromName} <${fromEmail}>`,
                '',
                'Message:',
                '',
                message,
            ].join('\n'),
            custom_headers: [
                {
                    header: 'Reply-To',
                    value: `${fromName} <${fromEmail}>`,
                },
            ],
        }),
    });

    const body = (await response.json().catch(() => null)) as {
        data?: { failed?: number };
    } | null;
    const failedCount = Number(body?.data?.failed ?? 0);

    if (!response.ok || failedCount > 0) {
        console.warn('SMTP2GO send failed', {
            status: response.status,
            body,
        });

        throw new Error('SMTP2GO API rejected the contact form submission.');
    }
}
