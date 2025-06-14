import { useState } from 'react';
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
import { toast } from 'sonner';

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
  const { isEditMode, setSelectedWidget, selectedWidget } = useEditMode();
  const [customizerWidget, setCustomizerWidget] = useState<Widget | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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

  const handleWidgetDelete = (widgetId: string) => {
    const widget = widgets.find(w => w.id === widgetId);
    removeWidget(widgetId);
    
    // Show success toast
    toast.success(`${widget?.type || 'Widget'} deleted successfully`, {
      description: 'The widget has been removed from your dashboard.',
    });

    // Clear selection if the deleted widget was selected
    if (selectedWidget === widgetId) {
      setSelectedWidget(null);
      setCustomizerWidget(null);
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
      
      toast.success('Widget position updated', {
        description: 'Your dashboard layout has been saved.',
      });
    }
  }

  return (
    <div className="relative">
      {/* Edit Mode Indicator */}
      {isEditMode && (
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-blue-900 dark:text-blue-100">
                Edit Mode Active
              </h3>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                You can now add, remove, and rearrange widgets on your dashboard.
              </p>
            </div>
            <div className="text-sm text-blue-600 dark:text-blue-400">
              {widgets.length} widget{widgets.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>
      )}

      <DndContext 
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={widgets.map(w => w.id)}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-min">
            <AnimatePresence mode="popLayout">
              {widgets.map((widget) => {
                return (
                  <motion.div
                    key={widget.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                    transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 30 }}
                    className={getGridSpan(widget.size)}
                  >
                    <SortableWidget 
                      key={widget.id}
                      widget={widget} 
                      onSelect={handleWidgetSelect}
                      onDelete={handleWidgetDelete}
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

      {/* Empty State for Edit Mode */}
      {isEditMode && widgets.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
            <Plus className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No widgets yet
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Add your first widget using the floating menu to get started.
          </p>
        </div>
      )}

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