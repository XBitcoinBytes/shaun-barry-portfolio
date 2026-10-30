# Shaun Barry — Personal Site

Next.js (App Router) + TypeScript + Tailwind CSS v4. Single static page, deployed on Vercel.

## Edit content
All copy lives in **`src/content/profile.ts`**. Any field set to `null` renders as a dashed
"To confirm / To add" pill on the site, so nothing is invented.

Still needed from Shaun:
- `profile.email`, `profile.phone`, `profile.linkedin`, `profile.github`
- `profile.photo` (drop a file in `/public`), `profile.resumePdf` (drop a PDF in `/public`)
- Refi.com / Veterans United: exact title(s), dates, 3 highlights (`experience[1]`)
- Credentials: confirm NMLS ID 30170 is his individual ID; education; certifications
- `skills.tools` (LOS / CRM / pricing systems used)

## Develop
```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

## Connect GitHub later
```bash
git remote add origin https://github.com/<user>/shaun-barry-portfolio.git
git push -u origin main
```
Then import the repo in Vercel (or link the existing `shaun-barry-portfolio` project) for auto-deploys on push.
