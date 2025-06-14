
import { useState } from 'react';
import { X, Copy, Trash2, Palette, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Widget, Device } from '../../types';

interface WidgetCustomizerProps {
  widget: Widget | null;
  device: Device | null;
  onUpdateWidget: (widgetId: string, updates: Partial<Widget>) => void;
  onDuplicateWidget: (widgetId: string) => void;
  onClose: () => void;
}

export function WidgetCustomizer({ 
  widget, 
  device, 
  onClose 
}: WidgetCustomizerProps) {
  const [activeTab, setActiveTab] = useState<'appearance' | 'settings'>('appearance');

  if (!widget || !device) return null;

  const tabs = [
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'settings', label: 'Settings', icon: Eye },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          exit={{ y: 20 }}
          className="w-full max-w-md mx-4 rounded-2xl border shadow-2xl overflow-hidden"
          style={{ 
            backgroundColor: 'var(--theme-surface)', 
            borderColor: 'var(--theme-border)'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div 
            className="flex items-center justify-between p-6 border-b"
            style={{ borderColor: 'var(--theme-border)' }}
          >
            <div>
              <h3 
                className="text-lg font-semibold"
                style={{ color: 'var(--theme-text)' }}
              >
                Customize {device.name}
              </h3>
              <p 
                className="text-sm"
                style={{ color: 'var(--theme-textSecondary)' }}
              >
                {widget.type} widget
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg transition-colors hover:opacity-70"
              style={{ backgroundColor: 'var(--theme-background)' }}
            >
              <X 
                className="w-5 h-5"
                style={{ color: 'var(--theme-textSecondary)' }}
              />
            </button>
          </div>

          {/* Tabs */}
          <div 
            className="flex border-b"
            style={{ borderColor: 'var(--theme-border)' }}
          >
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 text-sm font-medium transition-all relative`}
                  style={{ 
                    color: activeTab === tab.id ? 'var(--theme-primary)' : 'var(--theme-textSecondary)',
                    backgroundColor: activeTab === tab.id ? 'var(--theme-background)' : 'transparent'
                  }}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeCustomizerTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5"
                      style={{ backgroundColor: 'var(--theme-primary)' }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Content */}
          <div className="p-6 max-h-96 overflow-y-auto">
            {activeTab === 'appearance' && (
              <div className="space-y-4">
                <div>
                  <label 
                    className="block text-sm font-medium mb-2"
                    style={{ color: 'var(--theme-text)' }}
                  >
                    Widget Size
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['small', 'medium', 'large'].map((size) => (
                      <button
                        key={size}
                        className={`p-2 rounded-lg text-sm capitalize transition-all border ${
                          widget.size === size ? 'text-white' : ''
                        }`}
                        style={{
                          backgroundColor: widget.size === size ? 'var(--theme-primary)' : 'var(--theme-background)',
                          borderColor: 'var(--theme-border)',
                          color: widget.size === size ? 'white' : 'var(--theme-text)'
                        }}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label 
                    className="block text-sm font-medium mb-2"
                    style={{ color: 'var(--theme-text)' }}
                  >
                    Theme Color
                  </label>
                  <div className="grid grid-cols-6 gap-2">
                    {['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899'].map((color) => (
                      <button
                        key={color}
                        className="w-8 h-8 rounded-lg border-2 transition-all"
                        style={{
                          backgroundColor: color,
                          borderColor: widget.customization?.color === color ? 'var(--theme-text)' : 'var(--theme-border)'
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label 
                      className="text-sm font-medium"
                      style={{ color: 'var(--theme-text)' }}
                    >
                      Show Label
                    </label>
                    <p 
                      className="text-xs"
                      style={{ color: 'var(--theme-textSecondary)' }}
                    >
                      Display widget title
                    </p>
                  </div>
                  <button
                    className={`w-12 h-6 rounded-full transition-all ${
                      widget.customization?.showLabel !== false ? 'justify-end' : 'justify-start'
                    } flex items-center px-1`}
                    style={{ 
                      backgroundColor: widget.customization?.showLabel !== false ? 'var(--theme-primary)' : 'var(--theme-border)'
                    }}
                  >
                    <div 
                      className="w-4 h-4 rounded-full bg-white transition-all"
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label 
                      className="text-sm font-medium"
                      style={{ color: 'var(--theme-text)' }}
                    >
                      Show Status
                    </label>
                    <p 
                      className="text-xs"
                      style={{ color: 'var(--theme-textSecondary)' }}
                    >
                      Display device status
                    </p>
                  </div>
                  <button
                    className={`w-12 h-6 rounded-full transition-all ${
                      widget.customization?.showStatus !== false ? 'justify-end' : 'justify-start'
                    } flex items-center px-1`}
                    style={{ 
                      backgroundColor: widget.customization?.showStatus !== false ? 'var(--theme-primary)' : 'var(--theme-border)'
                    }}
                  >
                    <div 
                      className="w-4 h-4 rounded-full bg-white transition-all"
                    />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div 
            className="flex items-center justify-between p-6 border-t"
            style={{ borderColor: 'var(--theme-border)' }}
          >
            <div className="flex items-center space-x-2">
              <button
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-all hover:opacity-70"
                style={{ 
                  backgroundColor: 'var(--theme-background)',
                  color: 'var(--theme-text)'
                }}
              >
                <Copy className="w-4 h-4" />
                <span>Duplicate</span>
              </button>
              <button
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-all hover:bg-red-500/10 text-red-500"
                style={{ backgroundColor: 'var(--theme-background)' }}
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete</span>
              </button>
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-all hover:opacity-90"
              style={{ backgroundColor: 'var(--theme-primary)' }}
            >
              Done
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
