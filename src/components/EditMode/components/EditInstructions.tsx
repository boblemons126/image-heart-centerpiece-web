import React from 'react';
import { Move, Trash2, Plus, Settings } from 'lucide-react';

export function EditInstructions() {
  return (
    <div className="space-y-3 text-sm text-slate-300">
      <div className="flex items-center gap-2">
        <Plus className="w-4 h-4 text-blue-400" />
        <span>Add widgets using the search above</span>
      </div>
      <div className="flex items-center gap-2">
        <Move className="w-4 h-4 text-green-400" />
        <span>Drag widgets to reposition them</span>
      </div>
      <div className="flex items-center gap-2">
        <Settings className="w-4 h-4 text-purple-400" />
        <span>Click a widget to customize it</span>
      </div>
      <div className="flex items-center gap-2">
        <Trash2 className="w-4 h-4 text-red-400" />
        <span>Hover and click the red button to delete</span>
      </div>
    </div>
  );
}