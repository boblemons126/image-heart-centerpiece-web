
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Bookmark, 
  Star, 
  Download, 
  Save,
  Check
} from 'lucide-react';
import { 
  loadPresets, 
  applyPreset, 
  saveCurrentAsDefault,
  createPreset,
  DashboardPreset 
} from '../../../services/dashboard-presets';
import { toast } from 'sonner';

export function PresetsPanel() {
  const [presets, setPresets] = useState<DashboardPreset[]>(loadPresets());
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);

  const handleApplyPreset = (presetId: string) => {
    try {
      applyPreset(presetId);
      setSelectedPreset(presetId);
      
      const preset = presets.find(p => p.id === presetId);
      toast.success(`Applied preset: ${preset?.name}`, {
        description: 'Your dashboard has been updated with the selected preset.',
      });
      
      // Reload the page to apply changes
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      toast.error('Failed to apply preset');
      console.error('Error applying preset:', error);
    }
  };

  const handleSaveAsDefault = () => {
    try {
      saveCurrentAsDefault();
      setPresets(loadPresets());
      toast.success('Current configuration saved as default', {
        description: 'Your current dashboard setup has been saved.',
      });
    } catch (error) {
      toast.error('Failed to save as default');
      console.error('Error saving as default:', error);
    }
  };

  const handleCreateHomeAssistantPreset = () => {
    try {
      // Creating a preset inspired by the Home Assistant screenshot
      const homeAssistantConfig = {
        title: 'Home Assistant Style Dashboard',
        views: [
          {
            id: 'view-ha-style',
            title: 'Home',
            path: 'home',
            widgets: [
              {
                id: 'ha-lights-main',
                deviceId: 'device-1',
                type: 'light' as const,
                size: 'medium' as const,
                customization: {
                  theme: 'auto' as const,
                  color: '#FF6B35',
                  showLabel: true,
                  showStatus: true,
                },
              },
              {
                id: 'ha-lights-corner',
                deviceId: 'device-3',
                type: 'light' as const,
                size: 'medium' as const,
                customization: {
                  theme: 'auto' as const,
                  color: '#8B5A2B',
                  showLabel: true,
                  showStatus: true,
                },
              },
              {
                id: 'ha-thermostat',
                deviceId: 'device-2',
                type: 'thermostat' as const,
                size: 'large' as const,
                customization: {
                  theme: 'auto' as const,
                  color: '#E74C3C',
                  showLabel: true,
                  showStatus: true,
                },
              },
              {
                id: 'ha-security',
                deviceId: 'device-4',
                type: 'security' as const,
                size: 'medium' as const,
                customization: {
                  theme: 'auto' as const,
                  color: '#9B59B6',
                  showLabel: true,
                  showStatus: true,
                },
              },
              {
                id: 'ha-lock',
                deviceId: 'device-6',
                type: 'lock' as const,
                size: 'medium' as const,
                customization: {
                  theme: 'auto' as const,
                  color: '#2ECC71',
                  showLabel: true,
                  showStatus: true,
                },
              },
              {
                id: 'ha-camera',
                deviceId: 'device-5',
                type: 'camera' as const,
                size: 'large' as const,
                customization: {
                  theme: 'auto' as const,
                  color: '#3498DB',
                  showLabel: true,
                  showStatus: true,
                },
              },
              {
                id: 'ha-sensor-1',
                deviceId: 'device-7',
                type: 'sensor' as const,
                size: 'medium' as const,
                customization: {
                  theme: 'auto' as const,
                  color: '#F39C12',
                  showLabel: true,
                  showStatus: true,
                },
              },
              {
                id: 'ha-sensor-2',
                deviceId: 'device-8',
                type: 'sensor' as const,
                size: 'medium' as const,
                customization: {
                  theme: 'auto' as const,
                  color: '#1ABC9C',
                  showLabel: true,
                  showStatus: true,
                },
              }
            ],
          },
        ],
      };

      const homeAssistantPreset = {
        id: 'preset-1',
        name: 'Home Assistant Style',
        description: 'A colorful dashboard inspired by Home Assistant with gradient cards and vibrant colors',
        config: homeAssistantConfig,
      };

      createPreset(homeAssistantPreset);
      setPresets(loadPresets());
      
      toast.success('Home Assistant preset created successfully', {
        description: 'Preset 1 has been added with a beautiful gradient design.',
      });
    } catch (error) {
      toast.error('Failed to create Home Assistant preset');
      console.error('Error creating Home Assistant preset:', error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <Bookmark 
          className="w-5 h-5"
          style={{ color: 'var(--theme-primary)' }}
        />
        <h4 
          className="font-semibold"
          style={{ color: 'var(--theme-text)' }}
        >
          Dashboard Presets
        </h4>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2">
        <button
          onClick={handleSaveAsDefault}
          className="w-full flex items-center space-x-2 p-3 rounded-lg border border-opacity-50 text-sm transition-all hover:opacity-80"
          style={{ 
            backgroundColor: 'var(--theme-background)', 
            borderColor: 'var(--theme-border)',
            color: 'var(--theme-text)'
          }}
        >
          <Save className="w-4 h-4" />
          <span>Save Current as Default</span>
        </button>

        <button
          onClick={handleCreateHomeAssistantPreset}
          className="w-full flex items-center space-x-2 p-3 rounded-lg text-sm text-white transition-all hover:opacity-90"
          style={{ backgroundColor: 'var(--theme-primary)' }}
        >
          <Star className="w-4 h-4" />
          <span>Create Home Assistant Style Preset</span>
        </button>
      </div>

      {/* Presets List */}
      <div className="space-y-3">
        <h5 
          className="text-sm font-medium"
          style={{ color: 'var(--theme-textSecondary)' }}
        >
          Available Presets
        </h5>
        
        <div className="space-y-2">
          {presets.map((preset) => (
            <motion.div
              key={preset.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-3 rounded-lg border border-opacity-50 cursor-pointer transition-all hover:opacity-80 ${
                selectedPreset === preset.id ? 'ring-2' : ''
              }`}
              style={{ 
                backgroundColor: 'var(--theme-background)', 
                borderColor: 'var(--theme-border)',
                ...(selectedPreset === preset.id ? {
                  borderColor: 'var(--theme-primary)',
                  borderWidth: '2px'
                } : {})
              }}
              onClick={() => handleApplyPreset(preset.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h6 
                      className="font-medium text-sm"
                      style={{ color: 'var(--theme-text)' }}
                    >
                      {preset.name}
                    </h6>
                    {preset.isDefault && (
                      <Star 
                        className="w-3 h-3 fill-current"
                        style={{ color: 'var(--theme-accent)' }}
                      />
                    )}
                  </div>
                  <p 
                    className="text-xs mt-1"
                    style={{ color: 'var(--theme-textSecondary)' }}
                  >
                    {preset.description}
                  </p>
                  <p 
                    className="text-xs mt-1"
                    style={{ color: 'var(--theme-textSecondary)' }}
                  >
                    {preset.config.views[0]?.widgets.length || 0} widgets
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  {selectedPreset === preset.id && (
                    <Check 
                      className="w-4 h-4"
                      style={{ color: 'var(--theme-primary)' }}
                    />
                  )}
                  <Download 
                    className="w-4 h-4"
                    style={{ color: 'var(--theme-textSecondary)' }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {presets.length === 0 && (
        <div 
          className="text-center py-8 text-sm"
          style={{ color: 'var(--theme-textSecondary)' }}
        >
          No presets available. Save your current configuration to get started.
        </div>
      )}
    </div>
  );
}
