# Ilmvest Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static, modern, responsive marketing website for Ilmvest Verwaltungs GmbH with a homepage (Hero, Leistungen, Über uns, Kontakt) and a separate Impressum page.

**Architecture:** Plain static HTML5/CSS3/vanilla JS, no build step, no framework. Shared `assets/style.css` and `assets/script.js` used by both `index.html` and `impressum.html`. Deployable directly via GitHub Pages.

**Tech Stack:** HTML5, CSS3 (flexbox/grid, custom properties), vanilla JS, Google Font "Inter" via CDN link.

## Global Constraints

- Primary color: `#1e2f3f` (dark navy). Accent color: `#5b7288` (slate blue). Section background alt: `#f7f8f9`.
- Font: "Inter" from Google Fonts, fallback stack `system-ui, -apple-system, "Segoe UI", sans-serif`.
- Mobile-first, responsive breakpoint at `768px` for the hamburger nav.
- No backend, no build tools, no JS frameworks. Nav must remain usable with JS disabled (use `<details>`-based fallback, not a JS-only menu).
- Company data in Impressum: Ilmvest Verwaltungs GmbH, Weimarische Str. 20, 99438 Bad Berka, Geschäftsführer Robert Riethmüller, E-Mail kontakt@ilmvest.de. Phone/Handelsregister/USt-IdNr. are unknown — render as bracketed italic placeholders, e.g. `[Telefonnummer einfügen]`.
- Logo source file: `Logo.png` at repo root — copy (do not move) into `assets/logo.png`.
- Repo remote: `https://github.com/JustinPriem/Ilmvest.de` on branch `main`.

---

### Task 1: Project scaffold + shared stylesheet

**Files:**
- Create: `assets/logo.png` (copy of `Logo.png`)
- Create: `assets/style.css`
- Test: manual (open a throwaway HTML file referencing the stylesheet in a browser)

**Interfaces:**
- Produces: CSS custom properties `--color-primary`, `--color-accent`, `--color-bg-alt`, `--font-base`, and utility classes `.container`, `.btn`, `.card`, `.site-header`, `.site-footer`, `.nav`, `.hero`, `.section`, `.section-alt` that Tasks 3 and 4 rely on by name.

- [ ] **Step 1: Copy the logo into assets**

```bash
mkdir -p assets
cp Logo.png assets/logo.png
```

- [ ] **Step 2: Create `assets/style.css` with the full base styling**

