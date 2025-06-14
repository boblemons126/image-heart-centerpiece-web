
import React, { useCallback, memo } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { X } from 'lucide-react';
import { useEditMode } from './EditModeProvider';
import { Widget } from '../../types';

interface SortableWidgetProps {
  widget: Widget;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  children: React.ReactNode;
}

export const SortableWidget = memo(function SortableWidget({ 
  widget, 
  onSelect,
  onDelete,
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

  const handleDelete = useCallback((e: React.MouseEvent) => {
    console.log('Delete button clicked for widget:', widget.id);
    e.preventDefault();
    e.stopPropagation();
    onDelete(widget.id);
  }, [widget.id, onDelete]);

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
      {/* Delete Button - only visible in edit mode */}
      {isEditMode && (
        <button
          onClick={handleDelete}
          className="absolute top-2 right-2 z-20 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 opacity-90 hover:opacity-100"
          title="Delete widget"
        >
          <X className="w-3 h-3" />
        </button>
      )}
      
      <div className="relative">
        {children}
      </div>
    </div>
  );
}); 
