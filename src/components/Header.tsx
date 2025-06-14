
import { motion } from 'framer-motion';
import { Bell, User } from 'lucide-react';
import { EditModeToggle } from './EditMode/EditModeToggle';

export function Header() {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-slate-700 fixed top-0 right-0 left-0 z-50"
      style={{ 
        backgroundColor: 'var(--theme-surface)', 
        borderColor: 'var(--theme-border)',
        color: 'var(--theme-text)'
      }}
    >
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: 'var(--theme-primary)' }}
              >
                <div className="w-4 h-4 bg-white rounded-sm"></div>
              </div>
              <span 
                className="text-xl font-bold"
                style={{ color: 'var(--theme-text)' }}
              >
                SmartHome
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button 
              className="p-2 rounded-lg hover:opacity-80 transition-all relative"
              style={{ 
                backgroundColor: 'var(--theme-surface)', 
                color: 'var(--theme-textSecondary)'
              }}
            >
              <Bell className="w-5 h-5" />
              <span 
                className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
                style={{ backgroundColor: 'var(--theme-accent)' }}
              ></span>
            </button>
            
            <EditModeToggle />
            
            <button 
              className="p-2 rounded-lg hover:opacity-80 transition-all"
              style={{ 
                backgroundColor: 'var(--theme-surface)', 
                color: 'var(--theme-textSecondary)'
              }}
            >
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
