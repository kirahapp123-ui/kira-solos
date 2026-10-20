# KIRA — AI, Water & Life

A responsive, single-page environmental research website built with HTML, CSS and vanilla JavaScript. Designed for static hosting such as GitHub Pages.

## Files
- `index.html` — content and semantic page structure
- `style.css` — responsive styling, original CSS illustrations and reduced-motion support
- `script.js` — mobile navigation, current year, survey validation and honest demo feedback

## Preview locally
1. Put all three files in the same folder.
2. Open `index.html` in a browser. Most features work without a server.
3. Recommended: use Visual Studio Code and the Live Server extension to preview changes while editing.

## Survey status — important
The survey is intentionally a **front-end demo**. It validates required fields but does not transmit, store or aggregate responses. Do not describe it as collecting anonymous research data yet. To collect responses, connect a form backend or database, review that provider's privacy terms and retention settings, add an appropriate privacy notice/consent process, and test the integration before public launch. Avoid collecting identifying details.

## Publish with GitHub Pages
1. Create a new GitHub repository (for example, `kira-ai-water-life`).
2. Upload `index.html`, `style.css`, and `script.js` to the repository root.
3. Open **Settings → Pages**.
4. Under build/deployment, choose **Deploy from a branch**, select `main` and `/(root)`, then save.
5. Wait for GitHub Pages to publish the site; the published URL will appear on the Pages settings screen.

## Sources and scientific scope
The site links to the IEA, USGS, EPA, The Green Grid and IPCC. Claims are framed as general mechanisms and context-dependent risks, not proof that a specific data centre has harmed a particular ecosystem. Review sources periodically because technical evidence and policy evolve.

## Design notes
- CSS-generated hero and system illustrations avoid external image licensing uncertainty.
- Google Fonts are loaded from Google Fonts; the page remains usable with local fallback fonts if that request fails.
- External references open in a new tab with `rel="noopener noreferrer"`.
