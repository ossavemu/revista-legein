const moonBtn = document.getElementById('moon-svg');
const sunBtn = document.getElementById('sun-svg');

let remove: (() => void) | null = null;
const matchMedia = window.matchMedia('(prefers-color-scheme: dark)');

const getThemePreference = () => {
  if (typeof localStorage !== 'undefined') {
    return localStorage.getItem('theme') ?? 'system';
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
};

const updateIcon = (themePreference: string) => {
  document.querySelectorAll('.theme-toggle-icon').forEach(element => {
    (element as HTMLElement).style.scale =
      element.id === themePreference ? '1' : '0';
  });
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
  const isDark =
    themePreference === 'dark' ||
    (themePreference === 'system' && matchMedia.matches);

  updateIcon(themePreference);
  document.documentElement.classList[isDark ? 'add' : 'remove']('dark');
  setIcon(themePreference);
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
