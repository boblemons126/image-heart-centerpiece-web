
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface SortableEmptySlotProps {
  id: string;
  index: number;
}

export const SortableEmptySlot = ({ id, index }: SortableEmptySlotProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="col-span-1 border-2 border-red-400 border-dashed rounded-lg bg-red-100/20 dark:bg-red-900/20 min-h-[200px] flex items-center justify-center opacity-50"
    >
      <span className="text-red-600 dark:text-red-400 text-sm font-mono">
        Drop Zone {index + 1}
      </span>
    </div>
  );
};
