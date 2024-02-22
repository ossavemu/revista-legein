export class Backgrounds extends HTMLElement {
  readonly light: string
  readonly childLight: string
  readonly dark: string
  readonly childDark: string
  constructor() {
    super()
    this.light = 'bg-[rgba(255,255,255,0.9)] bg-[size:6rem_4rem]'
    this.childLight =
      'bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]'
    this.dark = 'bg-neutral-900'
    this.childDark =
      'bg-fuchsia-400 bg-[size:20px_20px] opacity-20 blur-[100px]'
  }

  public template(theme: string, child: string): string {
    return `
      <div
        class="fixed inset-0 -z-10 h-full w-ful ${theme}"
        id="bg-app"
        transition:persist
      >
        <div
          class="absolute inset-0 ${child}"
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
