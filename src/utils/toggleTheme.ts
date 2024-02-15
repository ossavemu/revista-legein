const moonBtn = document.getElementById('moon-svg');
const sunBtn = document.getElementById('sun-svg');

let remove: (() => void) | null = null;
const matchMedia = window.matchMedia('(prefers-color-scheme: dark)');

const getThemePreference = () => {
  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (!localStorage.getItem('theme')) {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }
  if (typeof localStorage !== 'undefined') {
    return localStorage.getItem('theme');
  }

  return isDark ? 'dark' : 'light';
};

const setIcon = (themePreference: string) => {
  if (themePreference === 'dark') {
    moonBtn!.classList.add('hidden');
    sunBtn!.classList.remove('hidden');
  } else {
    moonBtn!.classList.remove('hidden');
    sunBtn!.classList.add('hidden');
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
