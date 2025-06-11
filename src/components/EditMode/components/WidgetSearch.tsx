import React, { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import { Widget, AVAILABLE_WIDGETS } from '../types/widgets';

interface WidgetSearchProps {
  onSelectWidget: (widget: Widget) => void;
}

export function WidgetSearch({ onSelectWidget }: WidgetSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredWidgets = AVAILABLE_WIDGETS.filter(widget =>
    widget.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative">
      <div 
        className="flex items-center gap-2 p-2 bg-slate-800 rounded-md cursor-pointer border border-slate-700"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <Plus className="w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search widgets..."
          className="flex-1 bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none"
          value={searchQuery}
          onChange={(e) => {
            e.stopPropagation();
            setSearchQuery(e.target.value);
            setIsDropdownOpen(true);
          }}
          onClick={(e) => e.stopPropagation()}
        />
        <Search className="w-4 h-4 text-slate-400" />
      </div>

      {isDropdownOpen && (
        <div className="absolute w-full mt-1 py-1 bg-slate-800 rounded-md border border-slate-700 shadow-xl">
          {filteredWidgets.length > 0 ? (
            filteredWidgets.map(widget => (
              <button
                key={widget.id}
                className="w-full px-3 py-2 flex items-center gap-2 text-sm text-slate-300 hover:bg-slate-700/50"
                onClick={() => {
                  onSelectWidget(widget);
                  setIsDropdownOpen(false);
                  setSearchQuery('');
                }}
              >
                <span className="text-lg">{widget.icon}</span>
                {widget.name}
              </button>
            ))
          ) : (
            <div className="px-3 py-2 text-sm text-slate-400">
              No widgets found
            </div>
          )}
        </div>
      )}
    </div>
  );
} 