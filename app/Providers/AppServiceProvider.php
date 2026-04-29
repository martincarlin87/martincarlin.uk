<?php

declare(strict_types=1);

namespace App\Providers;

use App\Services\Smtp2goClient;
use Carbon\CarbonImmutable;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\Rules\Password;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton(Smtp2goClient::class, function () {
            $apiKey = config('services.smtp2go.api_key');
            $sender = config('services.smtp2go.sender');
            $recipient = config('services.smtp2go.recipient');

            return new Smtp2goClient(
                apiKey: is_string($apiKey) && $apiKey !== '' ? $apiKey : null,
                sender: is_string($sender) ? $sender : 'noreply@martincarlin.uk',
                recipient: is_string($recipient) ? $recipient : 'martin@martincarlin.uk',
            );
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->configureDefaults();
    }

    /**
     * Configure default behaviors for production-ready applications.
     */
    protected function configureDefaults(): void
    {
        Date::use(CarbonImmutable::class);

        DB::prohibitDestructiveCommands(
            app()->isProduction(),
        );

        Password::defaults(fn (): ?Password => app()->isProduction()
            ? Password::min(12)
                ->mixedCase()
                ->letters()
                ->numbers()
                ->symbols()
                ->uncompromised()
            : null,
        );
    }
}
