import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Lightbulb, Thermometer, Shield, Camera, Lock, Activity, Search, X, Plus } from 'lucide-react';
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
        hover:scale-[1.02] hover:shadow-lg
        ${isDragging ? 'opacity-70 scale-105 shadow-xl rotate-2' : ''}
        group select-none
      `}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
    >
      <div className="flex items-center gap-3">
        <div className={`p-2.5 rounded-xl bg-white/80 shadow-sm ${template.color}`}>
          <IconComponent className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-800 text-sm leading-tight">
            {template.name}
          </h4>
          <p className="text-xs text-gray-600 mt-0.5 leading-tight">
            {template.description}
          </p>
        </div>
      </div>
      
      {/* Drag indicator */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex space-x-0.5">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-1 h-1 bg-gray-400 rounded-full"></div>
          ))}
        </div>
      </div>

      {/* Drag helper text */}
      {isDragging && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/95 rounded-xl border-2 border-dashed border-blue-400">
          <span className="text-xs font-semibold text-blue-600">Drop on dashboard</span>
        </div>
      )}
    </motion.div>
  );
}

interface WidgetLibraryProps {
  onSelectWidget: (template: any) => void;
}

export function WidgetLibrary({ onSelectWidget }: WidgetLibraryProps) {
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
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search widgets..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-10 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all text-sm"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
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
                ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                : 'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-700 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs">
        <span className="text-gray-500 dark:text-gray-400">
          {filteredWidgets.length} widget{filteredWidgets.length !== 1 ? 's' : ''} available
        </span>
        <span className="text-gray-400 dark:text-gray-500 flex items-center gap-1">
          <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
          Drag to add
        </span>
      </div>

      {/* Widget Grid */}
      <div className="space-y-3 max-h-80 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-300 dark:scrollbar-thumb-slate-600">
        <AnimatePresence mode="popLayout">
          {filteredWidgets.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: index * 0.05 }}
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
          className="text-center py-12"
        >
          <div className="w-16 h-16 bg-gray-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="font-medium text-gray-900 dark:text-white mb-2">No widgets found</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Try adjusting your search or browse different categories
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
          >
            Clear filters
          </button>
        </motion.div>
      )}
    </div>
  );
}