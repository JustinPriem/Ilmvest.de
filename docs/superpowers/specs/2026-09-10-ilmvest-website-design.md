# Ilmvest Website — Design Spec

Date: 2026-09-10

## Purpose

A small, modern, static marketing website for Ilmvest Verwaltungs GmbH, an
Immobilienverwaltung (property management company) based in Bad Berka,
Germany. The site introduces the company, lists its two core services, and
provides contact information plus a legally required Impressum page.

## Company Facts

- Name: Ilmvest Verwaltungs GmbH
- Location: Bad Berka
- Address: Weimarische Str. 20, 99438 Bad Berka
- Geschäftsführer: Robert Riethmüller
- Email: kontakt@ilmvest.de
- Phone, Handelsregisternummer, USt-IdNr.: not yet available — rendered as
  clearly marked placeholders in the Impressum for the client to fill in
  later.

## Scope

One-page marketing site (`index.html`) plus a separate Impressum page
(`impressum.html`). No CMS, no backend, no build step — plain HTML/CSS/JS
so it can be served directly via GitHub Pages.

Out of scope (explicitly not building): blog, multi-language support,
contact form with backend processing (mailto link only), CMS/build
tooling, analytics/cookie banners.

## Tech Stack

- Static HTML5 / CSS3 / vanilla JS
- No frameworks, no package manager, no build process
- Google Font "Inter" loaded via `<link>` (system-font fallback stack if
  unavailable)
- Deployable via GitHub Pages from the repository root or `/docs` — repo
  root chosen for simplicity

## File Structure

```
/index.html
/impressum.html
/assets/
  logo.png       (copied from existing Logo.png)
  style.css
  script.js
```

## Visual Design

Derived from the existing logo:
- Primary (dark navy): `#1e2f3f`
- Accent (slate blue): `#5b7288`
- Background: white / very light gray (`#f7f8f9`) for alternating sections
- Typography: "Inter", sans-serif fallback stack
- Generous whitespace, rounded corners on cards/buttons, subtle shadows —
  calm, professional, trustworthy tone (seriös & vertrauenswürdig)
- Fully responsive: mobile-first, flexbox/grid layout, hamburger nav
  under ~768px

## Page: index.html

1. **Header** — logo (left), nav links (Leistungen, Über uns, Kontakt)
   (right), sticky on scroll, collapses to hamburger menu on mobile.
2. **Hero** — headline (e.g. "Verlässliche Immobilienverwaltung in Bad
   Berka und Umgebung"), short supporting subtext, CTA button linking to
   the Kontakt section.
3. **Leistungen** (services) — two cards side by side (stacked on
   mobile):
   - **Mietverwaltung** — short descriptive paragraph
   - **WEG-Verwaltung** — short descriptive paragraph
4. **Über uns** — short, seriös paragraph introducing the company
   (placeholder copy the client can refine later, clearly professional in
   tone, no invented facts/history beyond what's known).
5. **Kontakt** — mailto link to kontakt@ilmvest.de, address line
   (Bad Berka), no functional form.
6. **Footer** — small logo, link to Impressum, copyright line with
   current year.

## Page: impressum.html

Same header/footer shell as index.html. Content per §5 TMG:

- Firma: Ilmvest Verwaltungs GmbH
- Anschrift: Weimarische Str. 20, 99438 Bad Berka
- Vertreten durch: Robert Riethmüller (Geschäftsführer)
- Kontakt: E-Mail kontakt@ilmvest.de, Telefon: `[Telefonnummer einfügen]`
- Registereintrag: `[Handelsregister, Registergericht, Registernummer einfügen]`
- Umsatzsteuer-ID: `[USt-IdNr. einfügen]`
- Standard-Haftungs-/Streitschlichtungshinweise (boilerplate, generic)

Placeholders are visually distinct (e.g. bracketed, italic) so they are
obviously incomplete and easy for the client to find and replace.

## Error Handling / Edge Cases

- No JS-dependent critical functionality — page must be fully readable
  and navigable with JS disabled (nav uses CSS-only fallback or a
  `<details>`-based mobile menu if JS fails).
- Mailto link degrades gracefully in browsers without a configured mail
  client (visible email text alongside the link).
- No form submission, so no validation/error states needed.

## Testing / Verification

Manual verification only (static site, no test framework needed):
- Open in browser at both desktop and mobile widths, check nav/menu
  behavior
- Verify all internal links (nav anchors, footer → Impressum, Impressum →
  back to home)
- Verify mailto link opens correctly
- Run an HTML validator pass (structure sanity check)
- Confirm placeholders in Impressum are visually obvious

## Deployment

Plain static files, pushed to `main` branch of
`https://github.com/JustinPriem/Ilmvest.de`. GitHub Pages can be enabled
by the user afterward (Settings → Pages → deploy from `main` / root) —
not automated as part of this task.
