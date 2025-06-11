import { useState, useCallback } from 'react';
import { Widget } from '../types';

export function useDragAndDrop(initialWidgets: Widget[]) {
  const [widgets, setWidgets] = useState<Widget[]>(initialWidgets);

  const addWidget = useCallback((widget: Widget) => {
    setWidgets(prev => [...prev, widget]);
  }, []);

  const removeWidget = useCallback((widgetId: string) => {
    setWidgets(prev => prev.filter(widget => widget.id !== widgetId));
  }, []);

  const updateWidget = useCallback((widgetId: string, updates: Partial<Widget>) => {
    setWidgets(prev => prev.map(widget => 
      widget.id === widgetId 
        ? { ...widget, ...updates }
        : widget
    ));
  }, []);

  const duplicateWidget = useCallback((widgetId: string) => {
    const widget = widgets.find(w => w.id === widgetId);
    if (widget) {
      const newWidget: Widget = {
        ...widget,
        id: `widget-${Date.now()}`,
      };
      addWidget(newWidget);
    }
  }, [widgets, addWidget]);

  return {
    widgets,
    setWidgets,
    addWidget,
    removeWidget,
    updateWidget,
    duplicateWidget,
  };
}