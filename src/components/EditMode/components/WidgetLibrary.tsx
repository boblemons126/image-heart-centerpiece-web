import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Lightbulb, Thermometer, Shield, Camera, Lock, Activity, Plus, Grip } from 'lucide-react';
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
    color: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  },
  {
    id: 'thermostat-template',
    name: 'Thermostat',
    type: 'thermostat',
    icon: Thermometer,
    description: 'Temperature control',
    category: 'Climate',
    color: 'bg-blue-100 text-blue-700 border-blue-200',
  },
  {
    id: 'security-template',
    name: 'Security System',
    type: 'security',
    icon: Shield,
    description: 'Arm/disarm security',
    category: 'Security',
    color: 'bg-green-100 text-green-700 border-green-200',
  },
  {
    id: 'camera-template',
    name: 'Security Camera',
    type: 'camera',
    icon: Camera,
    description: 'Live feed and recording',
    category: 'Security',
    color: 'bg-purple-100 text-purple-700 border-purple-200',
  },
  {
    id: 'lock-template',
    name: 'Smart Lock',
    type: 'lock',
    icon: Lock,
    description: 'Lock/unlock doors',
    category: 'Security',
    color: 'bg-red-100 text-red-700 border-red-200',
  },
  {
    id: 'sensor-template',
    name: 'Motion Sensor',
    type: 'sensor',
    icon: Activity,
    description: 'Motion detection',
    category: 'Sensors',
    color: 'bg-orange-100 text-orange-700 border-orange-200',
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
  } : undefined;

  const IconComponent = template.icon;

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`
        p-3 rounded-lg border-2 border-dashed cursor-grab active:cursor-grabbing
        transition-all duration-200 hover:scale-105 hover:shadow-md
        ${template.color}
        ${isDragging ? 'opacity-50 scale-110 shadow-lg z-50' : ''}
      `}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 flex-1">
          <IconComponent className="w-5 h-5" />
          <div>
            <div className="font-medium text-sm">{template.name}</div>
            <div className="text-xs opacity-75">{template.description}</div>
          </div>
        </div>
        <Grip className="w-4 h-4 opacity-50" />
      </div>
    </motion.div>
  );
}

interface WidgetLibraryProps {
  onSelectWidget: (template: WidgetTemplate) => void;
}

export function WidgetLibrary({ onSelectWidget }: WidgetLibraryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(WIDGET_TEMPLATES.map(w => w.category)))];
  
  const filteredWidgets = selectedCategory === 'All' 
    ? WIDGET_TEMPLATES 
    : WIDGET_TEMPLATES.filter(w => w.category === selectedCategory);

  return (
    <div className="space-y-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-3 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Plus className="w-4 h-4 text-blue-400" />
          <span className="text-white font-medium">Widget Library</span>
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
            transition={{ duration: 0.2 }}
            className="space-y-3 overflow-hidden"
          >
            {/* Category Filter */}
            <div className="flex flex-wrap gap-1">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-2 py-1 text-xs rounded-md transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Widget Templates */}
            <div className="space-y-2 max-h-64 overflow-y-auto">
              <div className="text-xs text-slate-400 mb-2">
                Drag widgets below to add them to your dashboard
              </div>
              {filteredWidgets.map(template => (
                <DraggableWidget
                  key={template.id}
                  template={template}
                />
              ))}
            </div>

            {filteredWidgets.length === 0 && (
              <div className="text-center py-4 text-slate-400 text-sm">
                No widgets found in this category
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}