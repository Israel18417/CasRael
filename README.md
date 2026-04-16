# My Portfolio

This project is a React + Vite portfolio for CasRael with a contact form and local backend.

## What the contact form does

- The frontend submits messages to `/api/contact`.
- The backend saves the contact locally and sends an email to `mycasrael@gmail.com`.
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
EMAIL_FROM="CasRael <mycasrael@gmail.com>"
EMAIL_TO=mycasrael@gmail.com
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

## Render deployment

Render is a good choice for this project because it supports Node web services and environment variables.

1. Create a free Render account.
2. Create a new Web Service.
3. Connect your GitHub repository.
4. Use `render.yaml` in the repo to configure the service.
5. Make sure the service name is `CasRael` so the free URL becomes:

- `https://CasRael.onrender.com`

6. Set the build command to:

```bash
npm install && npm run build
```

7. Set the start command to:

```bash
npm run start
```

8. Add these environment variables in Render:

- `PORT` (Render provides this automatically)
- `NODE_ENV=production`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASS`
- `EMAIL_FROM`
- `EMAIL_TO`

9. Deploy and copy the generated Render URL.

## Notes

- `EMAIL_TO` is already set to `mycasrael@gmail.com`.
- If the backend SMTP settings are missing or fail, the form will open the default mail app as a fallback.
