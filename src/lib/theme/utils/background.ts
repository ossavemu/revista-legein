import { BgClassesArray } from '@/lib/theme/constants'

export const backgroundSetter = (): void => {
  const themePreference: string =
    localStorage.getItem('theme') ??
    (window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light')

  const { light, childLight, dark, childDark } = BgClassesArray
  const isDark = themePreference === 'dark'
  const $body = document.body

  if (isDark) {
    $body.style.backgroundColor = 'rgba(0, 0, 0, 0.01)'
  } else {
    $body.style.backgroundColor = 'rgba(255, 255, 255, 0.9)'
  }

  const bgApp = document.getElementById('bg-app')
  const bgChild = document.getElementById('bg-child')

  if (bgApp == null || bgChild == null) return

  bgApp.classList[isDark ? 'remove' : 'add'](...light)
  bgApp.classList[isDark ? 'add' : 'remove'](...dark)
  bgChild.classList[isDark ? 'remove' : 'add'](...childLight)
  bgChild.classList[isDark ? 'add' : 'remove'](...childDark)
}
