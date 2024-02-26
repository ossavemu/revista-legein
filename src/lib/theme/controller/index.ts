import { backgroundSetter } from '../utils/background'

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

  public toggleTheme = (): void => {
    this.updateTheme()

    this.moonBtn?.addEventListener('click', () => {
      localStorage.setItem('theme', 'dark')
      backgroundSetter()
      this.updateTheme()
    })
    this.sunBtn?.addEventListener('click', () => {
      localStorage.setItem('theme', 'light')
      backgroundSetter()
      this.updateTheme()
    })

    document.addEventListener('astro:after-swap', this.updateTheme)
    document.addEventListener('astro:after-swap', backgroundSetter)
  }
}
