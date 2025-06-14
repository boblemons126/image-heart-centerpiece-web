
import { AnimatePresence } from 'framer-motion';
import { useEditMode } from './EditModeProvider';
import { DraggableMenu } from './DraggableMenu';
import { WidgetLibrary } from './components/WidgetLibrary';
import { EditInstructions } from './components/EditInstructions';
import { SaveButton } from './components/SaveButton';
import { useDashboard } from '../../contexts/DashboardContext';

export function EditModeOverlay() {
  const { isEditMode, setEditMode } = useEditMode();
  const { addWidget } = useDashboard();

  if (!isEditMode) return null;

  const handleWidgetSelect = (template: any) => {
    // Create a new widget instance with a unique ID
    const newWidget = {
      id: `widget-${Date.now()}`,
      deviceId: `device-${Math.floor(Math.random() * 8) + 1}`,
      type: template.type as any,
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
        <div className="space-y-6">
          <div className="text-center pb-4 border-b border-white/10">
            <h3 className="text-lg font-bold text-white mb-1">Dashboard Editor</h3>
            <p className="text-xs text-slate-300">Customize your smart home control center</p>
          </div>
          
          <div>
            <WidgetLibrary onSelectWidget={handleWidgetSelect} />
          </div>
          
          <div className="pt-4 border-t border-white/10">
            <h4 className="text-xs font-semibold text-slate-200 mb-3 uppercase tracking-wide">
              Quick Guide
            </h4>
            <EditInstructions />
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-white/10">
          <SaveButton onClick={() => setEditMode(false)} />
        </div>
      </DraggableMenu>
    </AnimatePresence>
  );
}
