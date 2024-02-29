import { BgClassesArray } from '@/lib/theme/constants'

export const backgroundSetter = (isDark: boolean): void => {
  console.log(isDark)
  const { light, childLight, dark, childDark } = BgClassesArray

  const $bg = document.getElementById('bg')
  const $bgChild = document.getElementById('bg-child')

  const toggleBgTheme = (
    el: HTMLElement | null,
    condition: boolean,
    arrayClasses: string[]
  ): void => {
    if (el == null) return
    arrayClasses.forEach((c) => {
      el.classList.toggle(c, condition)
    })
  }

  toggleBgTheme($bg, isDark, [...dark])
  toggleBgTheme($bg, !isDark, [...light])
  toggleBgTheme($bgChild, isDark, [...childDark])
  toggleBgTheme($bgChild, !isDark, [...childLight])
}
