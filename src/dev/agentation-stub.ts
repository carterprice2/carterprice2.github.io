/**
 * Production stand-in for the `agentation` package.
 *
 * Base.astro imports Agentation statically, because `client:only` hydration
 * needs a statically analyzable import to resolve the component. That would
 * pull the real ~424KB package into every production build, even though the
 * render branch is dead. So `astro.config.mjs` aliases `agentation` to this
 * file for `astro build`, and the bundler gets nothing worth including.
 *
 * `null` is also what the render guard in Base.astro checks, so the toolbar
 * is skipped rather than rendered as an empty island.
 */
export const Agentation = null
