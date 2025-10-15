# Copilot instructions for this repo

This project is a React + React Three Fiber (R3F) 3D portfolio built with Vite. The Vite root is `src`, static assets live in `public`, and production builds are published to `docs/` for GitHub Pages.

## Run, build, deploy
- Dev: `npm run dev` (Vite server, root is `src/`, `public/` served at `/`). The server is network-accessible and auto-opens locally.
- Build: `npm run build` writes to `docs/` (CLI flag overrides `vite.config.js`), sourcemaps on. `docs/CNAME` configures the custom domain.
- Live reload for static assets: `vite-plugin-restart` watches `public/**` so asset edits reload without restarting.

## Architecture and scene orchestration
- Entry: `src/App.jsx` mounts `<Canvas>` with `<Suspense>` and `<PerformanceMonitor>` to dynamically adjust DPR. It lazy-loads three scenes:
  - `homepage/LaptopScene.jsx`
  - `projects/ProjectsScene.jsx`
  - `contact/ContactScene.jsx`
  Chunk preloading after first render makes later page switches instant.
- Orchestrator: `src/Experience.jsx` owns page switching (HOME/PROJECTS/CONTACT) via an `<Html>` navbar rendered inside the 3D scene. It coordinates scene show/hide with GSAP animations and a loading-plane fade on first load.
- Scene contract (important): Each scene component is a `forwardRef` that exposes:
  - `scale` (the scene’s group scale; scenes start as `scale={0}` and `visible={false}`)
  - `toggleAnimateOut()` to toggle in/out with a 0.5s GSAP animation (updates camera projection on each tick)
  - `toggleOut()` to toggle instantly
  `Experience.SetPage()` relies on that API and waits ~500ms between out/in; keep any new scene aligned with that timing.

## Project-specific patterns
- Camera focus: `utils/ToggleFocusButton.jsx` moves the R3F camera with GSAP between its initial pose and a “focus” pose (slightly different for `page="projects"`). Always call `camera.updateProjectionMatrix()` during GSAP tweens.
- Text: `utils/TitleText3D.jsx` centers `<Text3D>` and supports `useNormal`/`useStandard`/default matcap (`/matcaps/greyClay.png`). Fonts live in `/fonts` (e.g., `/fonts/Inter_Bold.json`).
- Hover/click behaviors: `utils/Helpers.jsx` provides `animateIn/animateOut` scale tweens and `handleClick(url, recentClick, setRecentClick)` that throttles external link opens.
- Assets and preloading: GLTFs are under `/models/**`; scenes call `useGLTF.preload(...)` at file bottom to avoid hitches on first show. Refer to assets with absolute paths (e.g., `/models/...`, `/aobox-transformed.glb`).
- Portal effect: `projects/ProjectsScene.jsx` uses `<MeshPortalMaterial>` to render a boxed “inner world” with project title/description, arrow navigation, and floating link logos (`contact/Logo.jsx`).
- Controls & debug: Leva groups settings under “General”, “Projects Scene”, and “Contact Scene”. `General.showPerf` toggles `r3f-perf`; `General.orbitControls` swaps `PresentationControls` for `OrbitControls` in `Experience.jsx`.

## Non-obvious repo details
- Index HTML is at `src/index.html` (because `root: 'src'`). Static files from `public/` are served at `/`.
- Vite transforms `src/**/*.js` as JSX (see custom plugin in `vite.config.js`), so JSX may appear in `.js` files.
- Mobile flow: `App.jsx` shows a mobile warning with “Continue” (3D) or “Redirect” to a 2D site.
- Debug hash: `#debug` is intended to toggle Leva debug UI (see `App.jsx`); variable naming is inverted (`isDebug` means “hide Leva”). If adjusting, verify the hash handler and `hidden` prop.

## Adding a new scene/page (example)
1) Implement a `forwardRef` scene component exposing `scale`, `toggleAnimateOut()`, and `toggleOut()` like the existing scenes; start hidden (`scale={0}`, `visible={false}`).
2) Lazy-load it in `App.jsx` and pass into `Experience.jsx`.
3) Mount it in `Experience.jsx` next to the others and add a navbar entry; wire into `SetPage()` with the same timing (500ms waits).
4) Preload heavy assets with `useGLTF.preload(...)`.

## Key files/directories
- App/Canvas: `src/App.jsx`, `src/Experience.jsx`
- Scenes: `src/homepage/LaptopScene.jsx`, `src/projects/ProjectsScene.jsx`, `src/contact/ContactScene.jsx`
- Utilities: `src/utils/ToggleFocusButton.jsx`, `src/utils/Helpers.jsx`, `src/utils/TitleText3D.jsx`, `src/contact/Logo.jsx`
- Assets: `public/models/**`, `public/fonts/**`, `public/matcaps/**`
- Build/config: `vite.config.js`, `package.json`
