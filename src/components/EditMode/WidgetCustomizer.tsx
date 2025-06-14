
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, X } from 'lucide-react';
import { useEditMode } from './EditModeProvider';
import { getAllThemes, getThemeById, applyTheme } from '../../themes/themeManager';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Widget } from '../../types';
import { Device } from '../../types';

interface WidgetCustomizerProps {
  widget: Widget | null;
  device: Device | null;
  onUpdateWidget: (widgetId: string, updates: Partial<Widget>) => void;
  onDuplicateWidget: (widgetId: string) => void;
  onClose: () => void;
}

export function WidgetCustomizer({ widget, device, onUpdateWidget, onDuplicateWidget, onClose }: WidgetCustomizerProps) {
  const [selectedTheme, setSelectedTheme] = useState('dark');
  const availableThemes = getAllThemes();

  if (!widget) return null;

  const handleThemeChange = (themeId: string) => {
    setSelectedTheme(themeId);
    const theme = getThemeById(themeId);
    if (theme) {
      applyTheme(theme);
    }
    console.log('Theme changed to:', themeId);
  };

  const data = [
    { name: 'Jan', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Feb', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Mar', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Apr', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'May', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Jun', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Jul', uv: 3490, pv: 4300, amt: 2100 },
  ];

  return (
    <motion.div
      initial={{ x: 400, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 400, opacity: 0 }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="fixed top-4 right-4 z-50 w-96 max-h-[calc(100vh-2rem)] flex flex-col rounded-2xl shadow-2xl"
      style={{
        backgroundColor: 'var(--theme-surface)',
        borderColor: 'var(--theme-border)',
        border: '1px solid'
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: 'var(--theme-border)' }}>
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl" style={{ backgroundColor: 'var(--theme-primary)' }}>
            <Settings className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-lg" style={{ color: 'var(--theme-text)' }}>Widget Settings</h3>
            <p className="text-xs" style={{ color: 'var(--theme-textSecondary)' }}>Customize your widget</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-red-500/20 rounded-lg transition-all group"
        >
          <X className="w-4 h-4 group-hover:text-red-500 transition-colors" style={{ color: 'var(--theme-textSecondary)' }} />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 h-full overflow-y-auto">
        <div className="space-y-6">
          <div className="space-y-4">
            <h4 className="font-semibold" style={{ color: 'var(--theme-text)' }}>Theme Selection</h4>
            <p className="text-sm" style={{ color: 'var(--theme-textSecondary)' }}>Choose your dashboard appearance</p>
            <div className="grid grid-cols-2 gap-2">
              {availableThemes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => handleThemeChange(theme.id)}
                  className={`p-3 rounded-lg border transition-all ${
                    selectedTheme === theme.id ? 'ring-2' : ''
                  }`}
                  style={{
                    backgroundColor: 'var(--theme-background)',
                    borderColor: 'var(--theme-border)',
                    color: 'var(--theme-text)',
                    ringColor: selectedTheme === theme.id ? 'var(--theme-primary)' : 'transparent'
                  }}
                >
                  <div className="text-sm font-medium">{theme.name}</div>
                  <div className="text-xs mt-1" style={{ color: 'var(--theme-textSecondary)' }}>{theme.description}</div>
                </button>
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold" style={{ color: 'var(--theme-text)' }}>Data Configuration</h4>
            <p className="text-sm" style={{ color: 'var(--theme-textSecondary)' }}>Configure the data source for this widget</p>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart
                data={data}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="pv" stroke="#8884d8" fill="#8884d8" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold" style={{ color: 'var(--theme-text)' }}>Widget Settings</h4>
            <p className="text-sm" style={{ color: 'var(--theme-textSecondary)' }}>Configure the general settings for this widget</p>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium" style={{ color: 'var(--theme-text)' }}>Widget Name</label>
                <input
                  type="text"
                  defaultValue={device?.name || 'Unnamed Widget'}
                  className="w-full mt-1 px-3 py-2 rounded-lg border transition-all"
                  style={{
                    backgroundColor: 'var(--theme-background)',
                    borderColor: 'var(--theme-border)',
                    color: 'var(--theme-text)'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t" style={{ borderColor: 'var(--theme-border)' }}>
        <button
          onClick={onClose}
          className="w-full py-3 text-white rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
          style={{ background: `linear-gradient(135deg, var(--theme-primary), var(--theme-accent))` }}
        >
          <span>Apply Changes</span>
        </button>
      </div>
    </motion.div>
  );
}
