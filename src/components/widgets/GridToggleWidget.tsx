
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Grid3X3, Settings, Plus } from 'lucide-react';
import { Device, Widget } from '../../types';

interface GridItem {
  id: string;
  name: string;
  action: string;
  color: string;
  icon: string;
  isActive: boolean;
}

interface GridToggleWidgetProps {
  device: Device;
  widget: Widget;
  onToggle: () => void;
  onUpdate: (updates: any) => void;
}

export function GridToggleWidget({ device, widget, onToggle, onUpdate }: GridToggleWidgetProps) {
  const [gridItems, setGridItems] = useState<GridItem[]>([
    { id: '1', name: 'Badrum', action: 'toggle_light', color: '#8B5A2B', icon: '💡', isActive: false },
    { id: '2', name: 'Fläkt', action: 'toggle_fan', color: '#E74C3C', icon: '🔄', isActive: true },
    { id: '3', name: 'Garderob', action: 'toggle_closet', color: '#9B59B6', icon: '👔', isActive: false },
    { id: '4', name: 'Hall', action: 'toggle_hall', color: '#D2691E', icon: '🚪', isActive: false },
    { id: '5', name: 'Sänglampor', action: 'toggle_bed_lights', color: '#FF6B35', icon: '💡', isActive: true },
    { id: '6', name: 'Klimat', action: 'toggle_climate', color: '#E74C3C', icon: '🌡️', isActive: false },
    { id: '7', name: 'Playstation', action: 'toggle_ps', color: '#2ECC71', icon: '🎮', isActive: true },
    { id: '8', name: 'TV', action: 'toggle_tv', color: '#3498DB', icon: '📺', isActive: false },
  ]);

  const [selectedCount, setSelectedCount] = useState(8);

  const handleItemToggle = (itemId: string) => {
    setGridItems(items => 
      items.map(item => 
        item.id === itemId ? { ...item, isActive: !item.isActive } : item
      )
    );
  };

  const visibleItems = gridItems.slice(0, selectedCount);

  return (
    <div 
      className="p-6 rounded-2xl h-full flex flex-col relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 50%, #45B7D1 100%)',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
            <Grid3X3 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-white text-lg">Grid Toggle</h3>
            <p className="text-white/80 text-sm">{selectedCount} items active</p>
          </div>
        </div>
        <button className="p-2 bg-white/20 rounded-lg backdrop-blur-sm hover:bg-white/30 transition-all">
          <Settings className="w-4 h-4 text-white" />
        </button>
      </div>

      {/* Grid Count Selector */}
      <div className="mb-4">
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-white/80 text-sm">Grid Size:</span>
          <select 
            value={selectedCount}
            onChange={(e) => setSelectedCount(Number(e.target.value))}
            className="bg-white/20 backdrop-blur-sm text-white text-sm rounded px-2 py-1 border-none outline-none"
          >
            {[1,2,3,4,5,6,7,8].map(num => (
              <option key={num} value={num} className="text-gray-800">{num} items</option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid Items */}
      <div className="flex-1 grid grid-cols-2 gap-3 auto-rows-fr">
        {visibleItems.map((item, index) => (
          <motion.button
            key={item.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => handleItemToggle(item.id)}
            className={`p-3 rounded-xl relative overflow-hidden transition-all duration-200 ${
              item.isActive 
                ? 'ring-2 ring-white shadow-lg transform scale-105' 
                : 'hover:scale-102'
            }`}
            style={{
              backgroundColor: item.color,
              opacity: item.isActive ? 1 : 0.7,
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex flex-col items-start text-left">
              <div className="text-lg mb-1">{item.icon}</div>
              <div className="text-white font-medium text-sm leading-tight">
                {item.name}
              </div>
              <div className="text-white/70 text-xs mt-1">
                {item.isActive ? 'På' : 'Av'}
              </div>
            </div>
            
            {/* Active indicator */}
            {item.isActive && (
              <div className="absolute top-2 right-2 w-2 h-2 bg-white rounded-full"></div>
            )}
          </motion.button>
        ))}

        {/* Add more items button if less than 8 */}
        {selectedCount < 8 && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-3 rounded-xl bg-white/20 backdrop-blur-sm border-2 border-dashed border-white/40 flex flex-col items-center justify-center text-white/60 hover:text-white hover:bg-white/30 transition-all"
          >
            <Plus className="w-6 h-6 mb-1" />
            <span className="text-xs">Add Item</span>
          </motion.button>
        )}
      </div>

      {/* Status Footer */}
      <div className="mt-4 pt-3 border-t border-white/20">
        <div className="flex justify-between items-center text-white/80 text-sm">
          <span>{visibleItems.filter(item => item.isActive).length} active</span>
          <span>{visibleItems.filter(item => !item.isActive).length} inactive</span>
        </div>
      </div>
    </div>
  );
}
