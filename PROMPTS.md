# Prompting Claude Code through this build

Run these roughly in order. Let Claude Code finish and verify each one
before moving to the next — resist the urge to paste the whole plan in
as one giant prompt. One beat at a time is genuinely faster in
practice, not just safer.

## Phase 0 — scaffold

```
Set up a new Next.js app in this directory, using the App Router and
plain CSS (no Tailwind yet — I'll decide on styling after I see the
content laid out). Read CLAUDE.md first and confirm you understand the
guardrails before writing any code. Set up a GitHub repo and get it
ready to connect to Vercel, but don't deploy yet.
```

## Phase 1 — the five beats, text only

```
Build five full-viewport sections, one per Story Spine beat, using the
exact text from /content/story-spine.md's "Working narrative" section.
No visuals yet — just get the copy on the page in reading order, one
beat per section, with placeholder gray boxes where visuals will go
later. Cite which beat is which in an HTML comment above each section.
```

## Phase 2 — the scroll mechanism

```
Add a sticky visual panel alongside the scrolling text — text scrolls
on one side, a fixed-position visual area holds its place on the
other, switching content as each beat's section crosses the center of
the viewport. Use IntersectionObserver, not a scroll-hijacking library.
For now the visual panel can just show the current beat's number so I
can confirm the trigger points feel right before we build real visuals.
```

## Phase 3 — the first four visuals

```
For beats 1 through 4, build the visual that goes in the sticky panel:
  Beat 1 (Once upon a time): a simple static list or diagram of the
    seven water systems and their source types — pull from
    /data/water_systems_master.csv.
  Beat 2 (One day): a small table showing the seven analytical
    facilities and whether average/annual water use was publicly
    found — pull from /data/facilities_master_v1_FINAL.csv.
  Beat 3 (Because of that — benchmarks): a simple bar or line showing
    the four standardized water-intensity tiers (0.05, 0.20, 0.40,
    1.50 L/kWh) with the AWS and Equinix real benchmark values marked
    for comparison.
  Beat 4 (Because of that — Shalersville): a focused view of the
    Shalersville 750 MW / 0.40 L/kWh result relative to its 4 MGD
    documented peak treatment capacity.
Keep each one simple — a single clear visual per beat, not a dashboard.
```

## Phase 4 — the explorer (beat 5, the payoff)

```
Port the logic in /components/ScenarioExplorer.jsx into a real,
styled component for this site. Keep every guardrail comment in that
file intact and follow them exactly — especially the rule that only
Shalersville gets an auto-selected water system, and that selecting a
facility shows the nearest standardized tier, not its real capacity.
Build the map using the coordinates and projection formula in
/data/mapped_facilities.json — read the _notes field in that file
before using it, there are two known caveats to handle honestly in the
UI or in a visible caption.
This is the final beat and the payoff of the whole scroll — give it
more visual weight and space than the earlier beats.
```

## Phase 5 — polish

```
Go through the whole page on mobile width and make sure the sticky
panel behavior degrades sensibly (it's fine if it stops being sticky
below some breakpoint and the visuals just appear inline between text
blocks instead). Check color contrast, add alt text or aria-labels
where needed, and confirm every "Not applicable" / "not publicly
disclosed" state actually renders instead of a blank.
```

## Phase 6 — deploy

```
Deploy this to Vercel. Confirm the production URL loads and the
explorer's calculations match /content and /data before calling this
done.
```

## If Claude Code drifts from a guardrail

Point it back at CLAUDE.md directly rather than re-explaining the rule
yourself:

```
Re-read the guardrails in CLAUDE.md — the [X] you just built violates
the rule about [Y]. Fix it so it matches that rule exactly.
```
