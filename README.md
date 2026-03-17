# APZ Tattoo Frontend (Angular Standalone)

Angular standalone migration of the Wix site with:

- Public pages: home/about/catalog/designs/connect(for contact)/clients(for collectors)/artists
- Auth: login + JWT refresh flow
- Role-protected dashboards: admin/crm/artist/client
- Asset manifest resolver (no hotlinking)

## Install

```bash
cd Frontend/appTatto
npm install
```

## Download Wix assets

```bash
npm run download:assets
```

This creates:

- `public/assets/apztattoo/**`
- `public/assets/apztattoo/_manifest.json`

## Configure API

Edit:

- `src/environments/environment.ts`
- `src/environments/environment.prod.ts`

Set:

- `apiBaseUrl`

## Run

```bash
npm start
```

## Build

```bash
npm run build
```

For full backend + E2E flow, see root README: `../../README.md`.
# frontendActividadTest
