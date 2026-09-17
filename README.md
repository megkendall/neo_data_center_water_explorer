# Northeast Ohio Data Center Water Demand

A scrollytelling site exploring what's actually known — and not known —
about data center water demand in Northeast Ohio, ending on an
interactive scenario explorer.

**[Live site](#)** _(link to come after deployment)_

## What this is

Public data on individual data center water use in Northeast Ohio is
thin: none of seven analytical facility cases have a complete, publicly
established average or annual water-consumption figure. Rather than
paper over that gap with industry-average guesses, this project builds a
standardized comparison instead — four data center size tiers (50–750
MW) crossed with four water-intensity assumptions (0.05–1.50 L/kWh,
grounded in real AWS and Equinix disclosures) produce 16 hypothetical
scenarios, which can then be examined against seven real Northeast Ohio
water-system contexts (Cleveland, Akron, Canton, and others).

The site walks through that argument as a five-beat Story Spine
narrative, then hands it to the reader directly: a real map (Leaflet +
OpenStreetMap) of the region's data center facilities, paired with a
calculator that runs the same standardized scenarios against whichever
water system you pick.

The site's own closing sections, **How the analysis works** and **How I
built this**, cover the methodology and process in more depth than this
README does — that's the canonical explanation, written for readers of
the site itself.

## Source data and methodology

- [`content/story-spine.md`](content/story-spine.md) — the narrative
  copy used verbatim on the site, plus the analytical guardrails it's
  built on.
- [`content/findings-section-spine.md`](content/findings-section-spine.md) —
  the underlying findings write-up.
- [`data/water_systems_master.csv`](data/water_systems_master.csv) — the
  seven water-system cases.
- [`data/facilities_master_v1_FINAL.csv`](data/facilities_master_v1_FINAL.csv) —
  the 21 canonical facilities.
- [`data/mapped_facilities.json`](data/mapped_facilities.json) — real
  geocoded coordinates for the 8 facilities with a documented street
  address (see its `_notes` field for known caveats).
- [`CLAUDE.md`](CLAUDE.md) — the full source-of-truth hierarchy and
  non-negotiable analytical guardrails this project (and its AI-assisted
  build process) was held to throughout.

## Tech stack

- [Next.js](https://nextjs.org/) (App Router), plain CSS — no styling
  framework
- [react-leaflet](https://react-leaflet.js.org/) + OpenStreetMap for the
  interactive map
- Deployed on [Vercel](https://vercel.com/)

## Running locally

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).
