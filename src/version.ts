import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)

/** The package version, read from package.json (works from src and dist). */
export const VERSION: string = (require('../package.json') as { version: string }).version
export const NAME = 'vueleap'
