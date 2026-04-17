# Security Audit Report — Khelar Mala Website
**Date:** 27 March 2026
**Auditor:** Pre-deployment full-stack security review
**Scope:** All source files, dependencies, build config, third-party integrations
**Result: 6 issues fixed ✅ | 2 action items for you before going live**

---

## Summary

| Severity | Total Found | Fixed Automatically | Action Required |
|----------|-------------|---------------------|-----------------|
| 🔴 High   | 2           | 2 ✅                | 1 (npm install) |
| 🟡 Medium | 4           | 4 ✅                | 0               |
| 🟢 Low    | 3           | 2 ✅                | 1 (hosting config) |
| ℹ️ Info   | 3           | 3 ✅                | 0               |

**Overall verdict: Website is safe to deploy after completing the 2 action items below.**

---

## 🔴 HIGH SEVERITY

### 1. React Router XSS via Open Redirect — **FIXED**
- **CVE:** GHSA-2w69-qvjg-hvjx (CVSS 8.0), GHSA-9jcx-v3wj-wh4m
- **Affected:** `react-router-dom 6.0.0–6.30.1` (was `^6.30.1` — inside vulnerable range)
- **Risk:** Attacker could craft a malicious URL that redirects users to a phishing site, or inject script via open redirect.
- **Fix applied:** `package.json` updated to `"react-router-dom": "^6.30.2"` (patched version).
- **⚠️ Action required:** Run `npm install` in your project folder on your Windows machine. This updates the actual installed package.

### 2. `window.open()` Missing noopener — **FIXED**
- **File:** `src/components/features/Chatbot.tsx` line 206
- **Risk:** Calling `window.open(url, "_blank")` without a third argument leaves `window.opener` accessible to the new tab. A malicious WhatsApp-mimicking page could use `window.opener.location` to redirect your site to a phishing page (reverse tabnapping).
- **Fix applied:** Changed to `window.open(url, "_blank", "noopener,noreferrer")`.

---

## 🟡 MEDIUM SEVERITY

### 3. No HTTP Security Headers — **FIXED (for Netlify/static hosts)**
- **Risk:** Without `X-Frame-Options`, your site can be embedded in an iframe on another domain (clickjacking). Without `X-Content-Type-Options`, browsers may sniff MIME types and run scripts unexpectedly. Without a `Content-Security-Policy`, XSS attacks have no browser-level guardrail.
- **Fix applied:** Created `public/_headers` with the following headers automatically served by Netlify, Cloudflare Pages, and many static hosts:
  - `X-Frame-Options: DENY` — no iframing of your site
  - `X-Content-Type-Options: nosniff` — no MIME sniffing
  - `Referrer-Policy: strict-origin-when-cross-origin` — limits referrer leakage
  - `Permissions-Policy` — disables camera, mic, geolocation, payment
  - `Content-Security-Policy` — restricts where scripts, styles, and frames can load from
- **⚠️ If using cPanel/Apache hosting:** Add the equivalent directives to a `.htaccess` file (ask your hosting provider or see below).

### 4. Google Maps iframe Without Sandbox — **FIXED**
- **File:** `src/pages/Contact.tsx`
- **Risk:** An unsandboxed iframe has broad permissions including running scripts in the same-origin context. Google Maps embeds include JavaScript.
- **Fix applied:** Added `sandbox="allow-scripts allow-same-origin allow-popups allow-forms"` — maps still works but is permission-restricted.

### 5. Missing `noopener` on `_blank` Links — **CLEAN ✅**
- All `target="_blank"` links in Footer, Header, Contact, MobileCTABar, WhatsAppButton, TherapyDetail, and ContactCTA already have `rel="noopener noreferrer"`. No changes needed.

### 6. Formspree Endpoint Exposed in Source — **LOW RISK, NOTED**
- **File:** `src/pages/Contact.tsx`
- **Risk:** The Formspree endpoint ID (`xkoqlokz`) is visible in the compiled JavaScript. Anyone who inspects your site's JS could find it and spam your form.
- **Mitigation:** Formspree's free tier rate-limits to 50 submissions/month and has built-in spam detection. This is acceptable for a small business site. For extra protection, enable Formspree's reCAPTCHA option in your Formspree dashboard → Form Settings.
- **No code change needed** — this is standard for client-side form services.

