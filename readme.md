# UAE CV Builder

A mobile-friendly CV builder for **UAE skilled trade and blue-collar workers**. Fill in your details, pick job responsibilities for your trade, preview a professional A4 CV, pay with **Pi Network**, then download as **PDF** or **PNG**.

**Live site (Vercel):** Connect your Vercel project to this repo — it deploys automatically on every push to `main`. Use your existing Vercel project URL (Pi app / browser).

## Features

- Personal details: name, date of birth, nationality, passport, UAE visa
- **18 trade designations** with pre-written job responsibilities (electrician, plumber, welder, HVAC, mason, and more)
- Upload or capture a profile photo (mobile camera supported)
- Live **A4 CV preview** with formal document styling
- **PDF and PNG download** after Pi payment
- **English / Hindi** UI labels for migrant workers in the UAE
- **Auto-save draft** to your browser (localStorage)
- Form validation on required fields
- **Pi Browser** payment integration (0.01 Pi)
- Dev unlock button when testing outside Pi Browser
- Installable as a lightweight PWA in Pi Browser

## Professions included

Electrician, Plumber, Construction Laborer, Carpenter, Cleaner / Janitor, Driver, Security Guard, Welder, HVAC Technician, Mason, Painter, Mechanic, Fabricator, Storekeeper, Housekeeping Supervisor, Forklift Operator, Scaffolder, Tile Fixer

Each profession includes multiple ready-to-use responsibility lines.

## Local development

```bash
git clone https://github.com/sgeorge83/cvbuilder.git
cd cvbuilder
npm run serve
```

Open [http://localhost:3000](http://localhost:3000). Use the **Dev: Unlock Download** button to test exports without Pi payment.

## Pi Network setup

1. Register your app at [Pi Developer Portal](https://develop.pi).
2. Set the validation key in your Pi app settings. Keep a local copy in `validation-key.txt` (gitignored for new commits).
3. Point your Pi app URL to your **Vercel deployment URL**.
4. Open that URL inside **Pi Browser** to authenticate and pay.
5. After successful payment, PNG and PDF download buttons are enabled.

### Payment flow

1. Fill the form and tap **Generate CV Preview**
2. Tap **Pay with Pi to Unlock Download**
3. Complete the 0.01 Pi payment in Pi Browser
4. Download your CV as PDF or PNG

## Deploy to Vercel

This repo is configured for **Vercel** (`vercel.json` serves the `public/` folder).

1. Import [github.com/sgeorge83/cvbuilder](https://github.com/sgeorge83/cvbuilder) in [Vercel](https://vercel.com/new).
2. Framework preset: **Other** (static site, no build command).
3. Root Directory: leave as **`.`** (repo root) — `vercel.json` sets `outputDirectory` to `public`.
4. Push to `main` — Vercel redeploys automatically.

If your existing Vercel project used **Root Directory: `public`**, either:
- Set Root Directory back to **`.`** (recommended with `vercel.json`), or
- Remove `outputDirectory` from `vercel.json` and keep Root Directory as `public`.

Update your Pi Developer Portal app URL to match your Vercel domain after deploy.

## Project structure

```
cvbuilder/
├── public/                 # Static site (Vercel output)
│   ├── index.html
│   ├── css/styles.css
│   ├── js/                 # app, i18n, storage, pi-payment, export
│   ├── data/jobs.json
│   ├── icons/
│   ├── manifest.json
│   └── service-worker.js
├── vercel.json
├── package.json
└── validation-key.txt      # local Pi key (gitignored)
```

## License

MIT
