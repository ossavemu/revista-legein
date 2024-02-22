/* eslint-disable @typescript-eslint/indent */
import { type NAMES } from '@/constants/members'
import type { BgClassesString } from '@/lib/theme/constants'

export type Names = (typeof NAMES)[number]

export type Publications = Partial<Record<string, string>>

export type BgClassesArrayType = Record<
  keyof typeof BgClassesString,
  readonly string[]
>
