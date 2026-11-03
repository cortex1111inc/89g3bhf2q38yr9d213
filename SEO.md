# SEO, AEO & GEO: what is implemented and how to maintain it

AEO = Answer Engine Optimization (featured snippets, voice, "People also ask").
GEO = Generative Engine Optimization (being cited by ChatGPT, Claude, Perplexity, Gemini, Copilot).

## Single sources of truth (edit these, everything else follows)
| File | Drives |
|---|---|
| `lib/people.ts` | Founder names and titles: About page, Person schema, llms.txt, FAQs, chatbot |
| `lib/site.ts` | Company facts, social links, `LAST_UPDATED`, entity `@id`s |
| `lib/services.ts`, `lib/work.ts`, `lib/landing.ts`, `lib/content.ts` | Pages, sitemap, schema, llms.txt, llms-full.txt, FAQs |
| `lib/seo.ts` | Canonical, hreflang, Open Graph, Twitter, robots meta for every page |
| `lib/schema.ts` | All JSON-LD builders |

**When content changes, bump `LAST_UPDATED` in `lib/site.ts`** (sitemap `lastmod`, schema `dateModified`, visible "Last updated").

## Technical SEO
- Per-page unique title, description, canonical, `hreflang` (en-IN + x-default); no global canonical.
- Branded PNG share images (1200x630) generated per page type (`app/opengraph-image.tsx`, `twitter-image.tsx`, service and work detail cards).
- `sitemap.xml` (stable `lastmod`), `robots.txt` (does not block `/_next/`), RSS `feed.xml`.
- 308 redirects from every legacy URL (`next.config.ts`), custom 404, `noindex` on `/offline`.
- Security headers, immutable cache for `/img/*`, AVIF/WebP, `lang="en-IN"`, skip link, landmarks, one `<h1>` per page, breadcrumbs.
- Optional verification tags via `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` / `NEXT_PUBLIC_BING_SITE_VERIFICATION`.

## Structured data (one connected graph via stable `@id`s)
Organization + ProfessionalService (with `founder`, `hasOfferCatalog`, `sameAs`, `knowsAbout`, `areaServed`), WebSite, 4x Person (Akshay Krishna: CEO; Adithyan Dileep: Founding Director and COO; Vyshnav M; Sreehari S), WebPage / AboutPage / ContactPage / CollectionPage with `speakable`, BreadcrumbList on every inner page, Service per service page, SoftwareApplication (HMS), CreativeWork (solutions), HowTo (process), BlogPosting + Blog (insights), FAQPage (one per page), ItemList (services, work), geo-scoped Service on landing pages.

## AEO (answer engines)
- Answer-first "What is...?" box (`AnswerBox`) near the top of home, About, every service, work and landing page: a direct, self-contained, quotable answer, marked `speakable`.
- Entity FAQs: who founded Vanspire, who is CEO / COO, where it is based, freelancer vs company, international clients, languages, pricing approach.
- "Vanspire at a glance" fact sheet (`FactSheet`) on home and About, consistent with the schema.
- Insight articles open with "In short" + key takeaways.

## GEO (generative engines)
- `robots.txt` explicitly allows GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, PerplexityBot, Google-Extended, Applebot-Extended, Amazonbot, DuckAssistBot, CCBot and others.
- `/llms.txt` (llmstxt.org format) and `/llms-full.txt` (all substantive content as markdown) are generated from the same data as the site, so they never go stale.
- Consistent entity naming ("Vanspire Innovations" / "Vanspire"), founders with titles and LinkedIn `sameAs`, visible freshness dates.
- IndexNow script for instant discovery by Bing-powered assistants.

## Verify
```bash
npm run build && npm start            # terminal 1
npm run seo:audit                     # terminal 2 (defaults to http://localhost:3000)
SEO_AUDIT_FORBIDDEN="term1,term2" node scripts/seo-audit.mjs http://localhost:3000   # fail if a term appears anywhere
```
Checks titles, descriptions, canonicals, OG/Twitter, headings, alt text, JSON-LD validity, duplicate FAQ schema, broken internal links, robots/llms/feed/manifest. Also validate key pages in Google's Rich Results Test and validator.schema.org after deploy.

## Things code cannot do (do these off-site)
1. Verify the domain in **Google Search Console** and **Bing Webmaster Tools**; submit `sitemap.xml`; request indexing for new URLs (`needed-reindexing.md`).
2. Create a **Google Business Profile** and add a full street address (then add `address.streetAddress` and `geo` to `organizationNode` in `lib/schema.ts` and the footer).
3. Keep **LinkedIn, Instagram, X, YouTube, Facebook** bios identical to the site wording and make the founders' LinkedIn headlines match their titles here (CEO; Founding Director and COO).
4. Get listed on credible directories (Clutch, GoodFirms, Crunchbase, relevant Kerala/India business directories) with the same name and description. Third-party mentions are the strongest GEO signal.
5. Replace the solution playbooks in `lib/work.ts` with real case studies and add genuine client reviews (then add `Review` schema; never add ratings you cannot substantiate).
6. Publish new articles regularly; add them to `INSIGHTS` in `lib/content.ts` (they flow into sitemap, RSS, llms.txt and schema).
7. Set up IndexNow (see `scripts/indexnow.mjs`).
