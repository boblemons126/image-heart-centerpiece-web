import React from 'react';
import { Device, Widget } from '../../types';

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
  onUpdateWidget,
  onDuplicateWidget,
  onClose,
}: WidgetCustomizerProps) {
  if (!widget || !device) return null;

  const updateCustomization = (updates: Partial<Widget['customization']>) => {
    onUpdateWidget(widget.id, {
      customization: { ...widget.customization, ...updates },
    });
  };

  const updateSize = (size: Widget['size']) => {
    onUpdateWidget(widget.id, { size });
  };

  return (
    <div className="fixed bottom-4 right-4 p-4 bg-white dark:bg-slate-800 rounded-lg shadow-lg w-80">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Edit Widget</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          Close
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Size</label>
          <select
            value={widget.size}
            onChange={(e) => updateSize(e.target.value as Widget['size'])}
            className="w-full p-2 border rounded"
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Theme</label>
          <select
            value={widget.customization.theme}
            onChange={(e) =>
              updateCustomization({ theme: e.target.value as 'light' | 'dark' | 'auto' })
            }
            className="w-full p-2 border rounded"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="auto">Auto</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Color</label>
          <input
            type="color"
            value={widget.customization.color}
            onChange={(e) => updateCustomization({ color: e.target.value })}
            className="w-full p-1 border rounded"
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Show Label</label>
          <input
            type="checkbox"
            checked={widget.customization.showLabel}
            onChange={(e) => updateCustomization({ showLabel: e.target.checked })}
            className="toggle"
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Show Status</label>
          <input
            type="checkbox"
            checked={widget.customization.showStatus}
            onChange={(e) => updateCustomization({ showStatus: e.target.checked })}
            className="toggle"
          />
        </div>

        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={() => widget && onDuplicateWidget(widget.id)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Duplicate
          </button>
        </div>
      </div>
    </div>
  );
}