# Deploying the Financial Advice app to Vercel (web)

> Status: **build-ready, NOT live.** The Expo web export was verified locally on
> 2026-11-15 (see "Local verification" below). Nothing has been deployed to
> Vercel — Vercel is not connected, so the deploy step itself still has to be
> done from the Vercel dashboard (or `vercel` CLI) by someone with access.

## What this app is

Expo SDK 51 / React Native 0.74 / TypeScript app (Lattice Mobile Developer
Assessment): an **AI Conversation** page (chat threads in a drawer, simulated
AI replies from hardcoded mock data) and a **Dashboard** page (picker +
add/delete dashboards, line-chart widgets via `react-native-gifted-charts`).
No backend, no real AI API — all data is local mock data (`src/api/mockData.ts`).
No Next.js is used anywhere; this is a static Expo web export.

## Vercel settings (exact)

Import the repo in the Vercel dashboard
(`https://github.com/smabdulmueid97/Financial-Advice-Mobile-Application`)
and use these settings:

| Setting | Value |
|---|---|
| Framework Preset | **Other** (no framework — static output) |
| Root Directory | `./` (repo root) |
| Install Command | `npm ci` (default; `package-lock.json` is in the repo) |
| Build Command | `npm run export:web` (runs `expo export --platform web`) |
| Output Directory | `dist` |
| Node.js Version | 18.x or newer (Vercel default is fine) |

`vercel.json` in the repo root already pins the Build Command and Output
Directory, plus an SPA fallback rewrite (any unmatched path serves
`/index.html`; real files under `dist/` — JS bundle, assets, favicon — are
served directly first). The Framework Preset must still be set to **Other**
in the dashboard; `vercel.json` cannot set it.

## Expected live URL

Vercel will assign a URL based on the project name, e.g.:

- `https://financial-advice-mobile-application.vercel.app`
- (or `https://financial-advice-mobile-application-<user>.vercel.app` if that
  name is taken; the exact URL is shown in the dashboard after the first deploy)

Every push to `main` redeploys automatically once the project is imported.

## Local verification (2026-11-15, this sandbox)

- `npm ci` then `npx expo export --platform web` → **succeeded**.
- Output in `dist/`: `index.html` (1.24 kB), one JS bundle
  `_expo/static/js/web/AppEntry-<hash>.js` (1.83 MB, 868 modules), `favicon.ico`,
  `metadata.json`, 3 small navigation icons. Served locally with
  `python3 -m http.server`: `/` → HTTP 200, bundle → HTTP 200.
- No code changes were needed for the export. `react-dom` and
  `react-native-web` were already in `package.json`; the only repo changes
  for this task are `vercel.json`, this file, and the `export:web` npm script.
- `dist/` and `node_modules/` are gitignored (already in the repo's
  `.gitignore`), so Vercel builds them fresh on every deploy.

## What works on web vs mobile-only behaviour

The app already contains one web-specific fix: `Alert.prompt` is not
supported on web, so "Add Dashboard" falls back to the browser's
`window.prompt` (`src/screens/DashboardScreen.tsx:37-43`).

| Feature | Web behaviour |
|---|---|
| AI chat (threads, send message, simulated typing reply) | Works; replies are hardcoded mock responses, no real AI |
| Dashboard picker, add/delete dashboard, add/delete chart widgets | Works (add uses browser `prompt` on web) |
| Line charts (`react-native-gifted-charts` / `react-native-svg`) | Works (SVG renders in browser) |
| Drawer navigation (swipe from edge, hamburger) | Works via tap/click; edge-swipe gesture is touch-oriented |
| Thread rename (long-press) / swipe-to-delete | Touch gestures — on desktop use the visible controls; swipe-to-delete may not trigger with a mouse |
| Keyboard handling (`KeyboardAvoidingView`) | iOS/Android branches are no-ops on web; input sits at the bottom normally |
| Layout | Mobile-first portrait design; on a wide desktop it renders as a narrow phone-width column, not a full desktop layout |

No native-only modules are used (no camera, location, push notifications,
or `AsyncStorage`), so nothing in the app blocks a web build.

## Fallback if Vercel ever fails

This stays a mobile app first. Build the Android APK with EAS as documented
in the README:

```bash
npx eas build:configure
npx eas build --platform android
```

(`eas.json` already has a `preview` profile with `buildType: apk`.)
There is no published APK link in the README — an EAS build produces the
download link.

## Notes for the next agent (sandbox quirks, not repo problems)

- `git clone` of the repo failed twice with `curl 56 GnuTLS recv error
  (-110)`; the source in this work dir was fetched instead via the codeload
  zip (`https://codeload.github.com/smabdulmueid97/Financial-Advice-Mobile-Application/zip/refs/heads/main`)
  and has no `.git` history from upstream. Re-clone or re-init git before
  pushing.
- `npm ci` **as root** fails in this sandbox with `EPERM chown ...` (npm
  tries to chown installed files to `nobody`, which this filesystem
  rejects). It works when run as a non-root user. This does **not** affect
  Vercel — Vercel builds as a non-root user and `npm ci` works there.
- `pnpm install` works here but its symlinked layout breaks Expo's Metro
  bundler (`expo/AppEntry.js` does `import App from '../../App'`, which
  resolves outside the project once symlinked). Do not use pnpm for the
  Vercel build; `npm ci` is the correct install command.
- `yarn install` (v1) was also tried and failed with registry/network
  retries; not recommended.
