/* eslint-disable @typescript-eslint/indent */
import type { NAMES } from '@/constants/members'
import type { BgClassesString } from '@/lib/theme/constants'
import type { ValueOf } from 'node_modules/astro/dist/type-utils'
import type { PATHS } from '@/constants/paths'

export type Names = (typeof NAMES)[number]

export type Publications = Partial<Record<string, string>>

export type BgClassesArrayType = Record<
  keyof typeof BgClassesString,
  readonly string[]
>

export type Paths = ValueOf<typeof PATHS>
