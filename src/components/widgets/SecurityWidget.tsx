
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, ShieldCheck, AlertTriangle } from 'lucide-react';
import { Device, Widget } from '../../types';

interface SecurityWidgetProps {
  device: Device;
  widget: Widget;
  onToggle: () => void;
  onUpdate: (updates: any) => void;
}

export function SecurityWidget({ device, widget, onToggle }: SecurityWidgetProps) {
  const { armed, alertLevel, lastAlert } = device.properties;
  const isArmed = armed === true;

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
                backgroundColor: isArmed 
                  ? alertLevel === 'high' 
                    ? '#dc2626' 
                    : 'var(--theme-accent)'
                  : 'var(--theme-background)',
                color: isArmed ? '#ffffff' : 'var(--theme-textSecondary)',
              }}
            >
              {isArmed ? (
                alertLevel === 'high' ? (
                  <AlertTriangle className="w-6 h-6" />
                ) : (
                  <ShieldCheck className="w-6 h-6" />
                )
              ) : (
                <Shield className="w-6 h-6" />
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
              backgroundColor: isArmed ? '#dc2626' : 'var(--theme-primary)',
              color: '#ffffff',
              boxShadow: '0 4px 14px 0 rgba(0, 0, 0, 0.2)',
            }}
          >
            {isArmed ? 'Disarm' : 'Arm'}
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium" style={{ color: 'var(--theme-text)' }}>Status</span>
            <span 
              className="text-sm font-semibold"
              style={{
                color: isArmed 
                  ? alertLevel === 'high'
                    ? '#dc2626'
                    : '#16a34a'
                  : 'var(--theme-textSecondary)',
              }}
            >
              {isArmed ? (alertLevel === 'high' ? 'ALERT' : 'ARMED') : 'DISARMED'}
            </span>
          </div>

          {lastAlert && (
            <div 
              className="p-3 rounded-lg border"
              style={{
                backgroundColor: 'rgba(220, 38, 38, 0.1)',
                borderColor: '#dc2626',
              }}
            >
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                <span className="text-sm font-medium text-red-600">Last Alert</span>
              </div>
              <p className="text-sm text-red-600 mt-1">
                {new Date(lastAlert).toLocaleString()}
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold" style={{ color: 'var(--theme-text)' }}>24/7</div>
              <div className="text-xs" style={{ color: 'var(--theme-textSecondary)' }}>Monitoring</div>
            </div>
            <div>
              <div className="text-2xl font-bold" style={{ color: 'var(--theme-text)' }}>
                {alertLevel === 'high' ? '⚠️' : '✅'}
              </div>
              <div className="text-xs" style={{ color: 'var(--theme-textSecondary)' }}>Security</div>
            </div>
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
