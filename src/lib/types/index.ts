import { type NAMES } from '@/constants/members'

export type Names = (typeof NAMES)[number]

export type Publications = Partial<Record<string, string>>
