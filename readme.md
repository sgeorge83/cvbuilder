# UAE CV Builder

A mobile-friendly CV builder for **UAE skilled trade and blue-collar workers**. Fill in your details, pick job responsibilities for your trade, preview a professional A4 CV, pay with **Pi Network**, then download as **PDF** or **PNG**.

**Live site:** [https://sgeorge83.github.io/cvbuilder/](https://sgeorge83.github.io/cvbuilder/)

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
2. Set the validation key in your Pi app settings. Keep a local copy in `validation-key.txt` (this file is gitignored for new commits; an existing copy may remain in the repo history).
3. Open the deployed URL inside **Pi Browser** to authenticate and pay.
4. After successful payment, PNG and PDF download buttons are enabled.

### Payment flow

1. Fill the form and tap **Generate CV Preview**
2. Tap **Pay with Pi to Unlock Download**
3. Complete the 0.01 Pi payment in Pi Browser
4. Download your CV as PDF or PNG

## Deploy to GitHub Pages

The repo includes `.github/workflows/pages.yml`. On push to `main`, GitHub Actions deploys the site automatically.

**One-time setup:**

1. Repo → **Settings** → **Pages**
2. Source: **GitHub Actions**
3. Push to `main` — your site will be at `https://<username>.github.io/cvbuilder/`

## Project structure

```
cvbuilder/
├── index.html          # Main app
├── css/styles.css      # CV-builder styling
├── js/
│   ├── app.js          # Form, preview, orchestration
│   ├── i18n.js         # English / Hindi labels
│   ├── storage.js      # Draft save & unlock state
│   ├── pi-payment.js   # Pi SDK integration
│   └── export.js       # PDF & PNG export
├── data/jobs.json      # Trade designations & descriptions
├── icons/              # PWA icons (document-themed)
├── manifest.json
├── service-worker.js
└── package.json
```

## License

MIT
