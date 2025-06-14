
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Lightbulb, Thermometer, Shield, Camera, Lock, Activity, Plus, Search, X } from 'lucide-react';
import { useDraggable } from '@dnd-kit/core';

interface WidgetTemplate {
  id: string;
  name: string;
  type: string;
  icon: React.ComponentType<any>;
  description: string;
  category: string;
  color: string;
}

const WIDGET_TEMPLATES: WidgetTemplate[] = [
  {
    id: 'light-template',
    name: 'Smart Light',
    type: 'light',
    icon: Lightbulb,
    description: 'Control brightness and color',
    category: 'Lighting',
    color: 'from-yellow-400/20 to-orange-400/20 border-yellow-400/30',
  },
  {
    id: 'thermostat-template',
    name: 'Thermostat',
    type: 'thermostat',
    icon: Thermometer,
    description: 'Temperature control',
    category: 'Climate',
    color: 'from-blue-400/20 to-cyan-400/20 border-blue-400/30',
  },
  {
    id: 'security-template',
    name: 'Security System',
    type: 'security',
    icon: Shield,
    description: 'Arm/disarm security',
    category: 'Security',
    color: 'from-green-400/20 to-emerald-400/20 border-green-400/30',
  },
  {
    id: 'camera-template',
    name: 'Security Camera',
    type: 'camera',
    icon: Camera,
    description: 'Live feed and recording',
    category: 'Security',
    color: 'from-purple-400/20 to-violet-400/20 border-purple-400/30',
  },
  {
    id: 'lock-template',
    name: 'Smart Lock',
    type: 'lock',
    icon: Lock,
    description: 'Lock/unlock doors',
    category: 'Security',
    color: 'from-red-400/20 to-pink-400/20 border-red-400/30',
  },
  {
    id: 'sensor-template',
    name: 'Motion Sensor',
    type: 'sensor',
    icon: Activity,
    description: 'Motion detection',
    category: 'Sensors',
    color: 'from-orange-400/20 to-amber-400/20 border-orange-400/30',
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
        bg-gradient-to-br ${template.color}
        backdrop-blur-sm transition-all duration-200
        hover:scale-105 hover:shadow-lg hover:border-opacity-50
        ${isDragging ? 'opacity-70 scale-110 shadow-2xl z-50' : ''}
        group
      `}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-white/20 backdrop-blur-sm">
          <IconComponent className="w-5 h-5 text-slate-700" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-slate-800 text-sm leading-tight">
            {template.name}
          </h4>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            {template.description}
          </p>
        </div>
      </div>
      
      {/* Drag indicator */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
        <div className="w-2 h-2 bg-slate-400 rounded-full mt-0.5"></div>
        <div className="w-2 h-2 bg-slate-400 rounded-full mt-0.5"></div>
      </div>
    </motion.div>
  );
}

interface WidgetLibraryProps {
  onSelectWidget: (template: WidgetTemplate) => void;
}

export function WidgetLibrary({ onSelectWidget }: WidgetLibraryProps) {
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

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="space-y-3">
      {/* Main Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 rounded-xl border border-slate-600 transition-all duration-200 shadow-lg"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500 rounded-lg">
            <Plus className="w-4 h-4 text-white" />
          </div>
          <div className="text-left">
            <span className="text-white font-semibold">Widget Library</span>
            <p className="text-slate-300 text-xs">Drag widgets to your dashboard</p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-slate-400" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="space-y-4 overflow-hidden bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700"
          >
            {/* Search Bar */}
            <div className="relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search widgets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all ${
                    selectedCategory === category
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50 hover:text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Widget Grid */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-400">
                  {filteredWidgets.length} widget{filteredWidgets.length !== 1 ? 's' : ''} available
                </p>
                <p className="text-xs text-slate-500">
                  Drag to dashboard
                </p>
              </div>
              
              <div className="grid grid-cols-1 gap-3 max-h-80 overflow-y-auto pr-2 scrollbar-thin scrollbar-track-slate-800 scrollbar-thumb-slate-600">
                <AnimatePresence mode="popLayout">
                  {filteredWidgets.map((template, index) => (
                    <motion.div
                      key={template.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <DraggableWidget template={template} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {filteredWidgets.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-8 text-slate-400"
                >
                  <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No widgets match your search</p>
                  <p className="text-xs mt-1">Try different keywords or categories</p>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
