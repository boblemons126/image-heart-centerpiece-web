import React, { useCallback, memo } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { X, Trash2 } from 'lucide-react';
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

  const { isEditMode, selectedWidget } = useEditMode();
  const isSelected = selectedWidget === widget.id;

  const handleSelect = useCallback((e: React.MouseEvent) => {
    if (isEditMode) {
      e.preventDefault();
      e.stopPropagation();
      onSelect(widget.id);
    }
  }, [isEditMode, widget.id, onSelect]);

  const handleDelete = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Add confirmation for better UX
    if (window.confirm(`Are you sure you want to delete the ${widget.type} widget?`)) {
      onDelete(widget.id);
    }
  }, [widget.id, widget.type, onDelete]);

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      {...attributes} 
      {...(isEditMode ? listeners : {})} 
      onClick={handleSelect}
      className={`relative group rounded-lg overflow-hidden transition-all duration-200 ${
        isEditMode 
          ? `cursor-move hover:ring-2 hover:ring-offset-2 hover:ring-blue-500 ${
              isSelected ? 'ring-2 ring-offset-2 ring-blue-500 ring-opacity-75' : ''
            }` 
          : ''
      }`}
      data-widget-id={widget.id}
    >
      {/* Edit Mode Overlay */}
      {isEditMode && (
        <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px] z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
      )}
      
      {/* Delete Button - Enhanced visibility and styling */}
      {isEditMode && (
        <button
          onClick={handleDelete}
          className="absolute top-2 right-2 z-20 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-110 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-red-300"
          title={`Delete ${widget.type} widget`}
          aria-label={`Delete ${widget.type} widget`}
        >
          <Trash2 className="w-4 h-4" />
        </button>
      )}

      {/* Edit Indicator */}
      {isEditMode && isSelected && (
        <div className="absolute top-2 left-2 z-20 px-2 py-1 bg-blue-500 text-white text-xs font-medium rounded-full shadow-lg">
          Selected
        </div>
      )}
      
      {/* Widget Content */}
      <div className="relative">
        {children}
      </div>
    </div>
  );
});