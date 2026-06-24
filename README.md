# i-Tech Academy — AI Customization & Prompting Hub

A production-ready React web app for corporate training attendees to navigate AI prompt frameworks, fill in interactive templates, and send prompts directly to ChatGPT or Claude.

## Features

- **21 fillable prompt templates** across 6 frameworks
- **Inline field expansion** — every `[bracket]` is a live input
- **Send to ChatGPT or Claude** — one-click with prompt pre-loaded
- **Favorites** — heart any prompt, saved to localStorage
- **History** — last 10 prompts used, with copy-again
- **Shareable links** — deep-link to any prompt card
- **Global search** — filter across all sections
- **Responsive** — desktop sidebar + mobile bottom tabs
- **Framer Motion** animations throughout

## Tech Stack

- React 18 + Vite
- React Router v6
- Tailwind CSS v4
- Framer Motion

## Development

```bash
npm install
npm run dev
```

## Deploy to Vercel

### First time
```bash
npm install -g vercel
vercel login
vercel --prod
```

### Subsequent deploys
```bash
vercel --prod
```

`vercel.json` is already configured for SPA routing.

## Brand

- **Prussian Blue** `#001e62`
- **Carrot Orange** `#ef7225`
- **Dodger Blue** `#006cff`
- **Fonts:** Poppins (headings), Nunito (body)
