# Sanity Studio – Login & Setup

## 1. Create or use a Sanity project

1. Go to [sanity.io/manage](https://sanity.io/manage).
2. Log in with **Google**, **GitHub**, or email.
3. **Create a project** (or use an existing one). Note the **Project ID** (e.g. `vdl9q4qh`).
4. Create or pick a **dataset** (e.g. `production`).

## 2. Log in to the Studio

- **Standalone studio** (folder `studio-george_leke`): run `npm run dev` there, then open the URL it prints (e.g. `http://localhost:3333`).
- **Embedded studio** (in the Next.js app): run `npm run dev` in the project root, then open `http://localhost:3000/studio`.

On first open you’ll be sent to **Sanity’s login page**. Sign in with the same account that owns (or is invited to) the project. After auth, you’re back in the Studio.

**Who can log in:** only users who have access to the project (owner or people you invite under **Project → Access** in [sanity.io/manage](https://sanity.io/manage)).

## 3. Environment variables

### Next.js app (for site + embedded Studio)

In the **project root**, create `.env.local`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

Replace `your_project_id` with the Project ID from step 1. Restart `npm run dev` after changing env.

### Standalone studio (`studio-george_leke`)

In `studio-george_leke`, create `.env` (or use the existing one):

```env
SANITY_STUDIO_PROJECT_ID=your_project_id
SANITY_STUDIO_DATASET=production
```

Same Project ID and dataset as above.

## 4. CORS (required for Studio to work)

1. In [sanity.io/manage](https://sanity.io/manage), open your project.
2. Go to **API → CORS origins**.
3. Add:
   - `http://localhost:3000` (Next.js / embedded Studio)
   - `http://localhost:3333` (if you use the standalone studio)
4. For production, add your live site URL (e.g. `https://yourdomain.com`).
5. Leave **Allow credentials** enabled so login works.

## 5. Galleries (Our Day, Family, Friends, Bride, Groom)

The site shows five gallery sections. In the Studio sidebar you’ll see **Galleries** with:

- **Our Day** – main wedding gallery (order `0`)
- **Family**
- **Friends**
- **Bride**
- **Groom**
- **All galleries** – list of every gallery

**To add photos to a section:**

1. Open **Galleries** in the sidebar, then the section (e.g. **Family**).
2. If the list is empty, click **Create new**.
3. When asked for a template, choose the one that matches the section (e.g. **Family**). Title and slug will be set for you.
4. Add images in the **Images** array (upload or select), add optional alt text or captions, then **Publish**.

**Slug / order:** Our Day uses slug `our-day` and order `0`; Family/Friends/Bride/Groom use slugs `family`, `friends`, `bride`, `groom`. The site uses the first gallery by **Order** for the “Our Day” section if no `our-day` slug exists.

## 6. Run commands

| Goal              | Where              | Command                    |
|-------------------|--------------------|----------------------------|
| Wedding site      | Project root       | `npm run dev`              |
| Embedded Studio   | Project root       | `npm run dev` → open `/studio` |
| Standalone Studio | `studio-george_leke` | `npm install` then `npm run dev` |

## Troubleshooting

- **“Project not found” or can’t log in:** Check Project ID and that you’re logged into the correct Sanity account. Invite yourself under **Project → Access** if the project was created by someone else.
- **Studio loads but can’t fetch/save:** Add the Studio URL to **CORS origins** (step 4) and ensure env vars are set and the dev server was restarted.
- **No gallery on the site:** Create and publish at least one **Gallery** document with at least one image (step 5).
