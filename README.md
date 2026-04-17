# My Portfolio

This project is a React + Vite portfolio for CasRael with a contact form and local backend.

## What the contact form does

- The frontend submits messages to `/api/contact`.
- The backend saves the contact locally and sends an email to `mycasreal@gmail.com`.
- If SMTP is not configured, the form falls back to opening the user's mail app.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Copy the example env file:

```bash
cp .env.example .env
```

3. Open `.env` and set your SMTP credentials:

```ini
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-gmail-address@gmail.com
SMTP_PASS=your-gmail-app-password
EMAIL_FROM="CasRael <mycasreal@gmail.com>"
EMAIL_TO=mycasreal@gmail.com
RATE_LIMIT_WINDOW_MINUTES=15
RATE_LIMIT_MAX_REQUESTS=8
```

> If you use Gmail, create an app password and use it for `SMTP_PASS`.

4. Start the backend server:

```bash
npm run server
```

5. Start the frontend app:

```bash
npm run dev
```

6. Open the frontend in the browser:

- `http://localhost:5174/`

## Production

1. Build the frontend assets:

```bash
npm run build
```

2. Start the production server:

```bash
npm run start
```

3. Open the app in the browser:

- `http://localhost:4000/`

4. If you need to set a different host or port:

- Windows:

```bash
set NODE_ENV=production&& set HOST=0.0.0.0&& set PORT=4000&& npm run start
```

- macOS/Linux:

```bash
NODE_ENV=production HOST=0.0.0.0 PORT=4000 npm run start
```

## Vercel deployment

This project now includes a serverless contact API endpoint at `/api/contact`.

1. Create a free Vercel account and connect your GitHub repository.
2. Select the `main` branch from `Israel18417/CasRael`.
3. Set the build command to:

```bash
npm install && npm run build
```

4. Set the output directory to:

```bash
dist
```

5. Add these environment variables in Vercel:

- `NODE_ENV=production`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASS`
- `EMAIL_FROM`
- `EMAIL_TO`

6. Deploy the site.

### Notes

- Vercel will serve static assets from `dist` and handle `/api/contact` via the Vercel function in `api/contact.js`.
- `PORT` is provided automatically by Vercel.
- If you still want to deploy on Render, the existing `render.yaml` is available in the repo.

- `EMAIL_TO` is already set to `mycasreal@gmail.com`.
- If the backend SMTP settings are missing or fail, the form will open the default mail app as a fallback.
