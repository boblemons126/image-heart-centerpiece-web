
import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Battery, Zap } from 'lucide-react';
import { Device, Widget } from '../../types';

interface SensorWidgetProps {
  device: Device;
  widget: Widget;
  onToggle: () => void;
  onUpdate: (updates: any) => void;
}

export function SensorWidget({ device }: SensorWidgetProps) {
  const { motion: isMotionDetected, battery, lastMotion } = device.properties;
  const hasMotion = isMotionDetected === true;

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
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div 
              className="p-3 rounded-xl transition-all duration-300"
              style={{
                backgroundColor: hasMotion ? '#f97316' : 'var(--theme-background)',
                color: hasMotion ? '#ffffff' : 'var(--theme-textSecondary)',
              }}
            >
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold" style={{ color: 'var(--theme-text)' }}>{device.name}</h3>
              <p className="text-sm" style={{ color: 'var(--theme-textSecondary)' }}>{device.room}</p>
            </div>
          </div>
          
          {hasMotion && (
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium"
              style={{
                backgroundColor: 'rgba(251, 146, 60, 0.1)',
                color: '#f97316',
                border: '1px solid rgba(251, 146, 60, 0.3)',
              }}
            >
              <Zap className="w-3 h-3" />
              <span>Active</span>
            </motion.div>
          )}
        </div>

        <div className="text-center mb-4">
          <div 
            className="text-2xl font-bold mb-1"
            style={{ 
              color: hasMotion ? '#f97316' : 'var(--theme-textSecondary)',
            }}
          >
            {hasMotion ? 'MOTION' : 'CLEAR'}
          </div>
          <div className="text-sm" style={{ color: 'var(--theme-textSecondary)' }}>
            Current Status
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Battery 
                className={`w-4 h-4 ${battery > 20 ? 'text-green-500' : 'text-red-500'}`} 
              />
              <span className="text-sm font-medium" style={{ color: 'var(--theme-text)' }}>Battery</span>
            </div>
            <span 
              className="text-sm font-semibold"
              style={{ 
                color: battery > 20 ? '#22c55e' : '#dc2626',
              }}
            >
              {battery}%
            </span>
          </div>
          
          <div 
            className="w-full rounded-full h-2"
            style={{ backgroundColor: 'var(--theme-background)' }}
          >
            <div 
              className="h-2 rounded-full transition-all duration-300"
              style={{ 
                width: `${battery}%`,
                backgroundColor: battery > 20 ? '#22c55e' : '#dc2626',
              }}
            />
          </div>

          {lastMotion && (
            <div 
              className="pt-2 border-t"
              style={{ borderColor: 'var(--theme-border)' }}
            >
              <div className="text-xs" style={{ color: 'var(--theme-textSecondary)' }}>Last Motion</div>
              <div className="text-sm font-medium" style={{ color: 'var(--theme-text)' }}>
                {new Date(lastMotion).toLocaleString()}
              </div>
            </div>
          )}
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
