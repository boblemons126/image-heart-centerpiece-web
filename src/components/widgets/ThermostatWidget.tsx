
import React from 'react';
import { motion } from 'framer-motion';
import { Thermometer, Plus, Minus } from 'lucide-react';
import { Device, Widget } from '../../types';

interface ThermostatWidgetProps {
  device: Device;
  widget: Widget;
  onToggle: () => void;
  onUpdate: (updates: any) => void;
}

export function ThermostatWidget({ device, widget, onUpdate }: ThermostatWidgetProps) {
  const { temperature, targetTemp, mode } = device.properties;

  const adjustTemperature = (delta: number) => {
    const newTemp = Math.max(10, Math.min(30, targetTemp + delta));
    onUpdate({
      properties: {
        ...device.properties,
        targetTemp: newTemp,
      },
    });
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="relative overflow-hidden rounded-2xl border transition-all duration-300 hover:shadow-lg"
      style={{
        backgroundColor: 'var(--theme-surface)',
        borderColor: 'var(--theme-border)',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      }}
    >
      {/* Background gradient overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          background: `linear-gradient(135deg, var(--theme-primary) 0%, var(--theme-accent) 100%)`,
        }}
      />
      
      <div className="relative p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div 
              className="p-3 rounded-xl"
              style={{
                backgroundColor: 'var(--theme-accent)',
                color: '#ffffff',
              }}
            >
              <Thermometer className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold" style={{ color: 'var(--theme-text)' }}>{device.name}</h3>
              <p className="text-sm" style={{ color: 'var(--theme-textSecondary)' }}>{device.room}</p>
            </div>
          </div>
          
          <div 
            className="px-3 py-1 rounded-full text-xs font-medium"
            style={{
              backgroundColor: mode === 'heating' ? 'rgba(251, 146, 60, 0.1)' : 'var(--theme-background)',
              color: mode === 'heating' ? '#f97316' : 'var(--theme-text)',
              borderColor: 'var(--theme-border)',
              border: '1px solid',
            }}
          >
            {mode}
          </div>
        </div>

        <div className="text-center mb-6">
          <div className="text-4xl font-bold mb-2" style={{ color: 'var(--theme-text)' }}>
            {temperature}°
          </div>
          <div className="text-sm" style={{ color: 'var(--theme-textSecondary)' }}>
            Current Temperature
          </div>
        </div>

        <div className="flex items-center justify-center space-x-4 mb-6">
          <button
            onClick={() => adjustTemperature(-1)}
            className="p-3 rounded-full transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: 'var(--theme-background)',
              color: 'var(--theme-textSecondary)',
              border: '1px solid var(--theme-border)',
            }}
          >
            <Minus className="w-4 h-4" />
          </button>
          
          <div className="text-center">
            <div className="text-2xl font-semibold" style={{ color: 'var(--theme-text)' }}>
              {targetTemp}°
            </div>
            <div className="text-xs" style={{ color: 'var(--theme-textSecondary)' }}>Target</div>
          </div>
          
          <button
            onClick={() => adjustTemperature(1)}
            className="p-3 rounded-full transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: 'var(--theme-background)',
              color: 'var(--theme-textSecondary)',
              border: '1px solid var(--theme-border)',
            }}
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span style={{ color: 'var(--theme-text)' }}>Progress</span>
            <span style={{ color: 'var(--theme-textSecondary)' }}>
              {Math.round((temperature / targetTemp) * 100)}%
            </span>
          </div>
          <div 
            className="w-full rounded-full h-2"
            style={{ backgroundColor: 'var(--theme-background)' }}
          >
            <div 
              className="h-2 rounded-full transition-all duration-300"
              style={{ 
                width: `${Math.min(100, (temperature / targetTemp) * 100)}%`,
                background: mode === 'heating' 
                  ? 'linear-gradient(90deg, #f97316, #dc2626)'
                  : `linear-gradient(90deg, var(--theme-accent), var(--theme-primary))`,
              }}
            />
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className={`w-2 h-2 rounded-full ${device.status === 'online' ? 'bg-green-500' : 'bg-red-500'}`} />
          <span className="text-xs" style={{ color: 'var(--theme-textSecondary)' }}>
            {device.lastUpdated.toLocaleTimeString()}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
