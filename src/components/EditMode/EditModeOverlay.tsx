import { AnimatePresence } from 'framer-motion';
import { useEditMode } from './EditModeProvider';
import { DraggableMenu } from './DraggableMenu';
import { WidgetSearch } from './components/WidgetSearch';
import { EditInstructions } from './components/EditInstructions';
import { SaveButton } from './components/SaveButton';
import { Widget } from './types/widgets';
import { useDashboard } from '../../contexts/DashboardContext';

export function EditModeOverlay() {
  const { isEditMode, setEditMode } = useEditMode();
  const { addWidget } = useDashboard();

  if (!isEditMode) return null;

  const handleWidgetSelect = (widget: Widget) => {
    // Create a new widget instance with a unique ID
    const newWidget = {
      id: `widget-${Date.now()}`,
      deviceId: `device-${Math.floor(Math.random() * 8) + 1}`, // Random device for demo
      type: widget.id as any,
      size: 'medium' as const,
      customization: {
        theme: 'auto' as const,
        color: '#3B82F6',
        showLabel: true,
        showStatus: true,
      },
    };
    
    addWidget(newWidget);
  };

  return (
    <AnimatePresence>
      <DraggableMenu>
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-white mb-2">Edit Dashboard</h3>
            <p className="text-sm text-slate-300">Customize your smart home dashboard</p>
          </div>
          
          <div className="border-t border-slate-700 pt-4">
            <h4 className="text-sm font-medium text-slate-300 mb-3">Add Widgets</h4>
            <WidgetSearch onSelectWidget={handleWidgetSelect} />
          </div>
          
          <div className="border-t border-slate-700 pt-4">
            <h4 className="text-sm font-medium text-slate-300 mb-3">Instructions</h4>
            <EditInstructions />
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-700">
          <SaveButton onClick={() => setEditMode(false)} />
        </div>
      </DraggableMenu>
    </AnimatePresence>
  );
}