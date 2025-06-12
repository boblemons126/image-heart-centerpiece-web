import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';

import { useDevices } from '../hooks/useDevices';
import { useDashboard } from '../contexts/DashboardContext';
import { useEditMode } from './EditMode/EditModeProvider';
import { Widget } from '../types';
import { LightWidget } from './widgets/LightWidget';
import { ThermostatWidget } from './widgets/ThermostatWidget';
import { SecurityWidget } from './widgets/SecurityWidget';
import { CameraWidget } from './widgets/CameraWidget';
import { LockWidget } from './widgets/LockWidget';
import { SensorWidget } from './widgets/SensorWidget';
import { WidgetCustomizer } from './EditMode/WidgetCustomizer';
import { SortableWidget } from './EditMode/SortableWidget';

export function WidgetGrid() {
  const { devices, loading, toggleDevice, updateDevice } = useDevices();
  const { 
    widgets, 
    updateWidgets, 
    updateWidget, 
    addWidget, 
    duplicateWidget,
    removeWidget
  } = useDashboard();
  const { isEditMode, selectedWidget, setSelectedWidget } = useEditMode();
  const [customizerWidget, setCustomizerWidget] = useState<Widget | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  console.log('WidgetGrid render, widgets count:', widgets.length);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-48 bg-white/50 dark:bg-slate-800/50 rounded-2xl animate-pulse"
          />
        ))}
      </div>
    );
  }

  const handleWidgetSelect = (widgetId: string) => {
    if (isEditMode) {
      setSelectedWidget(widgetId);
      const widget = widgets.find(w => w.id === widgetId);
      setCustomizerWidget(widget || null);
    }
  };

  const handleDuplicateWidget = (widgetId: string) => {
    const widget = widgets.find(w => w.id === widgetId);
    if (widget) {
      const newWidget: Widget = {
        ...widget,
        id: `widget-${Date.now()}`,
      };
      addWidget(newWidget);
    }
  };

  const renderWidget = (widget: Widget) => {
    const device = devices.find(d => d.id === widget.deviceId);
    if (!device) return null;

    const commonProps = {
      key: widget.id,
      device,
      widget,
      onToggle: () => toggleDevice(device.id),
      onUpdate: (updates: any) => updateDevice(device.id, updates),
    };

    let WidgetComponent;
    switch (widget.type) {
      case 'light':
        WidgetComponent = LightWidget;
        break;
      case 'thermostat':
        WidgetComponent = ThermostatWidget;
        break;
      case 'security':
        WidgetComponent = SecurityWidget;
        break;
      case 'camera':
        WidgetComponent = CameraWidget;
        break;
      case 'lock':
        WidgetComponent = LockWidget;
        break;
      case 'sensor':
        WidgetComponent = SensorWidget;
        break;
      default:
        return null;
    }

    return <WidgetComponent {...commonProps} />;
  };

  const getGridSpan = (size: Widget['size']) => {
    switch (size) {
      case 'small':
        return 'col-span-1';
      case 'medium':
        return 'col-span-1 md:col-span-1';
      case 'large':
        return 'col-span-1 md:col-span-2';
      default:
        return 'col-span-1';
    }
  };

  function handleDragEnd(event: DragEndEvent) {
    const {active, over} = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = widgets.findIndex((item) => item.id === active.id);
      const newIndex = widgets.findIndex((item) => item.id === over.id);
      updateWidgets(arrayMove(widgets, oldIndex, newIndex));
    }
  }

  return (
    <div className="relative">
      <DndContext 
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={widgets.map(w => w.id)}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-min">
            <AnimatePresence mode="popLayout">
              {widgets.map((widget) => {
                console.log('Rendering widget:', widget.id);
                return (
                  <motion.div
                    key={widget.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    className={getGridSpan(widget.size)}
                  >
                    <SortableWidget 
                      key={widget.id}
                      widget={widget} 
                      onSelect={handleWidgetSelect}
                      onRemove={removeWidget}
                    >
                      {renderWidget(widget)}
                    </SortableWidget>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </SortableContext>
      </DndContext>

      <WidgetCustomizer
        widget={customizerWidget}
        device={customizerWidget ? devices.find(d => d.id === customizerWidget.deviceId) || null : null}
        onUpdateWidget={updateWidget}
        onDuplicateWidget={duplicateWidget}
        onClose={() => {
          setCustomizerWidget(null);
          setSelectedWidget(null);
        }}
      />
    </div>
  );
}