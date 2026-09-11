# Project narrative v1

> **Status:** Canonical. Superseded all earlier drafts. Subordinate to
> the canonical datasets, frozen scenario methodology, and
> `findings-section-spine.md`. If this narrative conflicts with those
> sources, the underlying data and methodology take precedence.

## Working narrative

*Once upon a time,* Northeast Ohio's water utilities operated in very
different water contexts — Cleveland's interconnected system drawing
from Lake Erie, Akron relying on the Cuyahoga River and a four-reservoir
system, Canton drawing from groundwater. Some serve enormous regional
customer bases; others operate at a much smaller scale.

*One day,* a wave of data center development arrived across the region
— Bitdeer in Shalersville, Aligned near Sandusky, Viking in Akron —
with projects commonly described publicly in megawatts. But when we
looked for the corresponding water numbers, we found a striking gap:
none of the seven facilities in our analytical sample had a complete,
publicly established average or annual water-consumption figure, and
none had a publicly established facility-specific WUE. The power story
was much easier to see than the water story.

*Because of that,* estimating actual water consumption for individual
facilities would create false precision. Instead, we built a
standardized scenario model: what would the same hypothetical data
center load and water intensity look like across very different
Northeast Ohio water-system contexts? Those assumptions are grounded in
external evidence. AWS reported water-use efficiency of 0.06 L/kWh for
its Ohio region in 2025, while Equinix reported 1.55-1.63 L/kWh for its
evaporative-cooled sites. Our standardized scenarios span 0.05 to 1.50
L/kWh to explore that wide range of possible water intensity.

*Because of that,* we can see why local context matters. Bitdeer's
Shalersville project has been described as potentially reaching up to
750 MW at full buildout, while our standardized model independently
includes a 750 MW scenario. At the model's moderate 0.40 L/kWh
assumption, a hypothetical 750 MW load produces 1.90 MGD of modeled
water demand — equivalent to about 48% of the 4 MGD peak treatment
capacity documented for the Shalersville system. That does not mean the
proposed Bitdeer facility would consume 1.90 MGD, nor that the system
has only 2.10 MGD available. It shows the scale that a standardized
demand assumption can take on when placed in a relatively small
water-system context.

*Until finally,* the gap between what's disclosed and what's knowable
becomes part of the finding itself. The result is a reproducible
framework for asking better questions when the next proposal arrives:
How large is the proposed load? How water-intensive could its design
be? Which water system would actually serve it? And how large would
that modeled demand be relative to the documented characteristics of
that system?

## Core narrative thesis

Data center water implications in Northeast Ohio cannot be understood
from a headline megawatt number or regional freshwater abundance alone.
They depend on both the water intensity of the facility design and the
particular water system involved. Yet the public information needed to
make project-specific assessments — including quantitative water use,
WUE, and sometimes even the relevant water-provider relationship — is
frequently not established in the sources reviewed.

## Narrative guardrails

When adapting this story for the README, report, portfolio,
presentations, or interactive explorer:

- Do not present standardized scenarios as estimates or predictions of
  actual facility water consumption.
- Do not apply benchmark WUE values directly to individual Northeast
  Ohio facilities to estimate their water use.
- Keep Bitdeer Shalersville's reported potential 750 MW full-buildout
  scale distinct from the independently defined standardized 750 MW
  scenario.
- Describe the 750 MW x 0.40 L/kWh result as a hypothetical
  standardized scenario producing approximately 1.90 MGD, or about 48%
  of documented Shalersville peak treatment capacity.
- Do not interpret treatment capacity as available capacity, treatment
  headroom, sustainable yield, or a feasibility threshold.
- Do not claim that a modeled percentage above or below a particular
  level means a water system can or cannot serve a data center.
- Do not characterize Northeast Ohio's water systems as uniformly
  abundant or constrained; system contexts differ substantially.
- Do not infer a facility's water provider from geography alone.
- Use "not publicly found" or "not publicly established in the sources
  reviewed" rather than claiming that information does not exist or was
  deliberately withheld.
- Preserve the distinction between observed facility evidence,
  documented water-system characteristics, and hypothetical modeled
  scenarios.
- Treat the project's transparency finding carefully: the analysis
  establishes limitations in publicly available evidence, not the
  reason that information is unavailable.
- Avoid claims about historical utility growth being slow or
  predictable unless separately supported by evidence.
- Use the canonical datasets, source-trace files, frozen methodology,
  and `findings-section-spine.md` to verify quantitative or
  interpretive claims before publication.

## Intended role of the interactive explorer

The explorer should operationalize the narrative rather than estimate
actual facility consumption. It should allow a user to vary standardized
IT capacity and water-intensity assumptions, select an analytical
Northeast Ohio water-system context, and see how the same hypothetical
modeled demand changes in relative significance.

Its central question is:

> What does the same standardized data center water-demand scenario
> look like in different Northeast Ohio water-system contexts?

The explorer should make assumptions and limitations visible so that
users can understand both what the model shows and what additional
project-specific information would be needed to assess an actual
proposal.
