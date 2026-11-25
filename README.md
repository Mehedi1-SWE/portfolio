# Mehedi Hasan — Portfolio

This repository contains two independent Next.js applications deployed as separate Vercel projects.

## Applications

- `frontend/` — public portfolio website. Visitors can view the portfolio and submit the contact form.
- `backend/` — private administration app and API. It manages MongoDB data, contact submissions, and portfolio content. Admin routes require authentication.

## Local development

Run each application in its own terminal:

```bash
cd frontend
npm install
npm run dev
```

```bash
cd backend
npm install
npm run dev
```

## Vercel deployment

Create two Vercel projects from this same GitHub repository:

1. Frontend project: set Root Directory to `frontend` and configure `NEXT_PUBLIC_API_URL` with the deployed backend URL.
2. Backend project: set Root Directory to `backend` and configure `MONGODB_URI`, `ADMIN_API_KEY`, optional Resend variables, and `FRONTEND_ORIGIN` with the exact deployed frontend origin.

Deploy the backend first, then set its URL in the frontend environment variables. Redeploy the frontend after adding or changing `NEXT_PUBLIC_API_URL`.

Never put MongoDB credentials or the admin key in frontend environment variables. The public contact endpoint is intentionally reachable by the frontend; administrative endpoints remain protected by the admin session/key.

## CV management

The backend Admin dashboard provides upload, replace, preview and delete for Academic, Professional and Complete CV PDFs. Cloudinary stores the files; MongoDB stores metadata and secure URLs. Configure `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY` and `CLOUDINARY_API_SECRET` in the backend deployment. PDF uploads are limited to 10 MB and require the existing admin session.
