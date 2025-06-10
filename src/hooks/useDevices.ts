import { useState, useEffect } from 'react';
import { Device } from '../types';
import { apiService } from '../services/api';
import { websocketService } from '../services/websocket';

export function useDevices() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDevices();
    
    // Subscribe to real-time updates
    const unsubscribe = websocketService.subscribe('deviceUpdate', (data) => {
      setDevices(prev => prev.map(device => 
        device.id === data.deviceId 
          ? { ...device, properties: { ...device.properties, ...data.properties }, lastUpdated: new Date(data.timestamp) }
          : device
      ));
    });

    return unsubscribe;
  }, []);

  const loadDevices = async () => {
    try {
      setLoading(true);
      const fetchedDevices = await apiService.getDevices();
      setDevices(fetchedDevices);
      setError(null);
    } catch (err) {
      setError('Failed to load devices');
    } finally {
      setLoading(false);
    }
  };

  const toggleDevice = async (deviceId: string) => {
    try {
      const updatedDevice = await apiService.toggleDevice(deviceId);
      setDevices(prev => prev.map(device => 
        device.id === deviceId ? updatedDevice : device
      ));
    } catch (err) {
      setError('Failed to toggle device');
    }
  };

  const updateDevice = async (deviceId: string, updates: Partial<Device>) => {
    try {
      const updatedDevice = await apiService.updateDevice(deviceId, updates);
      setDevices(prev => prev.map(device => 
        device.id === deviceId ? updatedDevice : device
      ));
    } catch (err) {
      setError('Failed to update device');
    }
  };

  return {
    devices,
    loading,
    error,
    toggleDevice,
    updateDevice,
    refetch: loadDevices,
  };
}