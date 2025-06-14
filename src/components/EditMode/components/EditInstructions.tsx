
import { Move, Trash2, Grip, Settings } from 'lucide-react';

export function EditInstructions() {
  return (
    <div className="space-y-3 text-sm">
      <div className="flex items-center gap-3">
        <div className="p-1.5 bg-blue-500/20 rounded-md">
          <Grip className="w-3.5 h-3.5 text-blue-400" />
        </div>
        <span className="text-slate-300">Drag widgets from library above</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="p-1.5 bg-green-500/20 rounded-md">
          <Move className="w-3.5 h-3.5 text-green-400" />
        </div>
        <span className="text-slate-300">Drag existing widgets to reposition</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="p-1.5 bg-purple-500/20 rounded-md">
          <Settings className="w-3.5 h-3.5 text-purple-400" />
        </div>
        <span className="text-slate-300">Click widgets to customize them</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="p-1.5 bg-red-500/20 rounded-md">
          <Trash2 className="w-3.5 h-3.5 text-red-400" />
        </div>
        <span className="text-slate-300">Hover and click X to delete widgets</span>
      </div>
    </div>
  );
}
