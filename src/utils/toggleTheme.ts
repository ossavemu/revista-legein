const bgDark = document.getElementById('bg-dark');
const bgLight = document.getElementById('bg-light');
const moonBtn = document.getElementById('moon-svg');
const sunBtn = document.getElementById('sun-svg');

let remove: (() => void) | null = null;
const matchMedia = window.matchMedia('(prefers-color-scheme: dark)');

const getThemePreference = () => {
  const currentSystemTheme = matchMedia.matches ? 'dark' : 'light';
  return typeof localStorage !== 'undefined'
    ? localStorage.getItem('theme') ?? currentSystemTheme
    : currentSystemTheme;
};

const setIcon = (themePreference: string) => {
  if (themePreference === 'dark') {
    moonBtn!.classList.add('hidden');
    sunBtn!.classList.remove('hidden');
  } else {
    sunBtn!.classList.add('hidden');
    moonBtn!.classList.remove('hidden');
  }
};

const updateTheme = () => {
  if (remove != null) {
    remove();
  }
  matchMedia.addEventListener('change', updateTheme);
  remove = () => {
    matchMedia.removeEventListener('change', updateTheme);
  };

  const themePreference = getThemePreference();
  const isDark = themePreference === 'dark';

  setIcon(themePreference as string);
  document.documentElement.classList[isDark ? 'add' : 'remove']('dark');
  bgDark!.classList[isDark ? 'remove' : 'add']('hidden');
  bgLight!.classList[isDark ? 'add' : 'remove']('hidden');
};

export const toggleTheme = () => {
  updateTheme();

  moonBtn!.addEventListener('click', () => {
    localStorage.setItem('theme', 'dark');
    updateTheme();
  });
  sunBtn!.addEventListener('click', () => {
    localStorage.setItem('theme', 'light');
    updateTheme();
  });

  document.addEventListener('astro:after-swap', updateTheme);
};
