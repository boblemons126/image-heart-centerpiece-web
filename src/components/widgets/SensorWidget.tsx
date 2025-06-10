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
      className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 dark:border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-3 rounded-xl ${
            hasMotion 
              ? 'bg-orange-100 dark:bg-orange-900/30' 
              : 'bg-gray-100 dark:bg-slate-700'
          } transition-colors`}>
            <Activity className={`w-6 h-6 ${
              hasMotion 
                ? 'text-orange-600 dark:text-orange-400' 
                : 'text-gray-500 dark:text-gray-400'
            }`} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">{device.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{device.room}</p>
          </div>
        </div>
        
        {hasMotion && (
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="flex items-center space-x-1 px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 rounded-full text-xs font-medium"
          >
            <Zap className="w-3 h-3" />
            <span>Active</span>
          </motion.div>
        )}
      </div>

      <div className="text-center mb-4">
        <div className={`text-2xl font-bold mb-1 ${
          hasMotion 
            ? 'text-orange-600 dark:text-orange-400' 
            : 'text-gray-500 dark:text-gray-400'
        }`}>
          {hasMotion ? 'MOTION' : 'CLEAR'}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Current Status
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

        {lastMotion && (
          <div className="pt-2 border-t border-gray-200 dark:border-slate-700">
            <div className="text-xs text-gray-500 dark:text-gray-400">Last Motion</div>
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              {new Date(lastMotion).toLocaleString()}
            </div>
          </div>
        )}
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