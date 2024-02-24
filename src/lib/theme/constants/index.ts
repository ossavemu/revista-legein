import type { BgClassesArrayType } from '@/lib/types'

export const BgClassesString = {
  light: 'bg-[rgba(255,255,255,0.9)] bg-[size:6rem_4rem]',
  childLight:
    'bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]',
  dark: 'dark:bg-neutral-900 bg-neutral-900',
  childDark:
    'dark:bg-fuchsia-400 bg-fuchsia-400 bg-[size:20px_20px] opacity-20 blur-[100px]'
} as const

export const BgClassesArray = Object.keys(BgClassesString).reduce(
  (acc, key) => {
    return {
      ...acc,
      [key]: (BgClassesString as Record<string, string>)[key]?.split(' ')
    }
  },
  {}
) as BgClassesArrayType
