import React, { useCallback, memo } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useEditMode } from './EditModeProvider';
import { Widget } from '../../types';

interface SortableWidgetProps {
  widget: Widget;
  onSelect: (id: string) => void;
  children: React.ReactNode;
}

export const SortableWidget = memo(function SortableWidget({ 
  widget, 
  onSelect,
  children 
}: SortableWidgetProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: widget.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 'auto',
    opacity: isDragging ? 0.5 : 1,
  };

  const { isEditMode } = useEditMode();

  console.log('SortableWidget render, widget:', widget.id, 'isEditMode:', isEditMode);

  const handleSelect = useCallback((e: React.MouseEvent) => {
    console.log('Widget selected:', widget.id);
    if (isEditMode) {
      e.preventDefault();
      e.stopPropagation();
      onSelect(widget.id);
    }
  }, [isEditMode, widget.id, onSelect]);

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      {...attributes} 
      {...(isEditMode ? listeners : {})} 
      onClick={handleSelect}
      className={`relative group rounded-lg overflow-hidden hover:ring-2 hover:ring-offset-2 hover:ring-blue-500 transition-all duration-200
                 ${isEditMode ? 'cursor-move' : ''}`}
      data-widget-id={widget.id}
    >
      <div className="relative">
        {children}
      </div>
    </div>
  );
}); 