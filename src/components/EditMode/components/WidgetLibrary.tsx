
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Lightbulb, Thermometer, Shield, Camera, Lock, Activity, Search, X, Grid3X3 } from 'lucide-react';
import { useDraggable } from '@dnd-kit/core';

interface WidgetTemplate {
  id: string;
  name: string;
  type: string;
  icon: React.ComponentType<any>;
  description: string;
  category: string;
  color: string;
  bgGradient: string;
}

const WIDGET_TEMPLATES: WidgetTemplate[] = [
  {
    id: 'light-template',
    name: 'Smart Light',
    type: 'light',
    icon: Lightbulb,
    description: 'Control brightness and color',
    category: 'Lighting',
    color: 'text-yellow-600',
    bgGradient: 'from-yellow-100 to-amber-100 border-yellow-200',
  },
  {
    id: 'thermostat-template',
    name: 'Thermostat',
    type: 'thermostat',
    icon: Thermometer,
    description: 'Temperature control',
    category: 'Climate',
    color: 'text-blue-600',
    bgGradient: 'from-blue-100 to-cyan-100 border-blue-200',
  },
  {
    id: 'security-template',
    name: 'Security System',
    type: 'security',
    icon: Shield,
    description: 'Arm/disarm security',
    category: 'Security',
    color: 'text-green-600',
    bgGradient: 'from-green-100 to-emerald-100 border-green-200',
  },
  {
    id: 'camera-template',
    name: 'Security Camera',
    type: 'camera',
    icon: Camera,
    description: 'Live feed and recording',
    category: 'Security',
    color: 'text-purple-600',
    bgGradient: 'from-purple-100 to-violet-100 border-purple-200',
  },
  {
    id: 'lock-template',
    name: 'Smart Lock',
    type: 'lock',
    icon: Lock,
    description: 'Lock/unlock doors',
    category: 'Security',
    color: 'text-red-600',
    bgGradient: 'from-red-100 to-pink-100 border-red-200',
  },
  {
    id: 'sensor-template',
    name: 'Motion Sensor',
    type: 'sensor',
    icon: Activity,
    description: 'Motion detection',
    category: 'Sensors',
    color: 'text-orange-600',
    bgGradient: 'from-orange-100 to-amber-100 border-orange-200',
  },
];

interface DraggableWidgetProps {
  template: WidgetTemplate;
}

function DraggableWidget({ template }: DraggableWidgetProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: template.id,
    data: {
      type: 'widget-template',
      template,
    },
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    zIndex: 1000,
  } : undefined;

  const IconComponent = template.icon;

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`
        relative p-4 rounded-xl border-2 cursor-grab active:cursor-grabbing
        bg-gradient-to-br ${template.bgGradient}
        backdrop-blur-sm transition-all duration-200
        hover:scale-[1.02] hover:shadow-md
        ${isDragging ? 'opacity-70 scale-105 shadow-xl rotate-3' : ''}
        group select-none
      `}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg bg-white/70 ${template.color}`}>
          <IconComponent className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-800 text-sm">
            {template.name}
          </h4>
          <p className="text-xs text-gray-600 mt-0.5">
            {template.description}
          </p>
        </div>
      </div>
      
      {/* Drag indicator dots */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex flex-col gap-0.5">
          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
        </div>
      </div>

      {/* Drag helper text */}
      {isDragging && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/90 rounded-xl">
          <span className="text-xs font-medium text-gray-600">Drop on dashboard</span>
        </div>
      )}
    </motion.div>
  );
}

interface WidgetLibraryProps {
  // onSelectWidget prop is kept for interface compatibility but not used in the drag system
}

export function WidgetLibrary({}: WidgetLibraryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(WIDGET_TEMPLATES.map(w => w.category)))];
  
  const filteredWidgets = WIDGET_TEMPLATES.filter(widget => {
    const matchesSearch = widget.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         widget.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || widget.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-4">
      {/* Library Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-white/10 hover:bg-white/20 rounded-xl border border-white/20 transition-all duration-200 group"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors">
            <Grid3X3 className="w-5 h-5 text-blue-400" />
          </div>
          <div className="text-left">
            <span className="text-white font-semibold text-sm">Add Widgets</span>
            <p className="text-slate-300 text-xs">Drag widgets to your dashboard</p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4 text-slate-400" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search widgets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all text-sm"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all ${
                      selectedCategory === category
                        ? 'bg-blue-500/30 text-blue-200 border border-blue-400/50'
                        : 'bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white border border-transparent'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Results Count */}
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">
                  {filteredWidgets.length} widget{filteredWidgets.length !== 1 ? 's' : ''}
                </span>
                <span className="text-slate-500 flex items-center gap-1">
                  <span className="w-1 h-1 bg-slate-500 rounded-full"></span>
                  Drag to add
                </span>
              </div>

              {/* Widget Grid */}
              <div className="grid grid-cols-1 gap-3 max-h-72 overflow-y-auto pr-1 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/20">
                <AnimatePresence mode="popLayout">
                  {filteredWidgets.map((template, index) => (
                    <motion.div
                      key={template.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ delay: index * 0.03 }}
                    >
                      <DraggableWidget template={template} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Empty State */}
              {filteredWidgets.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-8 text-slate-400"
                >
                  <Search className="w-8 h-8 mx-auto mb-3 opacity-50" />
                  <p className="text-sm font-medium">No widgets found</p>
                  <p className="text-xs mt-1">Try different keywords or clear your search</p>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
