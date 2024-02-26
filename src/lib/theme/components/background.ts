import { BgClassesArray } from '@/lib/theme/constants'

const { light, childLight, dark, childDark } = BgClassesArray

export class Background extends HTMLElement {
  private readonly themePreference: string
  constructor() {
    super()
    const isMatchDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches
    this.themePreference =
      localStorage.getItem('theme') ?? (isMatchDark ? 'dark' : 'light')
  }

  public connectedCallback(): void {
    const $body = document.body

    if (this.themePreference === 'dark') {
      $body.style.backgroundColor = 'rgba(0, 0, 0, 0.01)'
    } else {
      $body.style.backgroundColor = 'rgba(255, 255, 255, 0.9)'
    }

    const bgApp = this.querySelector('#bg-app')
    const bgChild = this.querySelector('#bg-child')
    const theme = this.themePreference === 'dark' ? dark : light
    const child = this.themePreference === 'dark' ? childDark : childLight

    bgApp?.classList.add(...theme)
    bgChild?.classList.add(...child)
  }
}
