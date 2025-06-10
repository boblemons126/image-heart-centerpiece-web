import { useState, useCallback } from 'react';
import { Widget } from '../types';

export function useDragAndDrop(initialWidgets: Widget[]) {
  const [widgets, setWidgets] = useState<Widget[]>(initialWidgets);

  const moveWidget = useCallback((widgetId: string, position: { x: number; y: number }) => {
    setWidgets(prev => prev.map(widget => 
      widget.id === widgetId 
        ? { ...widget, position }
        : widget
    ));
  }, []);

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

  return {
    widgets,
    moveWidget,
    addWidget,
    removeWidget,
    updateWidget,
  };
}