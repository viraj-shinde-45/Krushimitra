# KrishiMitra AI — Build Plan

This is a very large scope (25+ modules, auth, DB, i18n, admin, charts, animations). To ship something polished rather than a thin shell of 25 half-pages, I'll deliver it in phases. Each phase is a usable milestone you can preview and steer.

## Phase 1 — Foundation & Landing (this turn)
- Design system: earth-tone AgriTech palette (deep forest green, soil, wheat, sky), gradients, glassmorphism tokens, soft shadows, custom typography (display + body pairing, not Inter/Poppins).
- Install: framer-motion, recharts, i18next + react-i18next, react-dropzone.
- Custom hero illustration (generated).
- Landing page: animated hero, features grid, about, stats count-up, testimonials carousel, FAQ accordion, contact, footer — all with framer-motion scroll reveals.
- Top nav with language selector stub.
- Routing scaffold (no auth gate yet).

## Phase 2 — Auth & Database
- Enable Lovable Cloud.
- Schema: users, farmer_profiles, farms, soil_tests, crops, crop_history, disease_reports, weather_history, market_prices, government_schemes, notifications, community_posts, comments + `user_roles` (farmer/expert/admin) with `has_role()` security definer.
- RLS + GRANTs on every table.
- Email/password + Google auth, email verification, forgot/reset password pages.
- `_authenticated/` protected layout.

## Phase 3 — Farmer Dashboard & Profiles
- Sidebar shell (collapsible, mobile drawer, active states).
- Dashboard: Farm Health Score (animated count), weather widget, crop summary, notifications, quick actions, recent activity, upcoming tasks.
- Farmer profile + Farm profile (multi-farm) CRUD forms with floating labels and validation animations.

## Phase 4 — Core Farmer Modules
- Crop Recommendation (form + rules-based mock output).
- Disease Detection (drag-drop upload, preview, mock result card — API-ready interface).
- Weather Dashboard (mock data, forecast cards, alerts).
- Market Intelligence (table + recharts historical chart + mock).
- Government Schemes (cards, eligibility, benefits).
- Crop Lifecycle Timeline.
- Profit Calculator (inputs + ROI charts).

## Phase 5 — Engagement & Settings
- AI Assistant chat UI (AI Elements, no LLM wired yet).
- Community feed + comments + likes (mock + DB tables ready).
- Notification center.
- Settings (language, dark mode, notification prefs, account).
- i18next wired with EN/HI/MR/GU/PA scaffolds (English fully translated, others structural).

## Phase 6 — Admin & Polish
- Admin panel (farmers, reports, crops, schemes, analytics charts).
- Global search.
- Dark mode polish.
- Accessibility pass.

## Technical Notes
- Stack: TanStack Start (existing), Tailwind v4, shadcn, framer-motion, recharts, Lovable Cloud (Supabase).
- All colors via semantic tokens in `src/styles.css` (oklch).
- Mock data layer in `src/lib/mock/` so future API swap is a one-file change.
- Server functions used for any DB read/write; admin operations gated by `has_role('admin')`.

## Question before I start
Confirm: **start with Phase 1 (landing + design system + scaffold) now**, and I'll continue through subsequent phases in follow-up turns? Or would you like a different phase ordering (e.g., auth + dashboard first, landing last)?
