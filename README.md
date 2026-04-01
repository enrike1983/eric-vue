# Nuxt + Contentful Demo

Progetto Vue (Nuxt) con due pagine:

- `/`
- `/sottopagina`

Entrambe leggono contenuti da Contentful lato server, con setup SEO-friendly (SSR, meta tag, robots, sitemap).

## Avvio

1. Installa dipendenze:

```bash
npm install
```

2. Crea file `.env` partendo da `.env.example` e inserisci le credenziali Contentful.

3. Avvia in sviluppo:

```bash
npm run dev
```

## Modello Contentful atteso

`content_type`: `pageContent` (configurabile via env)

Campi minimi:

- `slug` (Short text), valori: `home`, `sottopagina`
- `title` (Short text)
- `body` (Long text o Rich text)
