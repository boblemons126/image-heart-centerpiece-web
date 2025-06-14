
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  Settings, 
  Users, 
  Calendar, 
  BarChart3, 
  Folder,
  ChevronRight,
  ChevronDown
} from 'lucide-react';

export function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <motion.aside
      initial={{ x: -240 }}
      animate={{ x: isExpanded ? 0 : -240 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-0 left-0 h-full w-64 border-r z-40"
      style={{ 
        backgroundColor: 'var(--theme-surface)', 
        borderColor: 'var(--theme-border)',
        color: 'var(--theme-text)'
      }}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between py-4 px-6 border-b" style={{ borderColor: 'var(--theme-border)' }}>
        <span className="text-lg font-semibold" style={{ color: 'var(--theme-text)' }}>
          SmartHome
        </span>
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-lg transition-all"
          style={{ backgroundColor: 'var(--theme-background)' }}
        >
          {isExpanded ? (
            <ChevronRight className="w-5 h-5" style={{ color: 'var(--theme-textSecondary)' }} />
          ) : (
            <ChevronDown className="w-5 h-5" style={{ color: 'var(--theme-textSecondary)' }} />
          )}
        </button>
      </div>

      {/* Sidebar Content */}
      <nav className="py-4 px-2">
        <ul>
          <li className="mb-1">
            <a
              href="#"
              className="flex items-center py-3 px-5 rounded-lg transition-all"
              style={{ backgroundColor: 'var(--theme-background)' }}
            >
              <Home className="w-5 h-5 mr-3" style={{ color: 'var(--theme-textSecondary)' }} />
              <span style={{ color: 'var(--theme-text)' }}>Dashboard</span>
            </a>
          </li>
          <li className="mb-1">
            <a
              href="#"
              className="flex items-center py-3 px-5 rounded-lg transition-all"
              style={{ backgroundColor: 'var(--theme-background)' }}
            >
              <Users className="w-5 h-5 mr-3" style={{ color: 'var(--theme-textSecondary)' }} />
              <span style={{ color: 'var(--theme-text)' }}>Users</span>
            </a>
          </li>
          <li className="mb-1">
            <a
              href="#"
              className="flex items-center py-3 px-5 rounded-lg transition-all"
              style={{ backgroundColor: 'var(--theme-background)' }}
            >
              <Calendar className="w-5 h-5 mr-3" style={{ color: 'var(--theme-textSecondary)' }} />
              <span style={{ color: 'var(--theme-text)' }}>Calendar</span>
            </a>
          </li>
          <li className="mb-1">
            <a
              href="#"
              className="flex items-center py-3 px-5 rounded-lg transition-all"
              style={{ backgroundColor: 'var(--theme-background)' }}
            >
              <BarChart3 className="w-5 h-5 mr-3" style={{ color: 'var(--theme-textSecondary)' }} />
              <span style={{ color: 'var(--theme-text)' }}>Analytics</span>
            </a>
          </li>
          <li className="mb-1">
            <a
              href="#"
              className="flex items-center py-3 px-5 rounded-lg transition-all"
              style={{ backgroundColor: 'var(--theme-background)' }}
            >
              <Folder className="w-5 h-5 mr-3" style={{ color: 'var(--theme-textSecondary)' }} />
              <span style={{ color: 'var(--theme-text)' }}>Files</span>
            </a>
          </li>
          <li className="mb-1">
            <a
              href="#"
              className="flex items-center py-3 px-5 rounded-lg transition-all"
              style={{ backgroundColor: 'var(--theme-background)' }}
            >
              <Settings className="w-5 h-5 mr-3" style={{ color: 'var(--theme-textSecondary)' }} />
              <span style={{ color: 'var(--theme-text)' }}>Settings</span>
            </a>
          </li>
        </ul>
      </nav>
    </motion.aside>
  );
}