```css
:root {
  --color-primary: #1e2f3f;
  --color-accent: #5b7288;
  --color-bg: #ffffff;
  --color-bg-alt: #f7f8f9;
  --color-text: #1e2f3f;
  --color-text-muted: #5b7288;
  --font-base: "Inter", system-ui, -apple-system, "Segoe UI", sans-serif;
  --max-width: 1100px;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: var(--font-base);
  color: var(--color-text);
  background: var(--color-bg);
  line-height: 1.6;
}

img {
  max-width: 100%;
  display: block;
}

a {
  color: var(--color-accent);
}

.container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Header */
.site-header {
  position: sticky;
  top: 0;
  background: var(--color-bg);
  border-bottom: 1px solid #e5e8ea;
  z-index: 10;
}

.site-header .container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}

.site-header .logo img {
  height: 48px;
}

.nav ul {
  list-style: none;
  display: flex;
  gap: 2rem;
  margin: 0;
  padding: 0;
}

.nav a {
  text-decoration: none;
  color: var(--color-primary);
  font-weight: 500;
}

.nav a:hover {
  color: var(--color-accent);
}

/* Mobile nav uses <details>/<summary>, no JS required */
.nav-mobile {
  display: none;
}

.nav-mobile summary {
  list-style: none;
  cursor: pointer;
  font-size: 1.75rem;
  line-height: 1;
  color: var(--color-primary);
}

.nav-mobile summary::-webkit-details-marker {
  display: none;
}

.nav-mobile[open] .nav-mobile-panel {
  display: flex;
}

.nav-mobile-panel {
  display: none;
  flex-direction: column;
  gap: 1rem;
  position: absolute;
  right: 1.5rem;
  top: 64px;
  background: var(--color-bg);
  border: 1px solid #e5e8ea;
  border-radius: 8px;
  padding: 1rem 1.5rem;
  box-shadow: 0 8px 24px rgba(30, 47, 63, 0.08);
}

.nav-mobile-panel a {
  text-decoration: none;
  color: var(--color-primary);
  font-weight: 500;
}

@media (max-width: 768px) {
  .nav-desktop {
    display: none;
  }
  .nav-mobile {
    display: block;
  }
}

/* Hero */
.hero {
  padding: 5rem 0;
  text-align: center;
  background: linear-gradient(180deg, var(--color-bg-alt), var(--color-bg));
}

.hero h1 {
  font-size: 2.5rem;
  margin: 0 0 1rem;
  color: var(--color-primary);
}

.hero p {
  font-size: 1.15rem;
  color: var(--color-text-muted);
  max-width: 640px;
  margin: 0 auto 2rem;
}

.btn {
  display: inline-block;
  background: var(--color-primary);
  color: #fff;
  padding: 0.85rem 2rem;
  border-radius: 999px;
  text-decoration: none;
  font-weight: 600;
  transition: background 0.2s ease;
}

.btn:hover {
  background: var(--color-accent);
  color: #fff;
}

/* Sections */
.section {
  padding: 4rem 0;
}

.section-alt {
  background: var(--color-bg-alt);
}

.section h2 {
  font-size: 2rem;
  color: var(--color-primary);
  margin-top: 0;
  text-align: center;
  margin-bottom: 2.5rem;
}

/* Cards (Leistungen) */
.card-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

@media (max-width: 768px) {
  .card-grid {
    grid-template-columns: 1fr;
  }
}

.card {
  background: var(--color-bg);
  border: 1px solid #e5e8ea;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 16px rgba(30, 47, 63, 0.04);
}

.card h3 {
  color: var(--color-primary);
  margin-top: 0;
}

.card p {
  color: var(--color-text-muted);
  margin-bottom: 0;
}

/* Über uns */
.about-text {
  max-width: 720px;
  margin: 0 auto;
  text-align: center;
  color: var(--color-text-muted);
  font-size: 1.05rem;
}

/* Kontakt */
.contact {
  text-align: center;
}

.contact a.email {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-primary);
}

.contact .address {
  margin-top: 0.5rem;
  color: var(--color-text-muted);
}

/* Footer */
.site-footer {
  border-top: 1px solid #e5e8ea;
  padding: 2rem 0;
}

.site-footer .container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
}

.site-footer img {
  height: 32px;
}

.site-footer nav a {
  color: var(--color-text-muted);
  text-decoration: none;
  margin-left: 1.5rem;
}

.site-footer small {
  display: block;
  color: var(--color-text-muted);
  margin-top: 0.5rem;
  width: 100%;
}

/* Impressum page */
.legal h1 {
  color: var(--color-primary);
}

.legal h2 {
  color: var(--color-primary);
  font-size: 1.25rem;
  margin-top: 2rem;
}

.legal .placeholder {
  font-style: italic;
  color: #b23b3b;
}
```

- [ ] **Step 3: Verify visually**

Create a temporary `scratch.html` in the project root:

```html
<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<link rel="stylesheet" href="assets/style.css">
</head>
<body>
<div class="container"><h1>Test</h1><a class="btn" href="#">Button</a></div>
</body>
</html>
```

Open it in a browser (double-click or `start scratch.html` on Windows) and confirm the button renders with the dark navy background and rounded corners. Then delete `scratch.html`.

- [ ] **Step 4: Commit**

```bash
git add assets/logo.png assets/style.css
git commit -m "Add project scaffold and shared stylesheet

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 2: Shared nav-toggle script

**Files:**
- Create: `assets/script.js`

**Interfaces:**
- Consumes: `<details class="nav-mobile">` element markup produced in Task 3/4 (native `<details>` behavior; this script only auto-closes the menu after a link click).
- Produces: closes the mobile `<details>` nav automatically when a link inside it is clicked, so the menu doesn't stay open after navigating.

- [ ] **Step 1: Write `assets/script.js`**

```javascript
document.addEventListener("DOMContentLoaded", function () {
  var mobileNav = document.querySelector(".nav-mobile");
  if (!mobileNav) return;

  var links = mobileNav.querySelectorAll("a");
  links.forEach(function (link) {
    link.addEventListener("click", function () {
      mobileNav.removeAttribute("open");
    });
  });
});
```

- [ ] **Step 2: Verify it loads without errors**

This is wired up and checked visually in Task 3's verification step (browser console must show no errors after `index.html` includes this script).

- [ ] **Step 3: Commit**

```bash
git add assets/script.js
git commit -m "Add mobile nav auto-close script

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 3: Homepage (index.html)

**Files:**
- Create: `index.html`

