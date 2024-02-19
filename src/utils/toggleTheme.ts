const bgDark = document.getElementById('bg-dark')
const bgLight = document.getElementById('bg-light')
const moonBtn = document.getElementById('moon-svg')
const sunBtn = document.getElementById('sun-svg')

let remove: (() => void) | null = null
const matchMedia = window.matchMedia('(prefers-color-scheme: dark)')

const getThemePreference = (): string => {
  const currentSystemTheme = matchMedia.matches ? 'dark' : 'light'
  return typeof localStorage !== 'undefined'
    ? localStorage.getItem('theme') ?? currentSystemTheme
    : currentSystemTheme
}

const setIcon = (themePreference: string): void => {
  if (moonBtn == null || sunBtn == null) return
  if (themePreference === 'dark') {
    moonBtn.classList.add('hidden')
    sunBtn.classList.remove('hidden')
  } else {
    sunBtn.classList.add('hidden')
    moonBtn.classList.remove('hidden')
  }
}

const updateTheme = (): void => {
  if (remove != null) {
    remove()
  }
  matchMedia.addEventListener('change', updateTheme)
  remove = () => {
    matchMedia.removeEventListener('change', updateTheme)
  }

  const themePreference = getThemePreference()
  const isDark = themePreference === 'dark'

  setIcon(themePreference)
  document.documentElement.classList[isDark ? 'add' : 'remove']('dark')
  bgDark?.classList[isDark ? 'remove' : 'add']('hidden')
  bgLight?.classList[isDark ? 'add' : 'remove']('hidden')
}

export const toggleTheme = (): void => {
  updateTheme()

  moonBtn?.addEventListener('click', () => {
    localStorage.setItem('theme', 'dark')
    updateTheme()
  })
  sunBtn?.addEventListener('click', () => {
    localStorage.setItem('theme', 'light')
    updateTheme()
  })

  document.addEventListener('astro:after-swap', updateTheme)
}
