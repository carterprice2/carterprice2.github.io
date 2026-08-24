/** Single source of truth for identity, used by <head>, JSON-LD, rail and footer. */
export const site = {
  name: 'Carter Price',
  role: 'Software Engineer',
  /** The positioning line. Replaces the old `Software | CV | Robotics | AI | ML`. */
  thesis:
    'I build software for systems that touch the physical world — and ship AI products end to end.',
  description:
    'Carter Price — software engineer working across AI products, computer vision, robotics and manufacturing systems. Currently first engineering hire at Inflight and lead engineer at YCU.',
  location: 'Reno, NV',
  email: 'carterprice2@gmail.com',
  links: {
    github: 'https://github.com/carterprice2',
    linkedin: 'https://www.linkedin.com/in/carter-price',
  },
} as const

export const navSections = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Selected work' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
] as const
