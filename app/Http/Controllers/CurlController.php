<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Process;

class CurlController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $url = $request->getSchemeAndHttpHost() . '/';

        $result = Process::timeout(10)->run([
            'curl', '-sS', '--max-time', '8', '-A', 'curl/8.0 (martincarlin-terminal)', $url,
        ]);

        $output = $result->successful()
            ? $result->output()
            : sprintf("curl: (%d) failed\n%s", $result->exitCode() ?? -1, trim($result->errorOutput()));

        return response($output, 200, [
            'Content-Type' => 'text/plain; charset=utf-8',
            'Cache-Control' => 'no-store',
        ]);
    }
}