**Interfaces:**
- Consumes: CSS classes from Task 1 (`.site-header`, `.nav`, `.nav-desktop`, `.nav-mobile`, `.hero`, `.btn`, `.section`, `.section-alt`, `.card-grid`, `.card`, `.about-text`, `.contact`, `.site-footer`), script from Task 2 (`assets/script.js`), logo at `assets/logo.png`.
- Produces: anchors `#leistungen`, `#ueber-uns`, `#kontakt` that nav links and the hero CTA scroll to; a footer link to `impressum.html` that Task 4 must resolve.

- [ ] **Step 1: Write `index.html`**

```html
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ilmvest Verwaltungs GmbH – Immobilienverwaltung in Bad Berka</title>
  <meta name="description" content="Ilmvest Verwaltungs GmbH bietet verlässliche Mietverwaltung und WEG-Verwaltung in Bad Berka und Umgebung.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/style.css">
</head>
<body>
  <header class="site-header">
    <div class="container">
      <a class="logo" href="index.html">
        <img src="assets/logo.png" alt="Ilmvest Verwaltungs GmbH Logo">
      </a>
      <nav class="nav nav-desktop">
        <ul>
          <li><a href="#leistungen">Leistungen</a></li>
          <li><a href="#ueber-uns">Über uns</a></li>
          <li><a href="#kontakt">Kontakt</a></li>
        </ul>
      </nav>
      <details class="nav-mobile">
        <summary aria-label="Menü öffnen">☰</summary>
        <nav class="nav-mobile-panel">
          <a href="#leistungen">Leistungen</a>
          <a href="#ueber-uns">Über uns</a>
          <a href="#kontakt">Kontakt</a>
        </nav>
      </details>
    </div>
  </header>

  <main>
    <section class="hero">
      <div class="container">
        <h1>Verlässliche Immobilienverwaltung in Bad Berka und Umgebung</h1>
        <p>Ilmvest Verwaltungs GmbH betreut Ihre Immobilie mit Sorgfalt, Transparenz und langjähriger Erfahrung – von der Mietverwaltung bis zur WEG-Verwaltung.</p>
        <a class="btn" href="#kontakt">Kontakt aufnehmen</a>
      </div>
    </section>

    <section id="leistungen" class="section">
      <div class="container">
        <h2>Leistungen</h2>
        <div class="card-grid">
          <div class="card">
            <h3>Mietverwaltung</h3>
            <p>Wir übernehmen die vollständige kaufmännische und technische Verwaltung Ihrer vermieteten Immobilie – von der Mietvertragsverwaltung über die Nebenkostenabrechnung bis zur Kommunikation mit Mietern.</p>
          </div>
          <div class="card">
            <h3>WEG-Verwaltung</h3>
            <p>Als Verwalter Ihrer Wohnungseigentümergemeinschaft organisieren wir Eigentümerversammlungen, setzen Beschlüsse um und sorgen für eine rechtssichere, transparente Verwaltung des gemeinschaftlichen Eigentums.</p>
          </div>
        </div>
      </div>
    </section>

    <section id="ueber-uns" class="section section-alt">
      <div class="container">
        <h2>Über uns</h2>
        <p class="about-text">Ilmvest Verwaltungs GmbH ist ein in Bad Berka ansässiges Immobilienverwaltungsunternehmen. Wir stehen für eine seriöse, verlässliche und persönliche Betreuung von Eigentümern und Eigentümergemeinschaften in der Region.</p>
      </div>
    </section>

    <section id="kontakt" class="section contact">
      <div class="container">
        <h2>Kontakt</h2>
        <p><a class="email" href="mailto:kontakt@ilmvest.de">kontakt@ilmvest.de</a></p>
        <p class="address">Ilmvest Verwaltungs GmbH · Weimarische Str. 20 · 99438 Bad Berka</p>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="container">
      <img src="assets/logo.png" alt="Ilmvest Verwaltungs GmbH Logo">
      <nav>
        <a href="impressum.html">Impressum</a>
      </nav>
      <small>&copy; 2026 Ilmvest Verwaltungs GmbH. Alle Rechte vorbehalten.</small>
    </div>
  </footer>

  <script src="assets/script.js"></script>
</body>
</html>
```

- [ ] **Step 2: Verify in browser**

Open `index.html` directly in a browser. Confirm:
- Logo and nav appear in the header, nav links scroll to the right section
- Resizing the window below 768px hides the desktop nav and shows the ☰ menu; clicking it opens a panel with working links
- The "Kontakt aufnehmen" button scrolls to the Kontakt section
- The email link opens a mail client (or shows `mailto:kontakt@ilmvest.de` on hover)
- Browser console (F12) shows no errors

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "Add homepage with hero, Leistungen, Über uns, Kontakt

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 4: Impressum page

