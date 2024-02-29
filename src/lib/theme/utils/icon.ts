const moonBtn = document.getElementById('moon')
const sunBtn = document.getElementById('sun')

const event = new Event('storage')

export const setIcon = (isDark: boolean): void => {
  if (moonBtn == null || sunBtn == null) return
  moonBtn.classList.toggle('hidden', isDark)
  sunBtn.classList.toggle('hidden', !isDark)

  moonBtn.addEventListener('click', () => {
    localStorage.setItem('theme', 'dark')
    window.dispatchEvent(event)
  })
  sunBtn.addEventListener('click', () => {
    localStorage.setItem('theme', 'light')
    window.dispatchEvent(event)
  })
}
