# UAE CV Builder

A mobile-friendly CV builder for **UAE skilled trade and blue-collar workers**. Fill in your details, pick job responsibilities for your trade, preview a professional A4 CV, pay with **Pi Network**, then download as **PDF** or **PNG**.

**Live site (Vercel):** Connect your Vercel project to this repo — it deploys automatically on every push to `main`. Use your existing Vercel project URL (Pi app / browser).

## Features

- Personal details: name, date of birth, nationality, passport, UAE visa
- **18 trade designations** with pre-written job responsibilities (electrician, plumber, welder, HVAC, mason, and more)
- Upload or capture a profile photo (mobile camera supported)
- Live **A4 CV preview** with formal document styling
- **PDF and PNG download** after Pi payment
- **English / Hindi / Urdu / Nepali** UI labels for migrant workers in the UAE
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

Pi payments need **frontend SDK + server-side approve/complete**. This repo includes Vercel routes at `/api/payments/approve` and `/api/payments/complete`.

### 1. Pi Developer Portal ([develop.pi](https://develop.pi))

1. Open your **UAE CV Builder** app.
2. Set **App URL** to your exact **Vercel URL** (e.g. `https://your-project.vercel.app`).
3. Add your **domain validation key** (`validation-key.txt` — for portal only, not used in code).
4. Create a **Server API Key** (different from the validation key).

### 2. Vercel environment variable

Vercel → project → **Settings → Environment Variables**:

| Name | Value |
|------|--------|
| `PI_API_KEY` | Your **Server API Key** from develop.pi |

Apply to **Production**, then **redeploy**.

### 3. Test in Pi Browser

1. Open your Vercel URL in **Pi Browser**.
2. **Generate CV Preview** → **Pay with Pi to Unlock Download**.
3. Approve 0.01 Pi — download unlocks after server completion.

### Payment flow

1. Frontend: `Pi.createPayment()`
2. `/api/payments/approve` → Pi API approves payment
3. User signs transaction in Pi Browser
4. `/api/payments/complete` → Pi API completes payment
5. PNG/PDF download enabled

### Troubleshooting

| Symptom | Likely cause |
|---------|----------------|
| "Open in Pi Browser" | Not using Pi Browser |
| Payment hangs | `PI_API_KEY` missing in Vercel, or wrong app URL in develop.pi |
| Payment failed after signing | Check Vercel function logs for `/api/payments/complete` |

Use **Dev: Unlock Download** for local/non-Pi testing only.

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
├── api/                    # Vercel serverless (Pi payment approve/complete)
│   ├── lib/pi-api.js
│   └── payments/
│       ├── approve.js
│       └── complete.js
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
├── .env.example            # PI_API_KEY template (set in Vercel dashboard)
└── validation-key.txt      # domain validation key for develop.pi (gitignored)
```

## License

MIT
