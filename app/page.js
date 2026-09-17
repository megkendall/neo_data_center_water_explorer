"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import {
  WaterSystemsVisual,
  FacilitiesVisual,
  BenchmarkVisual,
  ShalersvilleVisual,
} from "./beat-visuals";
import ScenarioExplorer from "./scenario-explorer";

const BEAT_VISUALS = {
  1: WaterSystemsVisual,
  2: FacilitiesVisual,
  3: BenchmarkVisual,
  4: ShalersvilleVisual,
};

export default function Home() {
  const [activeBeat, setActiveBeat] = useState(1);

  useEffect(() => {
    const sections = document.querySelectorAll("[data-beat]");

    // rootMargin shrinks the observed viewport to a zero-height line at
    // its vertical center, so a section is "intersecting" exactly when
    // it's crossing the center of the viewport — not merely visible.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveBeat(Number(entry.target.dataset.beat));
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const ActiveVisual = BEAT_VISUALS[activeBeat];

  return (
    <main>
      {/* Beats 1-4: sticky-panel scroll grid */}
      <div className={styles.layout}>
        <div className={styles.textColumn}>
          {/* Beat 1: "Once upon a time" — Northeast Ohio's differing water contexts */}
          <section className={styles.beat} id="beat-1" data-beat="1">
            <div className={styles.beatText}>
              <p>
                <em>Once upon a time,</em> Northeast Ohio&rsquo;s water
                utilities operated in very different water contexts —
                Cleveland&rsquo;s interconnected system drawing from Lake
                Erie, Akron relying on the Cuyahoga River and a
                four-reservoir system, Canton drawing from groundwater. Some
                serve enormous regional customer bases; others operate at a
                much smaller scale.
              </p>
            </div>
            {/* Below the sticky-panel breakpoint, each beat's visual
                appears inline here instead of in the shared side panel. */}
            <div className={styles.inlineVisual}>
              <WaterSystemsVisual />
            </div>
          </section>

          {/* Beat 2: "One day" — the power/water disclosure gap across facilities */}
          <section className={styles.beat} id="beat-2" data-beat="2">
            <div className={styles.beatText}>
              <p>
                <em>One day,</em> a wave of data center development arrived
                across the region — Bitdeer in Shalersville, Aligned near
                Sandusky, Viking in Akron — with projects commonly described
                publicly in megawatts. But when we looked for the
                corresponding water numbers, we found a striking gap: none of
                the seven facilities in our analytical sample had a
                complete, publicly established average or annual
                water-consumption figure, and none had a publicly
                established facility-specific WUE. The power story was much
                easier to see than the water story.
              </p>
            </div>
            <div className={styles.inlineVisual}>
              <FacilitiesVisual />
            </div>
          </section>

          {/* Beat 3: "Because of that" (benchmarks) — why a standardized scenario model, grounded in AWS/Equinix WUE */}
          <section className={styles.beat} id="beat-3" data-beat="3">
            <div className={styles.beatText}>
              <p>
                <em>Because of that,</em> estimating actual water
                consumption for individual facilities would create false
                precision. Instead, we built a standardized scenario model:
                what would the same hypothetical data center load and water
                intensity look like across very different Northeast Ohio
                water-system contexts? Those assumptions are grounded in
                external evidence. AWS reported water-use efficiency of 0.06
                L/kWh for its Ohio region in 2025, while Equinix reported
                1.55-1.63 L/kWh for its evaporative-cooled sites. Our
                standardized scenarios span 0.05 to 1.50 L/kWh to explore
                that wide range of possible water intensity.
              </p>
            </div>
            <div className={styles.inlineVisual}>
              <BenchmarkVisual />
            </div>
          </section>

          {/* Beat 4: "Because of that" (Shalersville) — the 750 MW / 0.40 L/kWh scenario against Shalersville's 4 MGD peak treatment capacity */}
          <section className={styles.beat} id="beat-4" data-beat="4">
            <div className={styles.beatText}>
              <p>
                <em>Because of that,</em> we can see why local context
                matters. Bitdeer&rsquo;s Shalersville project has been
                described as potentially reaching up to 750 MW at full
                buildout, while our standardized model independently
                includes a 750 MW scenario. At the model&rsquo;s moderate
                0.40 L/kWh assumption, a hypothetical 750 MW load produces
                1.90 MGD of modeled water demand — equivalent to about 48%
                of the 4 MGD peak treatment capacity documented for the
                Shalersville system. That does not mean the proposed
                Bitdeer facility would consume 1.90 MGD, nor that the
                system has only 2.10 MGD available. It shows the scale that
                a standardized demand assumption can take on when placed in
                a relatively small water-system context.
              </p>
            </div>
            <div className={styles.inlineVisual}>
              <ShalersvilleVisual />
            </div>
          </section>
        </div>

        <div className={styles.visualColumn}>
          <div className={styles.stickyPanel} aria-live="polite">
            {ActiveVisual && <ActiveVisual />}
          </div>
        </div>
      </div>

      {/* Beat 5: "Until finally" — the disclosure gap as the finding, framed
          as the explorer's reproducible question set. Full-width finale,
          not part of the scrolling sticky-panel grid above — this is the
          payoff and gets its own space. */}
      <section className={styles.finale} id="beat-5" data-beat="5">
        <div className={styles.finaleIntro}>
          <p>
            <em>Until finally,</em> the gap between what&rsquo;s disclosed
            and what&rsquo;s knowable becomes part of the finding itself.
            The result is a reproducible framework for asking better
            questions when the next proposal arrives: How large is the
            proposed load? How water-intensive could its design be? Which
            water system would actually serve it? And how large would that
            modeled demand be relative to the documented characteristics of
            that system?
          </p>
        </div>
        <ScenarioExplorer />
      </section>

      {/* Closing explanatory sections -- not part of the Story Spine scroll
          narrative above, so styled distinctly: normal document flow (no
          min-height: 100vh, no sticky panel, no data-beat), a plain
          background, and real headings. */}
      <section className={styles.closing} aria-labelledby="analysis-heading">
        <div className={styles.closingInner}>
          <h2 id="analysis-heading" className={styles.closingHeading}>
            How the analysis works
          </h2>
          <p className={styles.closingText}>
            The public data weren&rsquo;t good enough to estimate how much
            water individual Northeast Ohio data centers actually use.
            Rather than fill those gaps with industry averages, I built a
            standardized comparison.
          </p>
          <p className={styles.closingText}>
            First, I researched data center projects across Northeast Ohio,
            documenting what could be established about their scale,
            cooling systems, water use, water efficiency, and water
            providers. I then researched seven relevant water-system
            contexts, documenting characteristics such as water source,
            average daily use, and treatment capacity.
          </p>
          <p className={styles.closingText}>
            Next, I built a separate dataset of real-world data center
            water-intensity benchmarks. That evidence informed four
            standardized water-intensity assumptions, which I combined with
            four standardized data center sizes to create 16 hypothetical
            scenarios.
          </p>
          <p className={styles.closingText}>
            I then applied those same scenarios across the water-system
            cases. This effectively creates a controlled comparison: hold
            the hypothetical data center constant and change the
            water-system context, or hold its size constant and change its
            water intensity. That lets us separate two questions: what
            determines modeled water demand? and what determines how
            significant that demand looks in a particular water system?
          </p>
          <p className={styles.closingText}>
            The model does not predict how much water any proposed data
            center will actually use, and treatment capacity does not
            represent spare or available capacity. Instead, the analysis
            provides a consistent way to understand relative scale while
            making the limits of the available evidence explicit.
          </p>
        </div>
      </section>

      <section className={styles.closing} aria-labelledby="built-heading">
        <div className={styles.closingInner}>
          <h2 id="built-heading" className={styles.closingHeading}>
            How I built this
          </h2>
          <p className={styles.closingText}>
            I built this project as both a water-infrastructure analysis
            and an experiment in rigorous, AI-assisted analysis and
            building. I developed a documented methodology and evidence
            architecture that keeps source research, cleaned data,
            assumptions, and modeled results distinct, preserving missing
            information. I then used a reproducible Python notebook to
            clean, validate, model, and visualize the data, and a
            story-spine framework to translate the analysis into a clear
            narrative without outrunning the evidence.
          </p>
          <p className={styles.closingText}>
            Data center development in Northeast Ohio is a live, evolving
            issue, where proposals, infrastructure plans, public
            disclosures, and community concerns do not arrive as a neat
            analytical dataset. The project required turning fragmented
            real-world evidence into something structured enough to
            analyze, while retaining the uncertainty and qualifications
            needed to communicate the results responsibly.
          </p>
          <p className={styles.closingText}>
            AI was deliberately embedded throughout the process: helping
            structure research, interrogate sources, design and audit
            datasets, develop and debug Python analysis, challenge
            assumptions, and test interpretations. Rather than treating AI
            output as evidence, I kept the underlying sources and canonical
            datasets as the source of truth and repeatedly checked the work
            for accuracy, consistency, completeness, and validity.
          </p>
          <p className={styles.closingText}>
            The full analysis — including the working notebook and source
            data — is available in the{" "}
            <a href="https://github.com/megkendall/neo_data_center_water_analysis">
              analysis repository
            </a>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
