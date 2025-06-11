import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { useEditMode } from './EditModeProvider';
import { DraggableMenu } from './DraggableMenu';
import { WidgetSearch } from './components/WidgetSearch';
import { EditInstructions } from './components/EditInstructions';
import { SaveButton } from './components/SaveButton';
import { Widget } from './types/widgets';

export function EditModeOverlay() {
  const { isEditMode, setEditMode } = useEditMode();

  if (!isEditMode) return null;

  const handleWidgetSelect = (widget: Widget) => {
    // Add widget logic here
    console.log('Selected widget:', widget);
  };

  return (
    <AnimatePresence>
      <DraggableMenu>
        <div className="space-y-3">
          <WidgetSearch onSelectWidget={handleWidgetSelect} />
          <EditInstructions />
        </div>

        <div className="mt-6">
          <SaveButton onClick={() => setEditMode(false)} />
        </div>
      </DraggableMenu>
    </AnimatePresence>
  );
}