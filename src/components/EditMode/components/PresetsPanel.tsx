
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Bookmark, 
  Star, 
  Download, 
  Save,
  Trash2,
  Check
} from 'lucide-react';
import { 
  loadPresets, 
  applyPreset, 
  saveCurrentAsDefault,
  createPreset,
  DashboardPreset 
} from '../../../services/dashboard-presets';
import { loadDashboardConfig } from '../../../services/dashboard-service';
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

  const handleCreateModernPreset = () => {
    try {
      const modernConfig = {
        title: 'Modern Smart Home',
        views: [
          {
            id: 'view-modern',
            title: 'Modern Home',
            path: 'modern',
            widgets: [
              {
                id: 'modern-thermostat',
                deviceId: 'device-2',
                type: 'thermostat' as const,
                size: 'large' as const,
                customization: {
                  theme: 'auto' as const,
                  color: '#10B981',
                  showLabel: true,
                  showStatus: true,
                },
              },
              {
                id: 'modern-lights-1',
                deviceId: 'device-1',
                type: 'light' as const,
                size: 'medium' as const,
                customization: {
                  theme: 'auto' as const,
                  color: '#3B82F6',
                  showLabel: true,
                  showStatus: true,
                },
              },
              {
                id: 'modern-lights-2',
                deviceId: 'device-3',
                type: 'light' as const,
                size: 'medium' as const,
                customization: {
                  theme: 'auto' as const,
                  color: '#F59E0B',
                  showLabel: true,
                  showStatus: true,
                },
              },
              {
                id: 'modern-security',
                deviceId: 'device-4',
                type: 'security' as const,
                size: 'medium' as const,
                customization: {
                  theme: 'auto' as const,
                  color: '#EF4444',
                  showLabel: true,
                  showStatus: true,
                },
              },
              {
                id: 'modern-camera',
                deviceId: 'device-5',
                type: 'camera' as const,
                size: 'large' as const,
                customization: {
                  theme: 'auto' as const,
                  color: '#8B5CF6',
                  showLabel: true,
                  showStatus: true,
                },
              },
              {
                id: 'modern-lock',
                deviceId: 'device-6',
                type: 'lock' as const,
                size: 'medium' as const,
                customization: {
                  theme: 'auto' as const,
                  color: '#EC4899',
                  showLabel: true,
                  showStatus: true,
                },
              }
            ],
          },
        ],
      };

      const modernPreset = {
        id: 'preset-1',
        name: 'Modern Layout',
        description: 'A clean, modern dashboard layout with optimal widget placement',
        config: modernConfig,
      };

      createPreset(modernPreset);
      setPresets(loadPresets());
      
      toast.success('Modern preset created successfully', {
        description: 'Preset 1 has been added to your collection.',
      });
    } catch (error) {
      toast.error('Failed to create modern preset');
      console.error('Error creating modern preset:', error);
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
          onClick={handleCreateModernPreset}
          className="w-full flex items-center space-x-2 p-3 rounded-lg text-sm text-white transition-all hover:opacity-90"
          style={{ backgroundColor: 'var(--theme-primary)' }}
        >
          <Star className="w-4 h-4" />
          <span>Create Modern Preset</span>
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
                ringColor: selectedPreset === preset.id ? 'var(--theme-primary)' : 'transparent'
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
