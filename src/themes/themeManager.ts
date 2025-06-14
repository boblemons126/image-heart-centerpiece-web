export interface Theme {
  id: string;
  name: string;
  description: string;
  type: 'built-in' | 'custom' | 'marketplace';
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
  };
  cssVariables?: Record<string, string>;
}

export const builtInThemes: Theme[] = [
  {
    id: 'light',
    name: 'Light Theme',
    description: 'Clean and bright',
    type: 'built-in',
    colors: {
      primary: '#3b82f6',
      secondary: '#f1f5f9',
      accent: '#0ea5e9',
      background: '#ffffff',
      surface: '#f8fafc',
      text: '#1e293b',
      textSecondary: '#64748b',
      border: '#e2e8f0',
    },
  },
  {
    id: 'dark',
    name: 'Dark Theme',
    description: 'Easy on the eyes',
    type: 'built-in',
    colors: {
      primary: '#3b82f6',
      secondary: '#1e293b',
      accent: '#0ea5e9',
      background: '#0f172a',
      surface: '#1e293b',
      text: '#f1f5f9',
      textSecondary: '#94a3b8',
      border: '#334155',
    },
  },
  {
    id: 'purple',
    name: 'Royal Purple',
    description: 'Elegant purple tones',
    type: 'built-in',
    colors: {
      primary: '#7c3aed',
      secondary: '#1e1b4b',
      accent: '#a855f7',
      background: '#1e1b4b',
      surface: '#312e81',
      text: '#f3e8ff',
      textSecondary: '#c4b5fd',
      border: '#6d28d9',
    },
  },
];

// Future custom themes will be loaded from user preferences or marketplace
export const customThemes: Theme[] = [
  // This array will be populated with user-created or marketplace themes
];

export const getAllThemes = (): Theme[] => {
  return [...builtInThemes, ...customThemes];
};

export const getThemeById = (id: string): Theme | undefined => {
  return getAllThemes().find(theme => theme.id === id);
};

export const applyTheme = (theme: Theme): void => {
  const root = document.documentElement;
  
  // Handle auto theme
  if (theme.id === 'auto') {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const autoTheme = prefersDark ? getThemeById('dark') : getThemeById('light');
    if (autoTheme) {
      applyTheme(autoTheme);
      return;
    }
  }
  
  // Apply theme colors as CSS custom properties
  Object.entries(theme.colors).forEach(([key, value]) => {
    root.style.setProperty(`--theme-${key}`, value);
  });
  
  // Apply Tailwind-compatible color variables
  root.style.setProperty('--background', theme.colors.background);
  root.style.setProperty('--foreground', theme.colors.text);
  root.style.setProperty('--primary', theme.colors.primary);
  root.style.setProperty('--secondary', theme.colors.secondary);
  root.style.setProperty('--accent', theme.colors.accent);
  root.style.setProperty('--border', theme.colors.border);
  root.style.setProperty('--surface', theme.colors.surface);
  
  // Apply additional CSS variables if provided
  if (theme.cssVariables) {
    Object.entries(theme.cssVariables).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }
  
  // Update the document class for dark/light themes
  root.classList.remove('dark', 'light', 'ocean', 'sunset', 'forest', 'purple', 'rose');
  root.classList.add(theme.id);
  
  // Apply theme-specific body styling
  document.body.style.backgroundColor = theme.colors.background;
  document.body.style.color = theme.colors.text;
  
  // Store the selected theme in localStorage
  localStorage.setItem('selected-theme', theme.id);
  
  console.log(`Applied theme: ${theme.name}`, theme.colors);
};

export const initializeTheme = (): void => {
  const savedThemeId = localStorage.getItem('selected-theme') || 'dark';
  const theme = getThemeById(savedThemeId) || getThemeById('dark');
  if (theme) {
    applyTheme(theme);
  }
};
