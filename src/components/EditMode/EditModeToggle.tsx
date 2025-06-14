
import { motion } from 'framer-motion';
import { Pencil, Check } from 'lucide-react';
import { useEditMode } from './EditModeProvider';

export function EditModeToggle() {
  const { isEditMode, setEditMode } = useEditMode();

  return (
    <motion.button
      onClick={() => setEditMode(!isEditMode)}
      className={`p-2 rounded-lg transition-all ${
        isEditMode
          ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg'
          : 'bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-600 dark:text-gray-400'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        animate={{ rotate: isEditMode ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {isEditMode ? (
          <Check className="w-5 h-5" />
        ) : (
          <Pencil className="w-5 h-5" />
        )}
      </motion.div>
    </motion.button>
  );
}
