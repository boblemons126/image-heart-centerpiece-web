
import { motion } from 'framer-motion';
import { GripHorizontal } from 'lucide-react';

interface DraggableMenuProps {
  children: React.ReactNode;
}

export function DraggableMenu({ children }: DraggableMenuProps) {
  return (
    <motion.div
      drag
      dragMomentum={false}
      className="fixed z-50 w-[280px] bg-slate-900/95 backdrop-blur-md rounded-lg shadow-2xl border border-slate-800"
    >
      {/* Drag Handle */}
      <div className="flex justify-center p-2 border-b border-slate-800/50">
        <GripHorizontal className="w-4 h-4 text-slate-600" />
      </div>

      {/* Content */}
      <div className="p-3">
        {children}
      </div>
    </motion.div>
  );
} 
