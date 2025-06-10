import React from 'react';
import { motion } from 'framer-motion';
import { useDevices } from '../hooks/useDevices';
import { useDragAndDrop } from '../hooks/useDragAndDrop';
import { Widget } from '../types';
import { LightWidget } from './widgets/LightWidget';
import { ThermostatWidget } from './widgets/ThermostatWidget';
import { SecurityWidget } from './widgets/SecurityWidget';
import { CameraWidget } from './widgets/CameraWidget';
import { LockWidget } from './widgets/LockWidget';
import { SensorWidget } from './widgets/SensorWidget';

const initialWidgets: Widget[] = [
  {
    id: 'widget-1',
    deviceId: 'device-1',
    type: 'light',
    position: { x: 0, y: 0 },
    size: 'medium',
    customization: { theme: 'auto', color: '#3B82F6', showLabel: true, showStatus: true },
  },
  {
    id: 'widget-2',
    deviceId: 'device-2',
    type: 'thermostat',
    position: { x: 1, y: 0 },
    size: 'large',
    customization: { theme: 'auto', color: '#14B8A6', showLabel: true, showStatus: true },
  },
  {
    id: 'widget-3',
    deviceId: 'device-3',
    type: 'light',
    position: { x: 2, y: 0 },
    size: 'medium',
    customization: { theme: 'auto', color: '#F97316', showLabel: true, showStatus: true },
  },
  {
    id: 'widget-4',
    deviceId: 'device-4',
    type: 'camera',
    position: { x: 0, y: 1 },
    size: 'large',
    customization: { theme: 'auto', color: '#8B5CF6', showLabel: true, showStatus: true },
  },
  {
    id: 'widget-5',
    deviceId: 'device-6',
    type: 'lock',
    position: { x: 2, y: 1 },
    size: 'medium',
    customization: { theme: 'auto', color: '#EF4444', showLabel: true, showStatus: true },
  },
  {
    id: 'widget-6',
    deviceId: 'device-8',
    type: 'sensor',
    position: { x: 0, y: 2 },
    size: 'small',
    customization: { theme: 'auto', color: '#10B981', showLabel: true, showStatus: true },
  },
];

export function WidgetGrid() {
  const { devices, loading, toggleDevice, updateDevice } = useDevices();
  const { widgets, moveWidget, updateWidget } = useDragAndDrop(initialWidgets);

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

    switch (widget.type) {
      case 'light':
        return <LightWidget {...commonProps} />;
      case 'thermostat':
        return <ThermostatWidget {...commonProps} />;
      case 'security':
        return <SecurityWidget {...commonProps} />;
      case 'camera':
        return <CameraWidget {...commonProps} />;
      case 'lock':
        return <LockWidget {...commonProps} />;
      case 'sensor':
        return <SensorWidget {...commonProps} />;
      default:
        return null;
    }
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-min">
      {widgets.map((widget, index) => (
        <motion.div
          key={widget.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className={getGridSpan(widget.size)}
        >
          {renderWidget(widget)}
        </motion.div>
      ))}
      
      {/* Add Widget Placeholder */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: widgets.length * 0.1 }}
        className="h-48 border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-2xl flex items-center justify-center hover:border-blue-400 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <div className="text-center">
          <div className="w-12 h-12 bg-gray-200 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-2xl text-gray-400 dark:text-slate-500">+</span>
          </div>
          <p className="text-gray-500 dark:text-slate-400 font-medium">Add Widget</p>
        </div>
      </motion.div>
    </div>
  );
}