import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Play, Pause, Eye } from 'lucide-react';
import { Device, Widget } from '../../types';

interface CameraWidgetProps {
  device: Device;
  widget: Widget;
  onToggle: () => void;
  onUpdate: (updates: any) => void;
}

export function CameraWidget({ device, widget, onUpdate }: CameraWidgetProps) {
  const { recording, motionDetected } = device.properties;
  const isRecording = recording === true;

  const toggleRecording = () => {
    onUpdate({
      properties: {
        ...device.properties,
        recording: !recording,
      },
    });
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 dark:border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-3 rounded-xl ${
            isRecording 
              ? 'bg-red-100 dark:bg-red-900/30' 
              : 'bg-gray-100 dark:bg-slate-700'
          } transition-colors`}>
            <Camera className={`w-6 h-6 ${
              isRecording 
                ? 'text-red-600 dark:text-red-400' 
                : 'text-gray-500 dark:text-gray-400'
            }`} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">{device.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{device.room}</p>
          </div>
        </div>
        
        {motionDetected && (
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 rounded-full text-xs font-medium"
          >
            Motion
          </motion.div>
        )}
      </div>

      {/* Camera Feed Placeholder */}
      <div className="relative mb-4 bg-gray-900 rounded-xl overflow-hidden h-32">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
          <div className="text-center">
            <Eye className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-400 text-sm">Live Feed</p>
          </div>
        </div>
        
        {isRecording && (
          <div className="absolute top-3 right-3 flex items-center space-x-1">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-red-400 text-xs font-medium">REC</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mb-4">
        <button
          onClick={toggleRecording}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            isRecording 
              ? 'bg-red-500 hover:bg-red-600 text-white' 
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          {isRecording ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          <span>{isRecording ? 'Stop' : 'Record'}</span>
        </button>
        
        <div className="text-right">
          <div className="text-sm font-medium text-gray-900 dark:text-white">1080p</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">HD Quality</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-center">
        <div>
          <div className={`text-lg font-bold ${motionDetected ? 'text-orange-600 dark:text-orange-400' : 'text-gray-400'}`}>
            {motionDetected ? 'ACTIVE' : 'CLEAR'}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Motion</div>
        </div>
        <div>
          <div className={`text-lg font-bold ${isRecording ? 'text-red-600 dark:text-red-400' : 'text-gray-400'}`}>
            {isRecording ? 'ON' : 'OFF'}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Recording</div>
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