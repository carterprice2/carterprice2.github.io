/** Skill clusters, rendered on the homepage and /resume from this one list. */

export interface SkillCluster {
  name: string
  items: string[]
}

export const skillsIntro =
  'Skills I use across AI products, full-stack delivery, and physical systems.'

export const skills: SkillCluster[] = [
  {
    name: 'AI & LLM Systems',
    items: [
      'LLM evaluation & LLM-as-judge rubrics',
      'Prompt engineering',
      'Agent & tool-calling architectures',
      'MCP',
      'RAG (vector + keyword)',
      'LLM observability & cost attribution',
      'Anthropic API',
      'PostHog',
    ],
  },
  {
    name: 'Software',
    items: [
      'TypeScript',
      'Python',
      'Swift/SwiftUI',
      'Go',
      'C++',
      'React',
      'Next.js',
      'React Native/Expo',
      'Hono/Bun',
      'Node',
      'Linux',
    ],
  },
  {
    name: 'Data & Infrastructure',
    items: [
      'Supabase/Postgres (schema design, RLS, migrations)',
      'Docker',
      'GitHub Actions',
      'Railway',
      'Cloudflare Workers',
      'Trigger.dev',
      'Ansible',
    ],
  },
  {
    name: 'Product & Delivery',
    items: [
      'End-to-end feature ownership',
      'Stripe & Apple IAP billing',
      'App Store release & review compliance',
      'Product analytics',
      'Feature flags',
      'Agile/scrum',
    ],
  },
  {
    name: 'ML & Perception',
    items: [
      'PyTorch',
      'Keras',
      'scikit-learn',
      'OpenCV',
      'Cognex',
      'Computer vision',
      'DL object detection',
      'Sensor fusion',
    ],
  },
  {
    name: 'Robotics',
    items: [
      'ROS',
      'SLAM',
      'Path & motion planning',
      'Forward & inverse kinematics',
      'Point clouds (PCL)',
      'RGB-D',
      'LIDAR',
      'Thermal',
      'Laser profilometry',
    ],
  },
  {
    name: 'Controls & Systems',
    items: [
      'Feedback control (linear & non-linear)',
      'Advanced process control',
      'Systems modeling',
      'MATLAB/Simulink',
      'EtherCAT',
      'CAN',
      'Modbus',
    ],
  },
  {
    name: 'Test & Manufacturing',
    items: [
      'Functional test framework design',
      'EOL test automation',
      'Metrology',
      'Vision system design',
      'Motion control',
      'Robot programming (UR, Precise)',
      'SolidWorks CAD',
    ],
  },
]
