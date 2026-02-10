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

The site shows five gallery sections. In the Studio sidebar open **Galleries**; you’ll see:

- **Our Day** – main wedding gallery
- **Family**
- **Friends**
- **Bride**
- **Groom**
- **All galleries** – every gallery document

### How to add pictures for each category (via slug)

Each category on the site is tied to a **slug**. You create one Gallery document per category and set its slug to match.

| Category on site | Slug to set in Sanity |
|------------------|------------------------|
| Our Day          | `our-day` (and **Order** `0` if you want it first) |
| Family           | `family` |
| Friends          | `friends` |
| Bride            | `bride` |
| Groom            | `groom` |

**Steps:**

1. In the sidebar, go to **Galleries** → the category you want (e.g. **Family**).
2. If the list is empty, click **Create new** (you’ll get a new Gallery document).
3. Fill in:
   - **Title** – e.g. `Family`
   - **Slug** – click **Generate** (from title), then **edit** the slug so it is exactly: `family` (or `friends`, `bride`, `groom`, `our-day`). Lowercase, no spaces.
   - **Order** – for “Our Day” use `0`; others can be `1`, `2`, etc. (optional).
4. In **Images**, add items: click **Add item**, then **Image** – upload or select from the asset library. Add optional **Alt text** or **Caption**.
5. Click **Publish**.

Repeat for each category (Family, Friends, Bride, Groom, Our Day). The site loads each section by slug (`family`, `friends`, etc.), so the slug must match exactly.

## 6. Production deployment (e.g. GitHub → Vercel)

**Sanity is not “pushed” to production.** Content lives on Sanity’s servers. Your repo only deploys the Next.js site; the site then loads content from Sanity using your project ID and dataset.

**What you need to do:**

1. **Set environment variables on your host** (Vercel, Netlify, etc.):
   - `NEXT_PUBLIC_SANITY_PROJECT_ID` = your Sanity project ID (e.g. `vdl9q4qh`)
   - `NEXT_PUBLIC_SANITY_DATASET` = `production` (or the dataset you use)
   - `NEXT_PUBLIC_SITE_URL` = your live site URL (e.g. `https://your-site.vercel.app`) — optional but recommended for OG/links

   Do **not** commit `.env` or `.env.local`; configure these in the host’s dashboard (e.g. Vercel → Project → Settings → Environment Variables).

2. **Add your production URL to Sanity CORS:**
   - [sanity.io/manage](https://www.sanity.io/manage) → your project → **API** → **CORS origins**
   - Add your production origin, e.g. `https://your-site.vercel.app` or `https://yourdomain.com`
   - Leave **Allow credentials** on so the embedded Studio at `yoursite.com/studio` can log in.

3. **Content:** The same Sanity project and dataset you use locally is used in production. No extra “push” of Sanity; publish content in Studio and the live site will show it.

## 7. Run commands

| Goal              | Where              | Command                    |
|-------------------|--------------------|----------------------------|
| Wedding site      | Project root       | `npm run dev`              |
| Embedded Studio   | Project root       | `npm run dev` → open `/studio` |
| Standalone Studio | `studio-george_leke` | `npm install` then `npm run dev` |

## Troubleshooting

- **“Project not found” or can’t log in:** Check Project ID and that you’re logged into the correct Sanity account. Invite yourself under **Project → Access** if the project was created by someone else.
- **Studio loads but can’t fetch/save:** Add the Studio URL to **CORS origins** (step 4) and ensure env vars are set and the dev server was restarted.
- **No gallery on the site:** Create and publish at least one **Gallery** document with at least one image (step 5).
