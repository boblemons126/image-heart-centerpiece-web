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
      className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 dark:border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-3 rounded-xl ${isOn ? 'bg-yellow-100 dark:bg-yellow-900/30' : 'bg-gray-100 dark:bg-slate-700'} transition-colors`}>
            <Lightbulb 
              className={`w-6 h-6 ${isOn ? 'text-yellow-600 dark:text-yellow-400' : 'text-gray-500 dark:text-gray-400'}`} 
            />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">{device.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{device.room}</p>
          </div>
        </div>
        
        <button
          onClick={onToggle}
          className={`p-2 rounded-lg transition-all ${
            isOn 
              ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg' 
              : 'bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 text-gray-600 dark:text-gray-400'
          }`}
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
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Brightness</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">{brightness}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-2 rounded-full transition-all"
                style={{ width: `${brightness}%` }}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Color</span>
            <div 
              className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
              style={{ backgroundColor: color }}
            />
          </div>
        </motion.div>
      )}

      <div className="mt-4 flex items-center justify-between">
        <div className={`w-2 h-2 rounded-full ${device.status === 'online' ? 'bg-green-500' : 'bg-red-500'}`} />
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {device.lastUpdated.toLocaleTimeString()}
        </span>
      </div>
    </motion.div>
  );
}