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
      className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 dark:border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30">
            <Thermometer className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">{device.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{device.room}</p>
          </div>
        </div>
        
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
          mode === 'heating' 
            ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400'
            : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
        }`}>
          {mode}
        </div>
      </div>

      <div className="text-center mb-6">
        <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          {temperature}°
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Current Temperature
        </div>
      </div>

      <div className="flex items-center justify-center space-x-4 mb-6">
        <button
          onClick={() => adjustTemperature(-1)}
          className="p-3 rounded-full bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
        >
          <Minus className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        </button>
        
        <div className="text-center">
          <div className="text-2xl font-semibold text-gray-900 dark:text-white">
            {targetTemp}°
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Target</div>
        </div>
        
        <button
          onClick={() => adjustTemperature(1)}
          className="p-3 rounded-full bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
        >
          <Plus className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        </button>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-700 dark:text-gray-300">Progress</span>
          <span className="text-gray-500 dark:text-gray-400">
            {Math.round((temperature / targetTemp) * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all ${
              mode === 'heating' 
                ? 'bg-gradient-to-r from-orange-400 to-red-500'
                : 'bg-gradient-to-r from-blue-400 to-blue-600'
            }`}
            style={{ width: `${Math.min(100, (temperature / targetTemp) * 100)}%` }}
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