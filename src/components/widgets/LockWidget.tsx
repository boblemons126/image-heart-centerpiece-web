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
      className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 dark:border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-3 rounded-xl ${
            isLocked 
              ? 'bg-green-100 dark:bg-green-900/30' 
              : 'bg-red-100 dark:bg-red-900/30'
          } transition-colors`}>
            {isLocked ? (
              <Lock className="w-6 h-6 text-green-600 dark:text-green-400" />
            ) : (
              <Unlock className="w-6 h-6 text-red-600 dark:text-red-400" />
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
            isLocked 
              ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg' 
              : 'bg-green-500 hover:bg-green-600 text-white shadow-lg'
          }`}
        >
          {isLocked ? 'Unlock' : 'Lock'}
        </button>
      </div>

      <div className="text-center mb-6">
        <motion.div
          animate={{ rotate: isLocked ? 0 : 45 }}
          transition={{ duration: 0.3 }}
          className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${
            isLocked 
              ? 'bg-green-100 dark:bg-green-900/30' 
              : 'bg-red-100 dark:bg-red-900/30'
          } mb-3`}
        >
          {isLocked ? (
            <Lock className="w-8 h-8 text-green-600 dark:text-green-400" />
          ) : (
            <Unlock className="w-8 h-8 text-red-600 dark:text-red-400" />
          )}
        </motion.div>
        
        <div className={`text-lg font-semibold ${
          isLocked 
            ? 'text-green-600 dark:text-green-400' 
            : 'text-red-600 dark:text-red-400'
        }`}>
          {isLocked ? 'SECURED' : 'UNLOCKED'}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Battery className={`w-4 h-4 ${
              battery > 20 ? 'text-green-500' : 'text-red-500'
            }`} />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Battery</span>
          </div>
          <span className={`text-sm font-semibold ${
            battery > 20 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
          }`}>
            {battery}%
          </span>
        </div>
        
        <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all ${
              battery > 20 
                ? 'bg-gradient-to-r from-green-400 to-green-600' 
                : 'bg-gradient-to-r from-red-400 to-red-600'
            }`}
            style={{ width: `${battery}%` }}
          />
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