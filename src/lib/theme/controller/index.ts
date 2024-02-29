import { backgroundSetter } from '../utils/background'
import { setIcon } from '../utils/icon'

export class ThemeController {
  private remove: (() => void) | null
  private readonly matchMedia: MediaQueryList

  constructor() {
    this.remove = null
    this.matchMedia = window.matchMedia('(prefers-color-scheme: dark)')
  }

  private readonly updateTheme = (): void => {
    if (this.remove != null) {
      this.remove()
    }
    this.matchMedia.addEventListener('change', this.updateTheme)
    this.remove = () => {
      this.matchMedia.removeEventListener('change', this.updateTheme)
    }

    backgroundSetter(window.getThemePreference() === 'dark')
    setIcon(window.getThemePreference() === 'dark')
    document.documentElement.classList.toggle(
      'dark',
      window.getThemePreference() === 'dark'
    )
  }

  public toggleTheme = (): void => {
    this.updateTheme()

    window.addEventListener('storage', this.updateTheme)
    document.addEventListener('astro:after-swap', this.updateTheme)
  }
}
