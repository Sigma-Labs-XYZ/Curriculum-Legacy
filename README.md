# Sigma Labs Legacy Curriculum

A frozen copy of the Sigma Labs workshop notes from before the AI coach (CoachBot) changes. Coaches who are still teaching the original workshops can use it.

**Do not update this content.** The live curriculum is at [curriculum.sigmalabs.co.uk](https://curriculum.sigmalabs.co.uk/), with its source in [Sigma-Labs-XYZ/Curriculum](https://github.com/Sigma-Labs-XYZ/Curriculum).

## What's in it

The workshops from these modules:

- Software Fundamentals (Fundamentals, Networking, Backend)
- Advanced Data
- Technical Business Analyst

Each workshop shows its last version before we converted it to CoachBot. Everything else matches the live curriculum's `main` branch at `536d824f4` (2026-11-04). [LEGACY_CHANGES.md](./LEGACY_CHANGES.md) lists every file that differs from that commit and explains why.

This site has no backend:

- No login. Anyone with the URL can read it.
- `LockedContent` sections are always unlocked.
- Learning objectives show as a plain list, not Airtable-backed sliders.
- No CoachBot, Airtable, Auth0 or Sentry.
- `noindex` and `robots.txt` stop search engines listing it.

## Running locally

Requires Node.js 18 or later.

```zsh
npm install
npm run start   # dev server at http://localhost:3000/Curriculum-Legacy/
npm run build   # production build into ./build
npm run serve   # serve ./build
```

No `.env` file is needed.

## Deployment

Every push to `main` triggers [.github/workflows/deploy.yml](./.github/workflows/deploy.yml), which builds the site and deploys it to GitHub Pages at <https://sigma-labs-xyz.github.io/Curriculum-Legacy/>.

### Moving to a custom domain

1. Add a DNS `CNAME` record for `legacy.curriculum.sigmalabs.co.uk` pointing to `sigma-labs-xyz.github.io`.
2. In the repo, go to **Settings > Pages > Custom domain**, enter `legacy.curriculum.sigmalabs.co.uk`, and tick **Enforce HTTPS** once the certificate is issued.
3. In **Settings > Secrets and variables > Actions > Variables**, add:
   - `SITE_URL` = `https://legacy.curriculum.sigmalabs.co.uk`
   - `BASE_URL` = `/`
4. Re-run the **Deploy to GitHub Pages** workflow.
