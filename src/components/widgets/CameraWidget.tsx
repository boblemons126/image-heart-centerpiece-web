
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
                backgroundColor: isRecording ? '#dc2626' : 'var(--theme-background)',
                color: isRecording ? '#ffffff' : 'var(--theme-textSecondary)',
              }}
            >
              <Camera className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold" style={{ color: 'var(--theme-text)' }}>{device.name}</h3>
              <p className="text-sm" style={{ color: 'var(--theme-textSecondary)' }}>{device.room}</p>
            </div>
          </div>
          
          {motionDetected && (
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="px-2 py-1 rounded-full text-xs font-medium"
              style={{
                backgroundColor: 'rgba(251, 146, 60, 0.1)',
                color: '#f97316',
                border: '1px solid rgba(251, 146, 60, 0.3)',
              }}
            >
              Motion
            </motion.div>
          )}
        </div>

        {/* Camera Feed Placeholder */}
        <div 
          className="relative mb-4 rounded-xl overflow-hidden h-32"
          style={{
            background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
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
            className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: isRecording ? '#dc2626' : 'var(--theme-primary)',
              color: '#ffffff',
              boxShadow: '0 4px 14px 0 rgba(0, 0, 0, 0.2)',
            }}
          >
            {isRecording ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isRecording ? 'Stop' : 'Record'}</span>
          </button>
          
          <div className="text-right">
            <div className="text-sm font-medium" style={{ color: 'var(--theme-text)' }}>1080p</div>
            <div className="text-xs" style={{ color: 'var(--theme-textSecondary)' }}>HD Quality</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div 
              className="text-lg font-bold"
              style={{ 
                color: motionDetected ? '#f97316' : 'var(--theme-textSecondary)',
              }}
            >
              {motionDetected ? 'ACTIVE' : 'CLEAR'}
            </div>
            <div className="text-xs" style={{ color: 'var(--theme-textSecondary)' }}>Motion</div>
          </div>
          <div>
            <div 
              className="text-lg font-bold"
              style={{ 
                color: isRecording ? '#dc2626' : 'var(--theme-textSecondary)',
              }}
            >
              {isRecording ? 'ON' : 'OFF'}
            </div>
            <div className="text-xs" style={{ color: 'var(--theme-textSecondary)' }}>Recording</div>
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
