
import { useState, useRef, useEffect } from 'react';
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
  Info,
  GripVertical
} from 'lucide-react';
import { useEditMode } from './EditModeProvider';
import { WidgetLibrary } from './components/WidgetLibrary';
import { EditInstructions } from './components/EditInstructions';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { getAllThemes, getThemeById, applyTheme } from '../../themes/themeManager';

interface EditModePanelProps {
  onSelectWidget: (template: any) => void;
}

export function EditModePanel({ onSelectWidget }: EditModePanelProps) {
  const { setEditMode } = useEditMode();
  const [activeTab, setActiveTab] = useState<'widgets' | 'settings' | 'help'>('widgets');
  const [isMinimized, setIsMinimized] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState('dark');
  const dragRef = useRef<HTMLDivElement>(null);

  const availableThemes = getAllThemes();

  // Load the current theme on component mount
  useEffect(() => {
    const savedThemeId = localStorage.getItem('selected-theme') || 'dark';
    setSelectedTheme(savedThemeId);
  }, []);

  const tabs = [
    { id: 'widgets', label: 'Widgets', icon: Grid3X3 },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'help', label: 'Help', icon: Info },
  ];

  const handleThemeChange = (themeId: string) => {
    setSelectedTheme(themeId);
    const theme = getThemeById(themeId);
    if (theme) {
      applyTheme(theme);
    }
    console.log('Theme changed to:', themeId);
  };

  return (
    <motion.div
      initial={{ x: 0, y: 0, opacity: 0 }}
      animate={{ x: 0, y: 0, opacity: 1 }}
      exit={{ x: 400, opacity: 0 }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="fixed top-4 right-4 z-50 w-80 max-h-[calc(100vh-2rem)] flex flex-col"
      style={{ pointerEvents: 'auto' }}
      drag
      dragMomentum={false}
      dragElastic={0}
      dragConstraints={{
        left: -window.innerWidth / 2,
        right: window.innerWidth / 2,
        top: -window.innerHeight / 2,
        bottom: window.innerHeight / 2,
      }}
      dragListener={false}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      whileDrag={{ cursor: 'grabbing' }}
    >
      {/* Header - Draggable Area */}
      <div 
        ref={dragRef}
        className={`backdrop-blur-xl border border-opacity-50 rounded-t-2xl shadow-2xl ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        style={{ 
          backgroundColor: 'var(--theme-surface)', 
          borderColor: 'var(--theme-border)',
          color: 'var(--theme-text)'
        }}
        onMouseDown={(e) => {
          e.preventDefault();
          const parent = e.currentTarget.parentElement as any;
          if (parent && parent.style) {
            const rect = parent.getBoundingClientRect();
            const offsetX = e.clientX - rect.left;
            const offsetY = e.clientY - rect.top;
            
            const handleMouseMove = (moveEvent: MouseEvent) => {
              const x = moveEvent.clientX - offsetX;
              const y = moveEvent.clientY - offsetY;
              
              // Apply constraints
              const maxX = window.innerWidth - rect.width;
              const maxY = window.innerHeight - rect.height;
              
              const constrainedX = Math.max(0, Math.min(x, maxX));
              const constrainedY = Math.max(0, Math.min(y, maxY));
              
              parent.style.left = `${constrainedX}px`;
              parent.style.top = `${constrainedY}px`;
              parent.style.right = 'auto';
            };
            
            const handleMouseUp = () => {
              setIsDragging(false);
              document.removeEventListener('mousemove', handleMouseMove);
              document.removeEventListener('mouseup', handleMouseUp);
            };
            
            setIsDragging(true);
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
          }
        }}
      >
        <div 
          className="flex items-center justify-between p-4 border-b border-opacity-50"
          style={{ borderColor: 'var(--theme-border)' }}
        >
          <div className="flex items-center space-x-3">
            <div 
              className="p-2 rounded-xl"
              style={{ background: `linear-gradient(135deg, var(--theme-primary), var(--theme-accent))` }}
            >
              <Layout className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 
                className="font-bold text-lg"
                style={{ color: 'var(--theme-text)' }}
              >
                Dashboard Editor
              </h3>
              <p 
                className="text-xs"
                style={{ color: 'var(--theme-textSecondary)' }}
              >
                Customize your smart home
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div 
              className="p-1 hover:opacity-70 rounded-lg transition-all cursor-grab active:cursor-grabbing"
              style={{ backgroundColor: 'var(--theme-background)' }}
            >
              <GripVertical 
                className="w-4 h-4"
                style={{ color: 'var(--theme-textSecondary)' }}
              />
            </div>
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-2 hover:opacity-70 rounded-lg transition-all"
              style={{ backgroundColor: 'var(--theme-background)' }}
              onMouseDown={(e) => e.stopPropagation()}
            >
              <ChevronRight 
                className={`w-4 h-4 transition-transform ${
                  isMinimized ? 'rotate-180' : 'rotate-90'
                }`}
                style={{ color: 'var(--theme-textSecondary)' }}
              />
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="p-2 hover:bg-red-500/20 rounded-lg transition-all group"
              style={{ backgroundColor: 'var(--theme-background)' }}
              onMouseDown={(e) => e.stopPropagation()}
            >
              <X 
                className="w-4 h-4 group-hover:text-red-500 transition-colors"
                style={{ color: 'var(--theme-textSecondary)' }}
              />
            </button>
          </div>
        </div>

        {/* Tabs */}
        {!isMinimized && (
          <div 
            className="flex border-b border-opacity-50"
            style={{ borderColor: 'var(--theme-border)' }}
            onMouseDown={(e) => e.stopPropagation()}
          >
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 text-sm font-medium transition-all relative hover:opacity-80`}
                  style={{ 
                    color: activeTab === tab.id ? 'var(--theme-primary)' : 'var(--theme-textSecondary)',
                    backgroundColor: activeTab === tab.id ? 'var(--theme-background)' : 'transparent'
                  }}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5"
                      style={{ backgroundColor: 'var(--theme-primary)' }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Content - Not draggable */}
      <AnimatePresence mode="wait">
        {!isMinimized && (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="backdrop-blur-xl border-x border-opacity-50 flex-1 overflow-hidden"
            style={{ 
              backgroundColor: 'var(--theme-surface)', 
              borderColor: 'var(--theme-border)',
              pointerEvents: 'auto'
            }}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="p-4 h-full overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-300 dark:scrollbar-thumb-slate-600">
              {activeTab === 'widgets' && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <Sparkles 
                      className="w-5 h-5"
                      style={{ color: 'var(--theme-accent)' }}
                    />
                    <h4 
                      className="font-semibold"
                      style={{ color: 'var(--theme-text)' }}
                    >
                      Add Widgets
                    </h4>
                  </div>
                  <WidgetLibrary onSelectWidget={onSelectWidget} />
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <Palette 
                      className="w-5 h-5"
                      style={{ color: 'var(--theme-primary)' }}
                    />
                    <h4 
                      className="font-semibold"
                      style={{ color: 'var(--theme-text)' }}
                    >
                      Dashboard Settings
                    </h4>
                  </div>
                  
                  <div className="space-y-3">
                    <div 
                      className="p-4 rounded-xl border border-opacity-50"
                      style={{ 
                        backgroundColor: 'var(--theme-background)', 
                        borderColor: 'var(--theme-border)'
                      }}
                    >
                      <h5 
                        className="font-medium mb-2"
                        style={{ color: 'var(--theme-text)' }}
                      >
                        Grid Layout
                      </h5>
                      <p 
                        className="text-sm mb-3"
                        style={{ color: 'var(--theme-textSecondary)' }}
                      >
                        Adjust the grid size and spacing
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        <button 
                          className="p-2 rounded-lg border text-sm hover:opacity-80 transition-all"
                          style={{ 
                            backgroundColor: 'var(--theme-surface)', 
                            borderColor: 'var(--theme-border)',
                            color: 'var(--theme-text)'
                          }}
                        >
                          Compact
                        </button>
                        <button 
                          className="p-2 rounded-lg text-sm text-white"
                          style={{ backgroundColor: 'var(--theme-primary)' }}
                        >
                          Default
                        </button>
                      </div>
                    </div>

                    <div 
                      className="p-4 rounded-xl border border-opacity-50"
                      style={{ 
                        backgroundColor: 'var(--theme-background)', 
                        borderColor: 'var(--theme-border)'
                      }}
                    >
                      <h5 
                        className="font-medium mb-2"
                        style={{ color: 'var(--theme-text)' }}
                      >
                        Theme
                      </h5>
                      <p 
                        className="text-sm mb-3"
                        style={{ color: 'var(--theme-textSecondary)' }}
                      >
                        Choose your dashboard appearance
                      </p>
                      <Select value={selectedTheme} onValueChange={handleThemeChange}>
                        <SelectTrigger 
                          className="w-full border z-50"
                          style={{ 
                            backgroundColor: 'var(--theme-surface)', 
                            borderColor: 'var(--theme-border)',
                            color: 'var(--theme-text)'
                          }}
                        >
                          <SelectValue placeholder="Select a theme" />
                        </SelectTrigger>
                        <SelectContent 
                          className="border z-50"
                          style={{ 
                            backgroundColor: 'var(--theme-surface)', 
                            borderColor: 'var(--theme-border)'
                          }}
                        >
                          {availableThemes.map((theme) => (
                            <SelectItem 
                              key={theme.id} 
                              value={theme.id}
                              className="hover:opacity-80 focus:opacity-80"
                              style={{ color: 'var(--theme-text)' }}
                            >
                              <div className="flex items-center space-x-3">
                                <div 
                                  className="w-4 h-4 rounded-full border border-opacity-50"
                                  style={{ 
                                    backgroundColor: theme.colors.primary,
                                    borderColor: 'var(--theme-border)'
                                  }}
                                />
                                <div className="flex flex-col">
                                  <span 
                                    className="font-medium"
                                    style={{ color: 'var(--theme-text)' }}
                                  >
                                    {theme.name}
                                  </span>
                                  <span 
                                    className="text-xs"
                                    style={{ color: 'var(--theme-textSecondary)' }}
                                  >
                                    {theme.description}
                                  </span>
                                </div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'help' && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <Info 
                      className="w-5 h-5"
                      style={{ color: 'var(--theme-accent)' }}
                    />
                    <h4 
                      className="font-semibold"
                      style={{ color: 'var(--theme-text)' }}
                    >
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

      {/* Footer - Not draggable */}
      {!isMinimized && (
        <div 
          className="backdrop-blur-xl border border-opacity-50 rounded-b-2xl shadow-2xl p-4"
          style={{ 
            backgroundColor: 'var(--theme-surface)', 
            borderColor: 'var(--theme-border)'
          }}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => setEditMode(false)}
            className="w-full py-3 text-white rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
            style={{ 
              background: `linear-gradient(135deg, var(--theme-primary), var(--theme-accent))`,
              pointerEvents: 'auto'
            }}
          >
            <Save className="w-4 h-4" />
            <span>Save & Exit</span>
          </button>
        </div>
      )}
    </motion.div>
  );
}
