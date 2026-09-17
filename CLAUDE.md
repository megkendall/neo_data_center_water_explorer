# Northeast Ohio data center water demand — scrollytelling site

## What this project is

A public, Vercel-hosted scrollytelling site that walks a reader through
a Story Spine narrative about data center water demand in Northeast
Ohio, ending on an interactive scenario explorer (map + calculator).

## Source of truth, in priority order

1. `/content/story-spine.md` — the finalized narrative. Use this text
   almost verbatim for the scrollytelling copy. Do not rewrite, embellish,
   or "improve" the wording without being asked — it has already been
   fact-checked against the data, sentence by sentence.
2. `/content/findings-section-spine.md` — the findings write-up, same
   status as above.
3. `/data/water_systems_master.csv` — the seven canonical water-system
   cases. Only source for average daily use / treatment capacity numbers.
4. `/data/facilities_master_v1_FINAL.csv` — the 21 canonical facilities.
5. `/data/mapped_facilities.json` — the 8 facilities with real geocoded
   coordinates (see caveats in that file's `_notes` field before using).
6. `/components/ScenarioExplorer.jsx` — a working reference implementation
   of the calculator + map interaction logic. Port its *logic* faithfully;
   restyle freely to match the site's design.

Never invent a number, date, or quote that isn't in one of these files.
If something is missing, say so in the UI rather than filling the gap.

## Non-negotiable analytical guardrails

These rules govern all copy, UI labels, and interaction design on this
site. They are not style preferences — violating them misrepresents the
underlying analysis.

- Always call scenario-model output "modeled water demand." Never call it
  "water use," "consumption," or "demand" alone.
- Never present a standardized scenario (50/150/300/750 MW ×
  0.05/0.20/0.40/1.50 L/kWh) as an estimate of any specific facility's
  actual water use. This applies to UI copy and to any interaction that
  lets a user select a real facility.
- If a UI element lets a user pick a real facility (e.g. the map), and
  that facility's real capacity doesn't match a standardized tier exactly,
  say so explicitly next to the result ("nearest standardized tier used,
  not this facility's real capacity").
- Only draw a connection between a specific facility and a specific water
  system where `water_provider_availability` in the facilities data is
  `reported_site_provider`. Currently that's only Bitdeer Shalersville →
  Portage County Water Resources. Never infer a provider from geography
  or county alone, in text or in map design (no auto-drawn lines, no
  auto-selected system for any other facility).
- Never convert a missing value (blank capacity, blank average use, "not
  applicable" treatment capacity) to zero or to a blank UI state that
  reads as zero. Always render it as "not applicable" or "not publicly
  disclosed," explicitly.
- Never interpret a percentage of treatment capacity as available
  capacity, headroom, sustainable yield, or a feasibility judgment. Don't
  let two true UI facts sit next to each other in a way that implies a
  feasibility conclusion neither one states.
- Use "not publicly found" / "not publicly established in the sources
  reviewed," never "withheld" or "hidden."
- Bitdeer's real, developer-disclosed 750 MW full-buildout figure and the
  scenario model's independent 750 MW tier are two different things that
  happen to share a number. Keep them visually and textually distinct
  wherever both appear (e.g. facility detail view vs. the capacity
  selector).

## Tech and build approach

- Next.js, deployed to Vercel.
- Scrollytelling mechanism: `position: sticky` visual panel + a plain
  `IntersectionObserver` swapping the visual at each Story Spine beat.
  Do not reach for a scroll-hijacking library (Scrollama, GSAP
  ScrollTrigger) unless asked — added complexity, not needed for five
  discrete beats.
- The final beat ("Until finally") is the live explorer in
  `/components/ScenarioExplorer.jsx` — build every earlier beat first,
  since the explorer depends on nothing else in the site.

## Working style

- Build and verify one Story Spine beat at a time. Don't scaffold the
  whole site in one pass.
- After any change to copy or numbers, check it against `/content` and
  `/data` before considering the task done.
