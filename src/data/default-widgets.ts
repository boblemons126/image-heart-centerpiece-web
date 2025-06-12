import { Widget } from '../types';

export const initialWidgets: Widget[] = [
  {
    id: 'widget-1',
    deviceId: 'device-1',
    type: 'light',
    size: 'medium',
    customization: { theme: 'auto', color: '#3B82F6', showLabel: true, showStatus: true },
  },
  {
    id: 'widget-2',
    deviceId: 'device-2',
    type: 'thermostat',
    size: 'large',
    customization: { theme: 'auto', color: '#14B8A6', showLabel: true, showStatus: true },
  },
  {
    id: 'widget-3',
    deviceId: 'device-3',
    type: 'light',
    size: 'medium',
    customization: { theme: 'auto', color: '#F97316', showLabel: true, showStatus: true },
  },
  {
    id: 'widget-4',
    deviceId: 'device-4',
    type: 'camera',
    size: 'large',
    customization: { theme: 'auto', color: '#8B5CF6', showLabel: true, showStatus: true },
  },
  {
    id: 'widget-5',
    deviceId: 'device-6',
    type: 'lock',
    size: 'medium',
    customization: { theme: 'auto', color: '#EF4444', showLabel: true, showStatus: true },
  },
  {
    id: 'widget-6',
    deviceId: 'device-8',
    type: 'sensor',
    size: 'small',
    customization: { theme: 'auto', color: '#10B981', showLabel: true, showStatus: true },
  },
]; 