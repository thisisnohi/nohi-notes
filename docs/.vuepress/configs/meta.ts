import { createRequire } from 'node:module'
// @ts-ignore
import { fs } from '@vuepress/utils'

const require = createRequire(import.meta.url)

export const version = fs.readJsonSync(
  require.resolve('@vuepress/core/package.json')
).version
