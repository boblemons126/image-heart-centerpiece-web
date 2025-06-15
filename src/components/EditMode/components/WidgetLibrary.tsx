
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useDraggable } from '@dnd-kit/core';
import { 
  Lightbulb, 
  Thermometer, 
  Camera, 
  Lock, 
  Shield, 
  Activity, 
  Zap, 
  Wifi,
  Grid3X3
} from 'lucide-react';
import { WidgetSearch } from './WidgetSearch';

interface WidgetTemplate {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  category: string;
  type: string;
  template: React.ReactNode;
}

const widgetTemplates: WidgetTemplate[] = [
  {
    id: 'light-widget',
    name: 'Light',
    description: 'Control your smart lights',
    icon: Lightbulb,
    category: 'Control',
    type: 'light',
    template: (
      <div className="flex items-center space-x-3">
        <Lightbulb className="w-6 h-6 text-yellow-500" />
        <span>Light Widget</span>
      </div>
    ),
  },
  {
    id: 'thermostat-widget',
    name: 'Thermostat',
    description: 'Manage your home temperature',
    icon: Thermometer,
    category: 'Control',
    type: 'thermostat',
    template: (
      <div className="flex items-center space-x-3">
        <Thermometer className="w-6 h-6 text-red-500" />
        <span>Thermostat Widget</span>
      </div>
    ),
  },
  {
    id: 'grid-toggle-widget',
    name: 'Grid Toggle',
    description: 'Control multiple devices with a customizable grid',
    icon: Grid3X3,
    category: 'Control',
    type: 'grid-toggle',
    template: (
      <div className="flex items-center space-x-3">
        <Grid3X3 className="w-6 h-6 text-purple-500" />
        <span>Grid Toggle Widget</span>
      </div>
    ),
  },
  {
    id: 'camera-widget',
    name: 'Camera',
    description: 'View your security camera feed',
    icon: Camera,
    category: 'Security',
    type: 'camera',
    template: (
      <div className="flex items-center space-x-3">
        <Camera className="w-6 h-6 text-gray-500" />
        <span>Camera Widget</span>
      </div>
    ),
  },
  {
    id: 'lock-widget',
    name: 'Lock',
    description: 'Control your smart locks',
    icon: Lock,
    category: 'Security',
    type: 'lock',
    template: (
      <div className="flex items-center space-x-3">
        <Lock className="w-6 h-6 text-gray-700" />
        <span>Lock Widget</span>
      </div>
    ),
  },
  {
    id: 'security-widget',
    name: 'Security System',
    description: 'Monitor your home security',
    icon: Shield,
    category: 'Security',
    type: 'security',
    template: (
      <div className="flex items-center space-x-3">
        <Shield className="w-6 h-6 text-blue-500" />
        <span>Security Widget</span>
      </div>
    ),
  },
  {
    id: 'sensor-widget',
    name: 'Motion Sensor',
    description: 'Detect movement in your home',
    icon: Activity,
    category: 'Sensors',
    type: 'sensor',
    template: (
      <div className="flex items-center space-x-3">
        <Activity className="w-6 h-6 text-orange-500" />
        <span>Motion Sensor Widget</span>
      </div>
    ),
  },
  {
    id: 'energy-widget',
    name: 'Energy Monitor',
    description: 'Track your energy usage',
    icon: Zap,
    category: 'Utilities',
    type: 'energy',
    template: (
      <div className="flex items-center space-x-3">
        <Zap className="w-6 h-6 text-yellow-500" />
        <span>Energy Widget</span>
      </div>
    ),
  },
  {
    id: 'network-widget',
    name: 'Network Status',
    description: 'Monitor your network connection',
    icon: Wifi,
    category: 'Utilities',
    type: 'network',
    template: (
      <div className="flex items-center space-x-3">
        <Wifi className="w-6 h-6 text-green-500" />
        <span>Network Widget</span>
      </div>
    ),
  },
];

function DraggableWidgetItem({ widget, onSelect }: { widget: WidgetTemplate; onSelect: (template: WidgetTemplate) => void }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useDraggable({
    id: widget.id,
    data: {
      type: 'widget-template',
      template: widget,
    },
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    backgroundColor: isDragging ? 'var(--theme-primary)' : 'var(--theme-background)',
    color: isDragging ? 'white' : 'var(--theme-text)',
  } : {
    backgroundColor: 'var(--theme-background)',
    color: 'var(--theme-text)',
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={() => !isDragging && onSelect(widget)}
      className={`flex items-center space-x-3 p-4 rounded-lg transition-all duration-200 cursor-grab active:cursor-grabbing ${
        isDragging ? 'opacity-50 scale-105 z-50' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
      }`}
      whileHover={{ scale: isDragging ? 1 : 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <widget.icon className="w-5 h-5" style={{ color: isDragging ? 'white' : 'var(--theme-primary)' }} />
      <div>
        <h4 className="font-medium">{widget.name}</h4>
        <p className="text-sm" style={{ color: isDragging ? 'rgba(255,255,255,0.8)' : 'var(--theme-textSecondary)' }}>
          {widget.description}
        </p>
      </div>
    </motion.div>
  );
}

interface WidgetLibraryProps {
  onSelectWidget: (template: WidgetTemplate) => void;
}

export function WidgetLibrary({ onSelectWidget }: WidgetLibraryProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSelect = (template: WidgetTemplate) => {
    onSelectWidget(template);
  };

  const handleSearch = (query: string) => {
    setSearchTerm(query);
  };

  const filteredWidgets = widgetTemplates.filter(widget =>
    widget.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    widget.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categoryList = [...new Set(widgetTemplates.map(widget => widget.category))];

  return (
    <div className="space-y-4">
      <WidgetSearch onSearch={handleSearch} />

      {searchTerm ? (
        <div className="grid grid-cols-1 gap-2">
          {filteredWidgets.map((widget) => (
            <DraggableWidgetItem
              key={widget.id}
              widget={widget}
              onSelect={handleSelect}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {categoryList.map(category => (
            <div key={category} className="space-y-2">
              <h3 className="font-medium text-sm" style={{ color: 'var(--theme-text)' }}>{category}</h3>
              <div className="grid grid-cols-1 gap-2">
                {widgetTemplates
                  .filter(widget => widget.category === category)
                  .map((widget) => (
                    <DraggableWidgetItem
                      key={widget.id}
                      widget={widget}
                      onSelect={handleSelect}
                    />
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
