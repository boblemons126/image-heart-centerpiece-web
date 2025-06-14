import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

interface DropZoneProps {
  id: string;
  children?: React.ReactNode;
  isEmpty?: boolean;
}

export function DropZone({ id, children, isEmpty = false }: DropZoneProps) {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`
        min-h-[200px] rounded-xl border-2 border-dashed transition-all duration-300
        ${isOver 
          ? 'border-blue-400 bg-blue-50/50 dark:bg-blue-900/20 scale-105' 
          : isEmpty 
            ? 'border-slate-300 dark:border-slate-600 bg-slate-50/50 dark:bg-slate-800/50'
            : 'border-transparent'
        }
      `}
    >
      {isEmpty ? (
        <motion.div
          animate={{ scale: isOver ? 1.05 : 1 }}
          className="h-full flex flex-col items-center justify-center text-center p-8"
        >
          <div className={`
            w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors
            ${isOver 
              ? 'bg-blue-100 dark:bg-blue-900/30' 
              : 'bg-slate-100 dark:bg-slate-700'
            }
          `}>
            <Plus className={`w-8 h-8 ${
              isOver 
                ? 'text-blue-600 dark:text-blue-400' 
                : 'text-slate-400'
            }`} />
          </div>
          <h3 className={`text-lg font-medium mb-2 transition-colors ${
            isOver 
              ? 'text-blue-900 dark:text-blue-100' 
              : 'text-slate-600 dark:text-slate-300'
          }`}>
            {isOver ? 'Drop widget here' : 'Drag widgets here'}
          </h3>
          <p className={`text-sm transition-colors ${
            isOver 
              ? 'text-blue-700 dark:text-blue-300' 
              : 'text-slate-500 dark:text-slate-400'
          }`}>
            {isOver 
              ? 'Release to add widget to your dashboard' 
              : 'Open the widget library and drag widgets to get started'
            }
          </p>
        </motion.div>
      ) : (
        children
      )}
    </div>
  );
}