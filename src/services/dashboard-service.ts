import { DashboardConfig } from '../types/dashboard';
import { initialWidgets } from '../data/default-widgets'; 

const LOCAL_STORAGE_KEY = 'dashboard-config';

const createDefaultConfig = (): DashboardConfig => ({
  title: 'My Dashboard',
  views: [
    {
      id: 'view-1',
      title: 'Home',
      path: 'home',
      widgets: initialWidgets, 
    },
  ],
});

export const loadDashboardConfig = (): DashboardConfig => {
  try {
    const serializedConfig = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (serializedConfig === null) {
      const defaultConfig = createDefaultConfig();
      saveDashboardConfig(defaultConfig);
      return defaultConfig;
    }
    return JSON.parse(serializedConfig);
  } catch (error) {
    console.error("Error loading dashboard config from localStorage", error);
    const defaultConfig = createDefaultConfig();
    saveDashboardConfig(defaultConfig);
    return defaultConfig;
  }
};

export const saveDashboardConfig = (config: DashboardConfig): void => {
  try {
    const serializedConfig = JSON.stringify(config);
    localStorage.setItem(LOCAL_STORAGE_KEY, serializedConfig);
  } catch (error) {
    console.error("Error saving dashboard config to localStorage", error);
  }
};
