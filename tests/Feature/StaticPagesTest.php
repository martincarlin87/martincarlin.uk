<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Process;

test('home page loads in browser', function () {
    $this->withHeader('User-Agent', 'Mozilla/5.0')
        ->get(route('home'))
        ->assertOk();
});

test('home page returns ansi bio for curl user agent', function () {
    $response = $this->withHeader('User-Agent', 'curl/8.0')
        ->get(route('home'));

    $response->assertOk()
        ->assertHeader('Content-Type', 'text/plain; charset=utf-8');

    expect($response->getContent())
        ->toContain('Martin Carlin')
        ->toContain('Software Engineer')
        ->toContain('martincarlin87')
        ->toContain("\e[32m");
});

test('about page loads', function () {
    $this->get(route('about'))->assertOk();
});

test('contact page loads', function () {
    $this->get(route('contact'))->assertOk();
});

test('run-curl endpoint shells out to the curl binary', function () {
    Process::fake(fn () => Process::result(output: "MOCKED CURL OUTPUT\n"));

    $response = $this->get(route('run-curl'));

    $response->assertOk()
        ->assertHeader('Content-Type', 'text/plain; charset=utf-8')
        ->assertSeeText('MOCKED CURL OUTPUT');

    Process::assertRan(function ($process) {
        $command = $process->command;

        return is_array($command) && $command[0] === 'curl';
    });
});
