/**
 * Single source of truth for work history.
 *
 * Consumed by the homepage Experience section, /resume, and the printed PDF.
 * Edit here only — git history shows three separate "sync resume" commits from
 * the era when this lived in hand-maintained HTML in two places at once.
 */

export interface SubRole {
  role: string
  period: string
  bullets: string[]
}

export interface Role {
  company: string
  /** Omitted for entries whose sub-roles carry the titles (e.g. Redwood). */
  role?: string
  period: string
  location?: string
  url?: string
  /** Short parenthetical shown next to the company, e.g. "first engineering hire". */
  note?: string
  bullets?: string[]
  subRoles?: SubRole[]
  tags: string[]
}

export const experience: Role[] = [
  {
    company: 'Inflight',
    role: 'Software Engineer',
    note: 'first engineering hire',
    period: 'Jun 2025 — Present',
    location: 'Remote',
    bullets: [
      'Built an offline LLM evaluation harness using LLM-as-judge across five quality dimensions; drove seven tuning iterations over a 36-PR, 33-repo corpus, lifting design guides 4.06 → 4.61 and code guides 4.22 → 4.55.',
      'Instrumented LLM analytics across the Claude proxy and guide agents — multi-turn traces plus a per-user token ledger with effective-dated pricing and org-level spend attribution.',
      'Shipped an AI workspace assistant with tool calling, streaming, and hybrid vector + keyword retrieval behind a feature-flagged rollout.',
      'Built agent-driven visual PR review on playwright-mcp with agentic preview spin-up across six language ecosystems; published the company Claude Code plugin and MCP server.',
      'Sole engineer alongside the CTO across a TypeScript/Hono/Bun API, a React web app, and a SwiftUI macOS client.',
    ],
    tags: [
      'TypeScript',
      'Hono',
      'Bun',
      'React',
      'SwiftUI',
      'Anthropic API',
      'MCP',
      'RAG',
      'PostHog',
    ],
  },
  {
    company: 'YCU',
    role: 'Lead Engineer',
    note: 'profit-share partnership',
    period: 'Jan 2026 — Present',
    url: 'https://ycu.app',
    bullets: [
      'Sole engineer on a live consumer app: Expo/React Native for iOS and Android plus Next.js 16, on a Turborepo/pnpm monorepo backed by Supabase.',
      'Built LLM safety classification for user-generated content — group chat, video and challenge comments — with an admin moderation queue.',
      'Implemented dual billing across Stripe and Apple IAP with trials, entitlements, and partner codes.',
      'Owned Apple App Review compliance across 50+ releases; live on the App Store.',
    ],
    tags: [
      'React Native',
      'Expo',
      'Next.js',
      'Supabase',
      'Stripe',
      'Apple IAP',
      'Turborepo',
    ],
  },
  {
    company: 'Figure',
    role: 'Staff Software Engineer, Manufacturing Test',
    period: 'Feb 2025 — Jun 2025',
    location: 'San Jose, CA',
    bullets: [
      'Built the base manufacturing test framework for humanoid robot production.',
      'Automated actuator end-of-line testing.',
      'Modeled capacity and resource planning across production lines.',
    ],
    tags: ['Python', 'Test automation', 'Robotics', 'Manufacturing'],
  },
  {
    company: 'Redwood Materials',
    period: 'Jul 2022 — Feb 2025',
    location: 'Reno, NV',
    subRoles: [
      {
        role: 'Software Engineering Manager',
        period: 'Aug 2024 — Feb 2025',
        bullets: [
          'Led the controls architecture team; set engineering standards and tooling.',
          'Drove the control system rollout for a cathode active material plant.',
        ],
      },
      {
        role: 'Staff Software Engineer',
        period: 'Nov 2023 — Aug 2024',
        bullets: [
          'Built advanced process control for non-linear dynamic variables.',
          'Led sensing hardware and software integration.',
        ],
      },
      {
        role: 'Sr. Software Engineer',
        period: 'Jul 2022 — Dec 2023',
        bullets: [
          'Built proprietary inline vision for real-time quality inspection on a live production line.',
          'Developed metrology for copper foil equipment.',
          'Optimized recycling sorter software.',
        ],
      },
    ],
    tags: ['C++', 'Python', 'Computer vision', 'Process control', 'Metrology', 'EtherCAT'],
  },
  {
    company: 'Tesla',
    role: 'Sr. Software Engineer',
    period: 'Mar 2021 — Jun 2022',
    location: 'Reno, NV',
    bullets: [
      'Built high-voltage controller functional testers for vehicle production lines, improving cycle time, robustness and coverage.',
      'Owned system architecture and test specifications across multiple vehicle test platforms.',
      'Served as scrum master for a five-person cross-functional team.',
    ],
    tags: ['Python', 'Test systems', 'CAN', 'Manufacturing'],
  },
  {
    company: 'Georgia-Pacific',
    role: 'Automation & Robotics R&D',
    period: 'Mar 2019 — Mar 2021',
    bullets: [
      'Trained a deep learning object detector for autonomous forklifts.',
      'Built a drone RGB + thermal computer vision pipeline for industrial asset anomaly detection, combining clustering with deep learning detectors.',
      'Developed a ROS-based multi-robot sensor system streaming visual, thermal, acoustic and gas data to AWS.',
    ],
    tags: ['Python', 'PyTorch', 'OpenCV', 'ROS', 'AWS', 'Deep learning'],
  },
  {
    company: 'Georgia Tech — RICAL',
    role: 'Graduate Research Assistant',
    period: 'Aug 2018 — Jun 2020',
    bullets: [
      'Used mobile robots and drones for rapid 3D scanning of construction sites to monitor build progress.',
      'Built real-time offshore crane visualization in Unity driven by live encoder data.',
    ],
    tags: ['ROS', 'SLAM', 'Point clouds', 'Unity', 'C++'],
  },
  {
    company: 'Dynamic Solutions',
    role: 'Field Application Engineer',
    period: 'Jul 2016 — Jun 2018',
    location: 'Irvine, CA',
    bullets: [
      'Engineered custom and standard automation solutions for biotech, industrial and defense customers, including nuclear and extreme environments.',
      'Sized and selected precision motion control systems.',
      'Provided pre- and post-sale support across SCARA and 6-axis collaborative arms, controllers, drives, machine vision, linear and rotary motors, industrial PCs and HMIs.',
    ],
    tags: ['Motion control', 'Robotics', 'Machine vision', 'SolidWorks'],
  },
]

export const education = [
  {
    school: 'Georgia Institute of Technology',
    period: '2018 — 2020',
    degree: 'MS Computer Science',
    detail: 'Specialization: Robotics & Perception',
  },
  {
    school: 'California Polytechnic State University',
    period: '2011 — 2016',
    degree: 'BS Mechanical Engineering',
    detail: 'Concentration: Mechatronics',
  },
]
