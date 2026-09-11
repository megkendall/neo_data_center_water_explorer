# Starter kit for the NE Ohio water/data center scrollytelling site

Everything in this folder is meant to be dropped into a fresh project
directory before you run `claude` for the first time, so Claude Code
reads `CLAUDE.md` on its very first turn instead of starting from
nothing.

## What's in here

- `CLAUDE.md` — read this first. Project context and the non-negotiable
  analytical guardrails, written for Claude Code to follow automatically
  every session.
- `content/` — the two canonical narrative documents, copied verbatim.
- `data/` — the canonical water-systems and facilities CSVs, plus a new
  `mapped_facilities.json` with real geocoded coordinates for the 8
  facilities that have a documented street address (read its `_notes`
  field — there are two honest caveats in there).
- `components/ScenarioExplorer.jsx` — a working reference port of the
  map + calculator logic we validated in chat. Not styled — the logic
  and the guardrail comments are the point.
- `PROMPTS.md` — a staged sequence of prompts for Claude Code, phase by
  phase, from scaffold to deploy.

## How to use it

1. Install Claude Code if you haven't:
   - macOS/Linux/WSL: `curl -fsSL https://claude.ai/install.sh | bash`
   - Windows: `curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd`
   - Or via npm (any OS with Node.js installed): `npm install -g @anthropic-ai/claude-code`
   - Verify: `claude --version`
2. Create a new empty project folder, copy everything from this starter
   kit into it.
3. `cd` into that folder and run `claude`. Log in when prompted.
4. Open `PROMPTS.md` and work through it phase by phase.

## About Claude Design

Claude Design (in research preview at claude.ai) is a good place to
explore the visual/editorial direction — typography, color, the overall
feel of the scroll — before or alongside coding, since it can hand off
an implementation directly toward Claude Code. Treat it as the place to
settle "what does this look like," and Claude Code as the place to
build "does it actually work, correctly, with real data." Check
claude.ai for current availability, since this is a newer product and
access may still be limited to certain plans.
