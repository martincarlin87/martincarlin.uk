# martincarlin.uk

[![tests](https://github.com/martincarlin87/martincarlin.uk/actions/workflows/tests.yml/badge.svg?branch=main)](https://github.com/martincarlin87/martincarlin.uk/actions/workflows/tests.yml)
[![lint](https://github.com/martincarlin87/martincarlin.uk/actions/workflows/lint.yml/badge.svg?branch=main)](https://github.com/martincarlin87/martincarlin.uk/actions/workflows/lint.yml)
[![static-analysis](https://github.com/martincarlin87/martincarlin.uk/actions/workflows/static-analysis.yml/badge.svg?branch=main)](https://github.com/martincarlin87/martincarlin.uk/actions/workflows/static-analysis.yml)
[![lighthouse](https://github.com/martincarlin87/martincarlin.uk/actions/workflows/lighthouse.yml/badge.svg?branch=main)](https://github.com/martincarlin87/martincarlin.uk/actions/workflows/lighthouse.yml)
[![deploy](https://github.com/martincarlin87/martincarlin.uk/actions/workflows/deploy.yml/badge.svg?branch=main)](https://github.com/martincarlin87/martincarlin.uk/actions/workflows/deploy.yml)

Personal site, built on Laravel 13, Inertia, and React.

## Local development

```sh
composer setup     # install deps, copy .env, generate key, run migrations, build
composer dev       # serve, queue, pail, vite — all in one
```

## Quality gates

```sh
composer lint:check     # Pint
composer stan           # PHPStan (Larastan, level 5) — must be zero errors
npm run lint:check      # ESLint
npm run format:check    # Prettier
npm run types:check     # tsc --noEmit
php artisan test        # Pest
```

CI runs all of the above on every push to `main` and every pull request.
