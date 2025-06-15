
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
import { DropZone } from './EditMode/components/DropZone';
import { toast } from 'sonner';
import { SortableEmptySlot } from './EditMode/components/SortableEmptySlot';

interface EmptySlot {
  id: string;
  type: 'empty';
}

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

  const getEmptySlotsCount = () => {
    const currentWidgets = widgets.length;
    const minSlots = 8;
    return Math.max(minSlots - currentWidgets, 4);
  };

  const emptySlots: EmptySlot[] = Array.from({ length: getEmptySlotsCount() }).map((_, i) => ({
    id: `empty-${i}`,
    type: 'empty',
  }));

  const gridItems: (Widget | EmptySlot)[] = [...widgets, ...emptySlots];

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
    
    toast.success(`${widget?.type || 'Widget'} deleted successfully`, {
      description: 'The widget has been removed from your dashboard.',
    });

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
    const { active, over } = event;
    
    if (!over) return;

    // Handle widget template drops
    if (active.data.current?.type === 'widget-template') {
      const template = active.data.current.template;
      const newWidget: Widget = {
        id: `widget-${Date.now()}`,
        deviceId: `device-${Math.floor(Math.random() * 8) + 1}`,
        type: template.type as any,
        size: 'medium' as const,
        customization: {
          theme: 'auto' as const,
          color: '#3B82F6',
          showLabel: true,
          showStatus: true,
        },
      };
      
      const overIndex = gridItems.findIndex(item => item.id === over.id);

      if (overIndex > -1) {
          const newGridItems = [...gridItems];
          const overItem = newGridItems[overIndex];
          
          if (overItem.type === 'empty') {
            newGridItems[overIndex] = newWidget; // Replace empty slot
          } else {
            newGridItems.splice(overIndex, 0, newWidget); // Insert before widget
          }

          const newWidgets = newGridItems.filter(item => item.type !== 'empty') as Widget[];
          updateWidgets(newWidgets);
      } else {
          // Fallback if not dropped on any grid item
          addWidget(newWidget);
      }
      
      toast.success(`${template.name} added to dashboard`, {
        description: 'Your new widget has been added successfully.',
      });
      return;
    }

    // Handle reordering of existing widgets
    if (active.id !== over.id) {
        const oldIndex = gridItems.findIndex((item) => item.id === active.id);
        const newIndex = gridItems.findIndex((item) => item.id === over.id);
      
        if (oldIndex !== -1 && newIndex !== -1) {
            // Prevent dragging empty slots
            if(gridItems[oldIndex].type === 'empty') return;

            const newGridItems = arrayMove(gridItems, oldIndex, newIndex);
            const newWidgets = newGridItems.filter(item => item.type !== 'empty') as Widget[];
            updateWidgets(newWidgets);

            toast.success('Widget position updated', {
                description: 'Your dashboard layout has been saved.',
            });
        }
    }
  }

  return (
    <div className="relative">
      {isEditMode && (
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-blue-900 dark:text-blue-100">
                Edit Mode Active - Debug Grid Visible
              </h3>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Use the panel on the right to add widgets, or drag existing widgets to rearrange them. The red grid shows drop zones.
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
        <SortableContext items={gridItems.map(item => item.id)}>
          <DropZone id="dashboard-drop-zone" isEmpty={widgets.length === 0 && isEditMode}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-min relative">
              <AnimatePresence mode="popLayout">
                {gridItems.map((item, index) => {
                  if (item.type !== 'empty') {
                    const widget = item as Widget;
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
                  } else {
                    return (
                      <SortableEmptySlot
                        key={item.id}
                        id={item.id}
                        index={index}
                      />
                    );
                  }
                })}
              </AnimatePresence>
            </div>
          </DropZone>
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
