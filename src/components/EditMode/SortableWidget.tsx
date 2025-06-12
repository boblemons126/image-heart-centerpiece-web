import React, { useCallback, memo, useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { X } from 'lucide-react';
import { useEditMode } from './EditModeProvider';
import { Widget } from '../../types';

interface SortableWidgetProps {
  widget: Widget;
  onSelect: (id: string) => void;
  onRemove: (id: string) => void;
  children: React.ReactNode;
}

export const SortableWidget = memo(function SortableWidget({ 
  widget, 
  onSelect,
  onRemove,
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
  const [isHovering, setIsHovering] = useState(false);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 'auto',
    opacity: isDragging ? 0.5 : 1,
  };

  const { isEditMode } = useEditMode();

  console.log('SortableWidget render, widget:', widget.id, 'isEditMode:', isEditMode);

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onRemove(widget.id);
  };

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
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={`relative group rounded-lg overflow-hidden transition-all duration-200
                 ${isEditMode ? 'cursor-move hover:ring-2 hover:ring-offset-2 hover:ring-blue-500' : ''}`}
      data-widget-id={widget.id}
    >
      <div className="relative">
        {children}
      </div>

      {isEditMode && isHovering && (
        <button
          onClick={handleDelete}
          className="absolute top-1 right-1 z-10 p-1 bg-red-600 rounded-full text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          aria-label="Delete widget"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}); 