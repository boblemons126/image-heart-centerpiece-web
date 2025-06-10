import React from 'react';
import { motion } from 'framer-motion';
import { Home, Lightbulb, Thermometer, Shield, Camera, Lock, Cpu, Plus } from 'lucide-react';

const menuItems = [
  { icon: Home, label: 'Dashboard', active: true },
  { icon: Lightbulb, label: 'Lights', count: 8 },
  { icon: Thermometer, label: 'Climate', count: 3 },
  { icon: Shield, label: 'Security', count: 5 },
  { icon: Camera, label: 'Cameras', count: 4 },
  { icon: Lock, label: 'Locks', count: 2 },
  { icon: Cpu, label: 'Sensors', count: 12 },
];

const rooms = [
  { name: 'Living Room', color: 'bg-blue-500', devices: 6 },
  { name: 'Bedroom', color: 'bg-teal-500', devices: 4 },
  { name: 'Kitchen', color: 'bg-orange-500', devices: 5 },
  { name: 'Office', color: 'bg-purple-500', devices: 3 },
];

export function Sidebar() {
  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed left-0 top-0 h-full w-64 bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border-r border-gray-200 dark:border-slate-700 pt-20 z-40"
    >
      <div className="p-6">
        <nav className="space-y-1">
          {menuItems.map((item, index) => (
            <motion.button
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all ${
                item.active
                  ? 'bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-lg'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
              {item.count && (
                <span className={`ml-auto text-sm ${
                  item.active ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {item.count}
                </span>
              )}
            </motion.button>
          ))}
        </nav>

        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Rooms
            </h3>
            <button className="p-1 rounded hover:bg-gray-100 dark:hover:bg-slate-800">
              <Plus className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </button>
          </div>
          
          <div className="space-y-2">
            {rooms.map((room, index) => (
              <motion.button
                key={room.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: (menuItems.length + index) * 0.1 }}
                className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg text-left hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
              >
                <div className={`w-3 h-3 rounded-full ${room.color}`}></div>
                <span className="text-gray-700 dark:text-gray-300 font-medium">{room.name}</span>
                <span className="ml-auto text-sm text-gray-500 dark:text-gray-400">
                  {room.devices}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </motion.aside>
  );
}