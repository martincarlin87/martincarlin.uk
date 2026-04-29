<?php

declare(strict_types=1);

use App\Http\Controllers\ContactController;
use App\Http\Controllers\CurlController;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;

Route::get('/', HomeController::class)->name('home');
Route::inertia('/about', 'about')->name('about');

Route::get('/contact', [ContactController::class, 'show'])->name('contact');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');

Route::get('/run-curl', CurlController::class)->name('run-curl');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__ . '/settings.php';
