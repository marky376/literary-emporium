# Literary Emporium — minimal frontend scaffold

This repository is a small Vite + React scaffold for a classic-themed e-commerce UI for books.

# Quick start (Windows PowerShell):

```powershell
npm install
npm run dev
```

The app runs at http://localhost:5173 by default.

Notes:
- This is a minimal frontend prototype with sample data in `src/data/books.json`.
- Cart is stored in `localStorage` for demo purposes. A mock serverless checkout endpoint is provided for demo only.

Deploying to Vercel

This project is ready to deploy to Vercel as a static site with a small serverless function for checkout.

1) From the project root you can build locally:

```powershell
npm run build
```

2) To deploy, either connect this GitHub repository to Vercel (recommended) or deploy from the CLI:

```powershell
npm i -g vercel
vercel login
vercel --prod
```

Vercel will run `npm run build` and use the `dist` directory. The `vercel.json` in this repo instructs Vercel to treat files under `api/` as serverless Node functions (the mock checkout endpoint lives at `/api/checkout`).

Security & notes
- The checkout endpoint is a demo-only serverless function and does not process payments or persist data. Replace with a real payment provider (Stripe, PayPal) and a database for production.

# literary-emporium