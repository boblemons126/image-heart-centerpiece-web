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
      className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 dark:border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-3 rounded-xl ${
            isArmed 
              ? alertLevel === 'high' 
                ? 'bg-red-100 dark:bg-red-900/30' 
                : 'bg-green-100 dark:bg-green-900/30'
              : 'bg-gray-100 dark:bg-slate-700'
          } transition-colors`}>
            {isArmed ? (
              alertLevel === 'high' ? (
                <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
              ) : (
                <ShieldCheck className="w-6 h-6 text-green-600 dark:text-green-400" />
              )
            ) : (
              <Shield className="w-6 h-6 text-gray-500 dark:text-gray-400" />
            )}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">{device.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{device.room}</p>
          </div>
        </div>
        
        <button
          onClick={onToggle}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            isArmed 
              ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg' 
              : 'bg-green-500 hover:bg-green-600 text-white shadow-lg'
          }`}
        >
          {isArmed ? 'Disarm' : 'Arm'}
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Status</span>
          <span className={`text-sm font-semibold ${
            isArmed 
              ? alertLevel === 'high'
                ? 'text-red-600 dark:text-red-400'
                : 'text-green-600 dark:text-green-400'
              : 'text-gray-500 dark:text-gray-400'
          }`}>
            {isArmed ? (alertLevel === 'high' ? 'ALERT' : 'ARMED') : 'DISARMED'}
          </span>
        </div>

        {lastAlert && (
          <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />
              <span className="text-sm font-medium text-red-800 dark:text-red-300">Last Alert</span>
            </div>
            <p className="text-sm text-red-600 dark:text-red-400 mt-1">
              {new Date(lastAlert).toLocaleString()}
            </p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">24/7</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Monitoring</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {alertLevel === 'high' ? '⚠️' : '✅'}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Security</div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className={`w-2 h-2 rounded-full ${device.status === 'online' ? 'bg-green-500' : 'bg-red-500'}`} />
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {device.lastUpdated.toLocaleTimeString()}
        </span>
      </div>
    </motion.div>
  );
}