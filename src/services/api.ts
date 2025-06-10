import { Device, Room, DeviceType } from '../types';

class APIService {
  private baseUrl = '/api';
  private devices: Device[] = [];
  private rooms: Room[] = [];

  constructor() {
    this.initializeMockData();
  }

  private initializeMockData() {
    // Mock rooms
    this.rooms = [
      { id: 'room-1', name: 'Living Room', devices: ['device-1', 'device-2'], color: '#3B82F6' },
      { id: 'room-2', name: 'Bedroom', devices: ['device-3', 'device-4'], color: '#14B8A6' },
      { id: 'room-3', name: 'Kitchen', devices: ['device-5', 'device-6'], color: '#F97316' },
      { id: 'room-4', name: 'Office', devices: ['device-7', 'device-8'], color: '#8B5CF6' },
    ];

    // Mock devices
    this.devices = [
      {
        id: 'device-1',
        name: 'Main Lights',
        type: 'light',
        room: 'Living Room',
        status: 'online',
        properties: { brightness: 75, color: '#FFFFFF', on: true },
        lastUpdated: new Date(),
      },
      {
        id: 'device-2',
        name: 'Living Room Thermostat',
        type: 'thermostat',
        room: 'Living Room',
        status: 'online',
        properties: { temperature: 22, targetTemp: 24, mode: 'heating' },
        lastUpdated: new Date(),
      },
      {
        id: 'device-3',
        name: 'Bedroom Lights',
        type: 'light',
        room: 'Bedroom',
        status: 'online',
        properties: { brightness: 50, color: '#FFB366', on: false },
        lastUpdated: new Date(),
      },
      {
        id: 'device-4',
        name: 'Security Camera',
        type: 'camera',
        room: 'Bedroom',
        status: 'online',
        properties: { recording: true, motionDetected: false },
        lastUpdated: new Date(),
      },
      {
        id: 'device-5',
        name: 'Kitchen Lights',
        type: 'light',
        room: 'Kitchen',
        status: 'online',
        properties: { brightness: 90, color: '#FFFFFF', on: true },
        lastUpdated: new Date(),
      },
      {
        id: 'device-6',
        name: 'Smart Lock',
        type: 'lock',
        room: 'Kitchen',
        status: 'online',
        properties: { locked: true, battery: 85 },
        lastUpdated: new Date(),
      },
      {
        id: 'device-7',
        name: 'Office Thermostat',
        type: 'thermostat',
        room: 'Office',
        status: 'online',
        properties: { temperature: 20, targetTemp: 22, mode: 'heating' },
        lastUpdated: new Date(),
      },
      {
        id: 'device-8',
        name: 'Motion Sensor',
        type: 'sensor',
        room: 'Office',
        status: 'online',
        properties: { motion: false, battery: 92, lastMotion: new Date() },
        lastUpdated: new Date(),
      },
    ];
  }

  async getDevices(): Promise<Device[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...this.devices];
  }

  async getDevice(id: string): Promise<Device | null> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return this.devices.find(device => device.id === id) || null;
  }

  async updateDevice(id: string, updates: Partial<Device>): Promise<Device> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const deviceIndex = this.devices.findIndex(device => device.id === id);
    if (deviceIndex === -1) {
      throw new Error('Device not found');
    }

    this.devices[deviceIndex] = {
      ...this.devices[deviceIndex],
      ...updates,
      lastUpdated: new Date(),
    };

    return this.devices[deviceIndex];
  }

  async toggleDevice(id: string): Promise<Device> {
    const device = await this.getDevice(id);
    if (!device) {
      throw new Error('Device not found');
    }

    const updates: Partial<Device> = {
      properties: {
        ...device.properties,
        on: !device.properties.on,
      },
    };

    return this.updateDevice(id, updates);
  }

  async getRooms(): Promise<Room[]> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return [...this.rooms];
  }

  async createDevice(device: Omit<Device, 'id' | 'lastUpdated'>): Promise<Device> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const newDevice: Device = {
      ...device,
      id: `device-${Date.now()}`,
      lastUpdated: new Date(),
    };

    this.devices.push(newDevice);
    return newDevice;
  }

  async deleteDevice(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const deviceIndex = this.devices.findIndex(device => device.id === id);
    if (deviceIndex === -1) {
      throw new Error('Device not found');
    }

    this.devices.splice(deviceIndex, 1);
  }
}

export const apiService = new APIService();