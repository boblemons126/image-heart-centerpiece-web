import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Lightbulb, 
  Thermometer, 
  Camera, 
  Lock, 
  Shield, 
  Activity, 
  Zap, 
  Wifi,
  Search
} from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../ui/accordion';
import { AspectRatio } from '../../ui/aspect-ratio';
import { WidgetSearch } from './WidgetSearch';

interface WidgetTemplate {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  category: string;
  template: React.ReactNode;
}

const widgetTemplates: WidgetTemplate[] = [
  {
    id: 'light-widget',
    name: 'Light',
    description: 'Control your smart lights',
    icon: Lightbulb,
    category: 'Control',
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
    template: (
      <div className="flex items-center space-x-3">
        <Thermometer className="w-6 h-6 text-red-500" />
        <span>Thermostat Widget</span>
      </div>
    ),
  },
  {
    id: 'camera-widget',
    name: 'Camera',
    description: 'View your security camera feed',
    icon: Camera,
    category: 'Security',
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
    template: (
      <div className="flex items-center space-x-3">
        <Wifi className="w-6 h-6 text-green-500" />
        <span>Network Widget</span>
      </div>
    ),
  },
];

interface WidgetLibraryProps {
  onSelectWidget: (template: any) => void;
}

export function WidgetLibrary({ onSelectWidget }: WidgetLibraryProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSelect = (template: WidgetTemplate) => {
    onSelectWidget(template);
  };

  const filteredWidgets = widgetTemplates.filter(widget =>
    widget.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    widget.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categoryList = [...new Set(widgetTemplates.map(widget => widget.category))];

  return (
    <div className="space-y-4">
      <WidgetSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {searchTerm ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredWidgets.map((widget) => (
            <motion.button
              key={widget.id}
              onClick={() => handleSelect(widget)}
              className="flex items-center space-x-3 p-4 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                backgroundColor: 'var(--theme-background)',
                color: 'var(--theme-text)'
              }}
            >
              <widget.icon className="w-5 h-5" style={{ color: 'var(--theme-primary)' }} />
              <div>
                <h4 className="font-medium">{widget.name}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">{widget.description}</p>
              </div>
            </motion.button>
          ))}
        </div>
      ) : (
        <Accordion type="single" collapsible>
          {categoryList.map(category => (
            <AccordionItem value={category} key={category}>
              <AccordionTrigger className="font-medium text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                {category}
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                  {widgetTemplates
                    .filter(widget => widget.category === category)
                    .map((widget) => (
                      <motion.button
                        key={widget.id}
                        onClick={() => handleSelect(widget)}
                        className="flex items-center space-x-3 p-4 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                          backgroundColor: 'var(--theme-background)',
                          color: 'var(--theme-text)'
                        }}
                      >
                        <widget.icon className="w-5 h-5" style={{ color: 'var(--theme-primary)' }} />
                        <div>
                          <h4 className="font-medium">{widget.name}</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{widget.description}</p>
                        </div>
                      </motion.button>
                    ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
}
