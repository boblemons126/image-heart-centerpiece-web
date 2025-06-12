import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { DashboardConfig, DashboardView } from '../types/dashboard';
import { Widget } from '../types';
import { loadDashboardConfig, saveDashboardConfig } from '../services/dashboard-service';

interface DashboardContextType {
  config: DashboardConfig | null;
  widgets: Widget[];
  updateWidgets: (widgets: Widget[]) => void;
  addWidget: (widget: Widget) => void;
  updateWidget: (widgetId: string, updates: Partial<Widget>) => void;
  removeWidget: (widgetId: string) => void;
  duplicateWidget: (widgetId: string) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
}

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<DashboardConfig | null>(null);
  const [currentViewIndex, setCurrentViewIndex] = useState(0);

  useEffect(() => {
    const loadedConfig = loadDashboardConfig();
    setConfig(loadedConfig);
  }, []);

  const currentView = config ? config.views[currentViewIndex] : null;
  const widgets = currentView ? currentView.widgets : [];

  const updateDashboard = (newConfig: DashboardConfig) => {
    setConfig(newConfig);
    saveDashboardConfig(newConfig);
  }

  const updateWidgets = (newWidgets: Widget[]) => {
    if (!config || !currentView) return;
    const newViews = [...config.views];
    newViews[currentViewIndex] = { ...currentView, widgets: newWidgets };
    updateDashboard({ ...config, views: newViews });
  };

  const addWidget = (widget: Widget) => {
    updateWidgets([...widgets, widget]);
  };

  const removeWidget = (widgetId: string) => {
    updateWidgets(widgets.filter(w => w.id !== widgetId));
  };

  const updateWidget = (widgetId: string, updates: Partial<Widget>) => {
    updateWidgets(
      widgets.map(w => (w.id === widgetId ? { ...w, ...updates } : w))
    );
  };

  const duplicateWidget = (widgetId: string) => {
    const widget = widgets.find(w => w.id === widgetId);
    if (widget) {
      const newWidget: Widget = {
        ...widget,
        id: `widget-${Date.now()}`,
      };
      addWidget(newWidget);
    }
  };

  const value = {
    config,
    widgets,
    updateWidgets,
    addWidget,
    removeWidget,
    updateWidget,
    duplicateWidget,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}
