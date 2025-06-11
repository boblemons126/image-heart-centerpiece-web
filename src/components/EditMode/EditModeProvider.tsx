import React, { createContext, useContext, useState, ReactNode } from 'react';

interface EditModeContextType {
  isEditMode: boolean;
  setEditMode: (enabled: boolean) => void;
  selectedWidget: string | null;
  setSelectedWidget: (widgetId: string | null) => void;
  draggedWidget: string | null;
  setDraggedWidget: (widgetId: string | null) => void;
}

const EditModeContext = createContext<EditModeContextType | undefined>(undefined);

export function useEditMode() {
  const context = useContext(EditModeContext);
  if (!context) {
    throw new Error('useEditMode must be used within EditModeProvider');
  }
  return context;
}

interface EditModeProviderProps {
  children: ReactNode;
}

export function EditModeProvider({ children }: EditModeProviderProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedWidget, setSelectedWidget] = useState<string | null>(null);
  const [draggedWidget, setDraggedWidget] = useState<string | null>(null);

  const setEditMode = (enabled: boolean) => {
    setIsEditMode(enabled);
    if (!enabled) {
      setSelectedWidget(null);
      setDraggedWidget(null);
    }
  };

  return (
    <EditModeContext.Provider
      value={{
        isEditMode,
        setEditMode,
        selectedWidget,
        setSelectedWidget,
        draggedWidget,
        setDraggedWidget,
      }}
    >
      {children}
    </EditModeContext.Provider>
  );
}