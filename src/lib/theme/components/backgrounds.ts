import { BgClassesString } from '@/lib/theme/constants'

const { light, childLight, dark, childDark } = BgClassesString

export class Backgrounds extends HTMLElement {
  readonly light: string
  readonly childLight: string
  readonly dark: string
  readonly childDark: string
  constructor() {
    super()
    this.light = light
    this.childLight = childLight
    this.dark = dark
    this.childDark = childDark
  }

  public template(theme: string, child: string): string {
    return `
      <div
        class="fixed inset-0 -z-10 h-full w-ful transition-all ease-in-out duration-300 ${theme}"
        id="bg-app"
        transition:persist
      >
        <div
          class="absolute inset-0 transition-all ease-in-out duration-300 ${child}"
          id="bg-child"
        >
        </div>
      </div>
    `
  }

  public connectedCallback(): void {
    const isMatchDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches
    const themePreference =
      localStorage.getItem('theme') ?? (isMatchDark ? 'dark' : 'light')
    const theme = themePreference === 'dark' ? this.dark : this.light
    const child = themePreference === 'dark' ? this.childDark : this.childLight
    this.innerHTML = this.template(theme, child)
  }
}
