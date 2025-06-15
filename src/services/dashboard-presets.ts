
import { DashboardConfig } from '../types/dashboard';
import { loadDashboardConfig, saveDashboardConfig } from './dashboard-service';

export interface DashboardPreset {
  id: string;
  name: string;
  description: string;
  config: DashboardConfig;
  createdAt: string;
  isDefault?: boolean;
}

const PRESETS_STORAGE_KEY = 'dashboard-presets';

export const getDefaultPresets = (): DashboardPreset[] => [
  {
    id: 'default',
    name: 'Default',
    description: 'Your current dashboard configuration',
    config: loadDashboardConfig(),
    createdAt: new Date().toISOString(),
    isDefault: true,
  }
];

export const loadPresets = (): DashboardPreset[] => {
  try {
    const stored = localStorage.getItem(PRESETS_STORAGE_KEY);
    if (!stored) {
      const defaultPresets = getDefaultPresets();
      savePresets(defaultPresets);
      return defaultPresets;
    }
    return JSON.parse(stored);
  } catch (error) {
    console.error('Error loading presets:', error);
    const defaultPresets = getDefaultPresets();
    savePresets(defaultPresets);
    return defaultPresets;
  }
};

export const savePresets = (presets: DashboardPreset[]): void => {
  try {
    localStorage.setItem(PRESETS_STORAGE_KEY, JSON.stringify(presets));
  } catch (error) {
    console.error('Error saving presets:', error);
  }
};

export const saveCurrentAsDefault = (): void => {
  const presets = loadPresets();
  const currentConfig = loadDashboardConfig();
  
  const defaultIndex = presets.findIndex(p => p.id === 'default');
  const defaultPreset: DashboardPreset = {
    id: 'default',
    name: 'Default',
    description: 'Your current dashboard configuration',
    config: currentConfig,
    createdAt: new Date().toISOString(),
    isDefault: true,
  };

  if (defaultIndex >= 0) {
    presets[defaultIndex] = defaultPreset;
  } else {
    presets.unshift(defaultPreset);
  }

  savePresets(presets);
};

export const applyPreset = (presetId: string): void => {
  const presets = loadPresets();
  const preset = presets.find(p => p.id === presetId);
  
  if (preset) {
    saveDashboardConfig(preset.config);
    console.log(`Applied preset: ${preset.name}`);
  }
};

export const createPreset = (preset: Omit<DashboardPreset, 'createdAt'>): void => {
  const presets = loadPresets();
  const newPreset: DashboardPreset = {
    ...preset,
    createdAt: new Date().toISOString(),
  };
  
  presets.push(newPreset);
  savePresets(presets);
};
