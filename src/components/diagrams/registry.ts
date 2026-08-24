import BatterySorting from './BatterySorting.astro'
import PalletDetection from './PalletDetection.astro'
import YcuArchitecture from './YcuArchitecture.astro'

/**
 * Maps a work-collection slug to its system diagram.
 * Diagrams double as case-study figures and as homepage card thumbnails,
 * so the NDA'd work still has something visual to skim.
 */
export const diagrams = {
  'battery-cell-sorting': BatterySorting,
  'pallet-detection': PalletDetection,
  ycu: YcuArchitecture,
} as const

export type DiagramSlug = keyof typeof diagrams
