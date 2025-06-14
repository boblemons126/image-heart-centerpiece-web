import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Grid3X3, 
  ChevronRight, 
  Save, 
  Settings, 
  Palette,
  Layout,
  Sparkles,
  Info
} from 'lucide-react';
import { useEditMode } from './EditModeProvider';
import { WidgetLibrary } from './components/WidgetLibrary';
import { EditInstructions } from './components/EditInstructions';

interface EditModePanelProps {
  onSelectWidget: (template: any) => void;
}

export function EditModePanel({ onSelectWidget }: EditModePanelProps) {
  const { setEditMode } = useEditMode();
  const [activeTab, setActiveTab] = useState<'widgets' | 'settings' | 'help'>('widgets');
  const [isMinimized, setIsMinimized] = useState(false);

  const tabs = [
    { id: 'widgets', label: 'Widgets', icon: Grid3X3 },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'help', label: 'Help', icon: Info },
  ];

  return (
    <motion.div
      initial={{ x: 400, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 400, opacity: 0 }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="fixed top-4 right-4 z-50 w-80 max-h-[calc(100vh-2rem)] flex flex-col"
      style={{ pointerEvents: 'auto' }} // Ensure the panel can receive pointer events
    >
      {/* Header */}
      <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-gray-200/50 dark:border-slate-700/50 rounded-t-2xl shadow-2xl">
        <div className="flex items-center justify-between p-4 border-b border-gray-200/50 dark:border-slate-700/50">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
              <Layout className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                Dashboard Editor
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Customize your smart home
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              <ChevronRight 
                className={`w-4 h-4 text-gray-500 transition-transform ${
                  isMinimized ? 'rotate-180' : 'rotate-90'
                }`} 
              />
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors group"
            >
              <X className="w-4 h-4 text-gray-500 group-hover:text-red-600" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        {!isMinimized && (
          <div className="flex border-b border-gray-200/50 dark:border-slate-700/50">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 text-sm font-medium transition-all relative ${
                    activeTab === tab.id
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-900/20'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"
                    />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {!isMinimized && (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-x border-gray-200/50 dark:border-slate-700/50 flex-1 overflow-hidden"
          >
            <div className="p-4 h-full overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-300 dark:scrollbar-thumb-slate-600">
              {activeTab === 'widgets' && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <Sparkles className="w-5 h-5 text-purple-500" />
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      Add Widgets
                    </h4>
                  </div>
                  <WidgetLibrary onSelectWidget={onSelectWidget} />
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <Palette className="w-5 h-5 text-green-500" />
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      Dashboard Settings
                    </h4>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="p-4 bg-gray-50 dark:bg-slate-800/50 rounded-xl border border-gray-200/50 dark:border-slate-700/50">
                      <h5 className="font-medium text-gray-900 dark:text-white mb-2">
                        Grid Layout
                      </h5>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        Adjust the grid size and spacing
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        <button className="p-2 bg-white dark:bg-slate-700 rounded-lg border border-gray-200 dark:border-slate-600 text-sm hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors">
                          Compact
                        </button>
                        <button className="p-2 bg-blue-500 text-white rounded-lg text-sm">
                          Default
                        </button>
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 dark:bg-slate-800/50 rounded-xl border border-gray-200/50 dark:border-slate-700/50">
                      <h5 className="font-medium text-gray-900 dark:text-white mb-2">
                        Theme
                      </h5>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        Choose your dashboard appearance
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        <button className="p-2 bg-white dark:bg-slate-700 rounded-lg border border-gray-200 dark:border-slate-600 text-xs hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors">
                          Light
                        </button>
                        <button className="p-2 bg-gray-800 text-white rounded-lg text-xs">
                          Dark
                        </button>
                        <button className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg text-xs">
                          Auto
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'help' && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <Info className="w-5 h-5 text-blue-500" />
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      How to Use
                    </h4>
                  </div>
                  <EditInstructions />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      {!isMinimized && (
        <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-gray-200/50 dark:border-slate-700/50 rounded-b-2xl shadow-2xl p-4">
          <button
            onClick={() => setEditMode(false)}
            className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
          >
            <Save className="w-4 h-4" />
            <span>Save & Exit</span>
          </button>
        </div>
      )}
    </motion.div>
  );
}