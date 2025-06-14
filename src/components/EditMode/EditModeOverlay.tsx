import { AnimatePresence } from 'framer-motion';
import { useEditMode } from './EditModeProvider';
import { EditModePanel } from './EditModePanel';
import { useDashboard } from '../../contexts/DashboardContext';

export function EditModeOverlay() {
  const { isEditMode } = useEditMode();
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
      <EditModePanel onSelectWidget={handleWidgetSelect} />
    </AnimatePresence>
  );
}