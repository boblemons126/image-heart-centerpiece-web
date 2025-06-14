
import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Unlock, Battery } from 'lucide-react';
import { Device, Widget } from '../../types';

interface LockWidgetProps {
  device: Device;
  widget: Widget;
  onToggle: () => void;
  onUpdate: (updates: any) => void;
}

export function LockWidget({ device, widget, onToggle }: LockWidgetProps) {
  const { locked, battery } = device.properties;
  const isLocked = locked === true;

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
              className="p-3 rounded-xl transition-all duration-300"
              style={{
                backgroundColor: isLocked ? 'var(--theme-accent)' : '#dc2626',
                color: '#ffffff',
              }}
            >
              {isLocked ? (
                <Lock className="w-6 h-6" />
              ) : (
                <Unlock className="w-6 h-6" />
              )}
            </div>
            <div>
              <h3 className="font-semibold" style={{ color: 'var(--theme-text)' }}>{device.name}</h3>
              <p className="text-sm" style={{ color: 'var(--theme-textSecondary)' }}>{device.room}</p>
            </div>
          </div>
          
          <button
            onClick={onToggle}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: isLocked ? '#dc2626' : 'var(--theme-primary)',
              color: '#ffffff',
              boxShadow: '0 4px 14px 0 rgba(0, 0, 0, 0.2)',
            }}
          >
            {isLocked ? 'Unlock' : 'Lock'}
          </button>
        </div>

        <div className="text-center mb-6">
          <motion.div
            animate={{ rotate: isLocked ? 0 : 45 }}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-3"
            style={{
              backgroundColor: isLocked 
                ? 'rgba(34, 197, 94, 0.1)' 
                : 'rgba(220, 38, 38, 0.1)',
              border: `2px solid ${isLocked ? '#22c55e' : '#dc2626'}`,
            }}
          >
            {isLocked ? (
              <Lock className="w-8 h-8" style={{ color: '#22c55e' }} />
            ) : (
              <Unlock className="w-8 h-8" style={{ color: '#dc2626' }} />
            )}
          </motion.div>
          
          <div 
            className="text-lg font-semibold"
            style={{ 
              color: isLocked ? '#22c55e' : '#dc2626',
            }}
          >
            {isLocked ? 'SECURED' : 'UNLOCKED'}
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
