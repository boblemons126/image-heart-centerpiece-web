
export interface Device {
  id: string;
  name: string;
  type: DeviceType;
  room: string;
  status: DeviceStatus;
  properties: Record<string, any>;
  lastUpdated: Date;
}

export type DeviceType = 
  | 'light' 
  | 'thermostat' 
  | 'security' 
  | 'media' 
  | 'sensor' 
  | 'switch' 
  | 'camera' 
  | 'lock'
  | 'weather'
  | 'grid-toggle';

export type DeviceStatus = 'online' | 'offline' | 'error';

export interface Widget {
  id: string;
  deviceId: string;
  type: WidgetType;
  size: WidgetSize;
  customization: WidgetCustomization;
}

export type WidgetType = DeviceType;

export type WidgetSize = 'small' | 'medium' | 'large';

export interface WidgetCustomization {
  theme: 'light' | 'dark' | 'auto';
  color: string;
  showLabel: boolean;
  showStatus: boolean;
}

export interface Room {
  id: string;
  name: string;
  devices: string[];
  color: string;
}

export interface DashboardLayout {
  widgets: Widget[];
  gridSize: { columns: number; rows: number };
}
