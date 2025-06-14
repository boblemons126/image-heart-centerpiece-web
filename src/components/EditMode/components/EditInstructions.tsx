
import { Move, Trash2, Grip, Settings, Sparkles } from 'lucide-react';

export function EditInstructions() {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
        <div className="p-1.5 bg-blue-500/20 rounded-md">
          <Grip className="w-4 h-4 text-blue-400" />
        </div>
        <div>
          <span className="text-slate-200 text-sm font-medium">Drag & Drop</span>
          <p className="text-slate-400 text-xs">Drag widgets from above to your dashboard</p>
        </div>
      </div>
      
      <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
        <div className="p-1.5 bg-green-500/20 rounded-md">
          <Move className="w-4 h-4 text-green-400" />
        </div>
        <div>
          <span className="text-slate-200 text-sm font-medium">Rearrange</span>
          <p className="text-slate-400 text-xs">Drag existing widgets to reposition them</p>
        </div>
      </div>
      
      <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
        <div className="p-1.5 bg-purple-500/20 rounded-md">
          <Settings className="w-4 h-4 text-purple-400" />
        </div>
        <div>
          <span className="text-slate-200 text-sm font-medium">Customize</span>
          <p className="text-slate-400 text-xs">Click widgets to change their settings</p>
        </div>
      </div>
      
      <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
        <div className="p-1.5 bg-red-500/20 rounded-md">
          <Trash2 className="w-4 h-4 text-red-400" />
        </div>
        <div>
          <span className="text-slate-200 text-sm font-medium">Remove</span>
          <p className="text-slate-400 text-xs">Hover over widgets and click the X button</p>
        </div>
      </div>
    </div>
  );
}
