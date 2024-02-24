import { BgClassesArray } from '@/lib/theme/constants'

export class ThemeController {
  private readonly moonBtn: HTMLElement | null
  private readonly sunBtn: HTMLElement | null
  private remove: (() => void) | null
  private readonly matchMedia: MediaQueryList

  constructor() {
    this.moonBtn = document.getElementById('moon-svg')
    this.sunBtn = document.getElementById('sun-svg')
    this.remove = null
    this.matchMedia = window.matchMedia('(prefers-color-scheme: dark)')
  }

  private readonly getThemePreference = (): string => {
    const currentSystemTheme = this.matchMedia.matches ? 'dark' : 'light'
    return typeof localStorage !== 'undefined'
      ? localStorage.getItem('theme') ?? currentSystemTheme
      : currentSystemTheme
  }

  private readonly setIcon = (themePreference: string): void => {
    if (this.moonBtn == null || this.sunBtn == null) return
    this.moonBtn.classList[themePreference === 'dark' ? 'add' : 'remove'](
      'hidden'
    )
    this.sunBtn.classList[themePreference === 'light' ? 'add' : 'remove'](
      'hidden'
    )
  }

  private readonly updateTheme = (): void => {
    const themePreference = this.getThemePreference()
    const isDark = themePreference === 'dark'

    if (this.remove != null) {
      this.remove()
    }
    this.matchMedia.addEventListener('change', this.updateTheme)
    this.remove = () => {
      this.matchMedia.removeEventListener('change', this.updateTheme)
    }

    this.setIcon(themePreference)

    document.documentElement.classList[isDark ? 'add' : 'remove']('dark')
  }

  private readonly changeBackground = (theme: string): void => {
    const isDark = theme === 'dark'

    const bgApp = document.getElementById('bg-app')
    const bgChild = document.getElementById('bg-child')

    if (bgApp == null || bgChild == null) return

    const { light, childLight, dark, childDark } = BgClassesArray

    bgApp.classList[isDark ? 'remove' : 'add'](...light)
    bgApp.classList[isDark ? 'add' : 'remove'](...dark)
    bgChild.classList[isDark ? 'remove' : 'add'](...childLight)
    bgChild.classList[isDark ? 'add' : 'remove'](...childDark)
  }

  public toggleTheme = (): void => {
    this.updateTheme()

    this.moonBtn?.addEventListener('click', () => {
      localStorage.setItem('theme', 'dark')
      this.changeBackground('dark')
      this.updateTheme()
    })
    this.sunBtn?.addEventListener('click', () => {
      localStorage.setItem('theme', 'light')
      this.changeBackground('light')
      this.updateTheme()
    })

    document.addEventListener('astro:after-swap', this.updateTheme)
  }
}
