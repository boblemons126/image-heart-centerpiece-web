
import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Power } from 'lucide-react';
import { Device, Widget } from '../../types';

interface LightWidgetProps {
  device: Device;
  widget: Widget;
  onToggle: () => void;
  onUpdate: (updates: any) => void;
}

export function LightWidget({ device, widget, onToggle }: LightWidgetProps) {
  const { brightness, color, on } = device.properties;
  const isOn = on === true;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
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
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div 
              className={`p-3 rounded-xl transition-all duration-300 ${
                isOn ? 'shadow-lg' : ''
              }`}
              style={{
                backgroundColor: isOn ? 'var(--theme-accent)' : 'var(--theme-background)',
                color: isOn ? '#ffffff' : 'var(--theme-textSecondary)',
              }}
            >
              <Lightbulb className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold" style={{ color: 'var(--theme-text)' }}>{device.name}</h3>
              <p className="text-sm" style={{ color: 'var(--theme-textSecondary)' }}>{device.room}</p>
            </div>
          </div>
          
          <button
            onClick={onToggle}
            className="p-2 rounded-lg transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: isOn ? 'var(--theme-primary)' : 'var(--theme-background)',
              color: isOn ? '#ffffff' : 'var(--theme-textSecondary)',
              boxShadow: isOn ? '0 4px 14px 0 rgba(0, 0, 0, 0.2)' : 'none',
            }}
          >
            <Power className="w-4 h-4" />
          </button>
        </div>

        {isOn && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium" style={{ color: 'var(--theme-text)' }}>Brightness</span>
                <span className="text-sm" style={{ color: 'var(--theme-textSecondary)' }}>{brightness}%</span>
              </div>
              <div 
                className="w-full rounded-full h-2"
                style={{ backgroundColor: 'var(--theme-background)' }}
              >
                <div 
                  className="h-2 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${brightness}%`,
                    background: `linear-gradient(90deg, var(--theme-accent), var(--theme-primary))`,
                  }}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium" style={{ color: 'var(--theme-text)' }}>Color</span>
              <div 
                className="w-6 h-6 rounded-full border-2 shadow-sm"
                style={{ 
                  backgroundColor: color,
                  borderColor: 'var(--theme-border)',
                }}
              />
            </div>
          </motion.div>
        )}

        <div className="mt-4 flex items-center justify-between">
          <div 
            className={`w-2 h-2 rounded-full ${device.status === 'online' ? 'bg-green-500' : 'bg-red-500'}`} 
          />
          <span className="text-xs" style={{ color: 'var(--theme-textSecondary)' }}>
            {device.lastUpdated.toLocaleTimeString()}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
