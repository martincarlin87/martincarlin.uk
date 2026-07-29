# martincarlin.uk

Personal site, built with Next.js and React, deployed on [Vercel](https://vercel.com).

```sh
curl martincarlin.uk
```

Terminal clients get an ANSI-coloured bio; browsers get the site.

## Local development

```sh
npm install
npm run dev
```

## Environment

| Variable               | Purpose                                                    |
| ---------------------- | ---------------------------------------------------------- |
| `SMTP2GO_API_KEY`      | Contact form email sending (logs-only fallback when unset) |
| `CONTACT_FROM_ADDRESS` | Sender address (default `noreply@martincarlin.uk`)         |
| `CONTACT_TO_ADDRESS`   | Recipient address (default `martin@martincarlin.uk`)       |

## Deployment

Deployed to the `martincarlin-uk` project on Vercel:

```sh
npx vercel --prod
```