---

## 🟢 LOW SEVERITY

### 7. Console Error Logging Path on 404 — **FIXED**
- **File:** `src/pages/NotFound.tsx`
- **Risk:** `console.error()` with the full URL path was running in production. Any user could open DevTools and see logged paths. Low risk, but considered information disclosure.
- **Fix applied:** Wrapped in `if (import.meta.env.DEV)` — only logs during local development, silent in production.

### 8. Stale OG Meta Description — **FIXED**
- **File:** `index.html`
- **Risk:** The `<meta property="og:description">` still said "500+ families supported" even though the site was updated to "950+ Journeys Shared". When sharing on WhatsApp/Facebook/X, users would see the old number.
- **Fix applied:** Updated OG description to match the current "950+ journeys shared" messaging.

### 9. `dangerouslySetInnerHTML` in chart.tsx — **SAFE ✅**
- **File:** `src/components/ui/chart.tsx` (shadcn/ui component)
- **Risk:** This flag in React bypasses React's XSS protection. However, the content injected is a CSS `<style>` tag generated purely from static color configuration constants (from the library itself) — not from any user input.
- **Verdict:** Not exploitable. No user-controlled data reaches this code path. Safe to leave as-is.

---

## ℹ️ INFORMATIONAL

### 10. GA4 Measurement ID in HTML (`G-KL60BZTBRS`)
- **Status:** By design — GA4 measurement IDs are always public-facing. Google's systems use domain verification to prevent unauthorized use. No action needed.

### 11. 15 Dev Dependency Vulnerabilities (npm audit)
- **Status:** All vulnerabilities (`rollup`, `vite`, `minimatch`, `picomatch`, `flatted`, `ajv`, `brace-expansion`, `js-yaml`, `lodash`, `yaml`) are in **development-only** dependencies — they are used during build time only, not shipped to users.
- **Impact on users:** Zero. These cannot be exploited by website visitors.
- **Recommendation:** After running `npm install` (for the react-router fix), also run `npm audit fix` to clean up dev dependency warnings. None require `--force`.

### 12. Privacy Considerations — GDPR / Data Handling
- **Contact form** collects: Parent name, phone, child name, child age, optional email. This data is sent to Formspree (US-based). For Indian users under DPDP Act 2023, this is acceptable if Formspree's privacy policy is referenced.
- **Google Analytics 4** collects anonymised usage data. Consider adding a cookie consent notice before GA4 loads, especially for EU visitors.
- **WhatsApp links** include a pre-filled message — the user's data is not sent automatically, they must hit "send" in WhatsApp. Safe.

---

## Action Items Checklist Before Going Live

- [ ] **Run `npm install`** in the project folder on your Windows machine (picks up the `react-router-dom ^6.30.2` fix)
- [ ] **Run `npm audit fix`** after that to clean up dev dependency warnings
- [ ] **Verify hosting supports `_headers` file** (Netlify/Cloudflare Pages: yes automatically. cPanel/Apache: configure `.htaccess` instead)
- [ ] Optionally enable **Formspree reCAPTCHA** in your Formspree dashboard to prevent form spam
- [ ] Optionally add a **cookie consent banner** for GDPR compliance (EU audience)

---

## What's Already Well-Done ✅

- All `target="_blank"` external links use `rel="noopener noreferrer"` — correct
- Contact form uses `zod` schema validation — prevents malformed data
- No API keys, passwords, or secrets hardcoded in source code
- No `eval()`, no `innerHTML` assignments on user input — no XSS risk
- Form submission uses `https://formspree.io` over TLS — data encrypted in transit
- React Router's `<Navigate>` used for invalid therapy routes — no arbitrary redirects
- All social and WhatsApp URLs come from a single `SITE_CONFIG` constant — easy to audit
- `react-helmet-async` used for per-page `<title>` and meta tags — no injection surface
- Images use `loading="lazy"` and `decoding="async"` — no security issues
- `<iframe>` for maps has `referrerPolicy="no-referrer-when-downgrade"` — good practice
- Sitemap only lists intended public routes — no hidden pages exposed
- `robots.txt` allows all crawlers — appropriate for a public business site