**Files:**
- Create: `impressum.html`

**Interfaces:**
- Consumes: CSS classes from Task 1 (`.site-header`, `.nav`, `.legal`, `.site-footer`), same header/footer markup pattern as Task 3's `index.html`.
- Produces: a page reachable at `impressum.html`, linked back to `index.html` via the header logo and footer.

- [ ] **Step 1: Write `impressum.html`**

```html
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Impressum – Ilmvest Verwaltungs GmbH</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/style.css">
</head>
<body>
  <header class="site-header">
    <div class="container">
      <a class="logo" href="index.html">
        <img src="assets/logo.png" alt="Ilmvest Verwaltungs GmbH Logo">
      </a>
      <nav class="nav nav-desktop">
        <ul>
          <li><a href="index.html#leistungen">Leistungen</a></li>
          <li><a href="index.html#ueber-uns">Über uns</a></li>
          <li><a href="index.html#kontakt">Kontakt</a></li>
        </ul>
      </nav>
      <details class="nav-mobile">
        <summary aria-label="Menü öffnen">☰</summary>
        <nav class="nav-mobile-panel">
          <a href="index.html#leistungen">Leistungen</a>
          <a href="index.html#ueber-uns">Über uns</a>
          <a href="index.html#kontakt">Kontakt</a>
        </nav>
      </details>
    </div>
  </header>

  <main class="section legal">
    <div class="container">
      <h1>Impressum</h1>

      <h2>Angaben gemäß § 5 TMG</h2>
      <p>
        Ilmvest Verwaltungs GmbH<br>
        Weimarische Str. 20<br>
        99438 Bad Berka
      </p>

      <h2>Vertreten durch</h2>
      <p>Robert Riethmüller (Geschäftsführer)</p>

      <h2>Kontakt</h2>
      <p>
        E-Mail: <a href="mailto:kontakt@ilmvest.de">kontakt@ilmvest.de</a><br>
        Telefon: <span class="placeholder">[Telefonnummer einfügen]</span>
      </p>

      <h2>Registereintrag</h2>
      <p class="placeholder">[Handelsregister, Registergericht und Registernummer einfügen]</p>

      <h2>Umsatzsteuer-ID</h2>
      <p class="placeholder">[Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz einfügen]</p>

      <h2>Haftung für Inhalte</h2>
      <p>Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.</p>

      <h2>Streitschlichtung</h2>
      <p>Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener">https://ec.europa.eu/consumers/odr/</a>. Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
    </div>
  </main>

  <footer class="site-footer">
    <div class="container">
      <img src="assets/logo.png" alt="Ilmvest Verwaltungs GmbH Logo">
      <nav>
        <a href="index.html">Zur Startseite</a>
      </nav>
      <small>&copy; 2026 Ilmvest Verwaltungs GmbH. Alle Rechte vorbehalten.</small>
    </div>
  </footer>

  <script src="assets/script.js"></script>
</body>
</html>
```

- [ ] **Step 2: Verify in browser**

Open `impressum.html` directly. Confirm:
- Address, Geschäftsführer, and email are correct
- Placeholder fields (Telefon, Handelsregister, USt-IdNr.) are visually distinct (italic, reddish color from `.placeholder`)
- "Zur Startseite" link and header logo both navigate back to `index.html`
- From `index.html`, the footer "Impressum" link navigates here correctly

- [ ] **Step 3: Commit**

```bash
git add impressum.html
git commit -m "Add Impressum page

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 5: Final verification and push

**Files:**
- None created; verification and publish only.

**Interfaces:**
- Consumes: all files from Tasks 1–4.
- Produces: pushed `main` branch on `https://github.com/JustinPriem/Ilmvest.de`.

- [ ] **Step 1: Full manual walkthrough**

Open `index.html` in a browser and click through: nav links, mobile hamburger menu (resize below 768px), CTA button, email link, footer Impressum link. Then from `impressum.html`, verify the back-links. Confirm no broken images (logo shows on both pages) and no console errors on either page.

- [ ] **Step 2: Confirm git status is clean**

```bash
git status
```

Expected: `nothing to commit, working tree clean` (all prior tasks already committed).

- [ ] **Step 3: Push to GitHub**

```bash
git push -u origin main
```

Expected: branch `main` created on `origin` and pushed successfully.

- [ ] **Step 4: Report GitHub Pages activation step to the user**

No command to run — tell the user that to make the site live, they should enable GitHub Pages in the repo settings (Settings → Pages → Source: `main` branch, `/ (root)` folder).
