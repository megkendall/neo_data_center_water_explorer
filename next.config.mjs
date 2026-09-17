/** @type {import('next').NextConfig} */
const nextConfig = {
  // CLAUDE.md is this project's canonical, fact-checked source of truth
  // (see CLAUDE.md itself) — don't let `next dev` append tooling notes to it.
  agentRules: false,
};

export default nextConfig;
