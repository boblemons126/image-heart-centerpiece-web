import { Move, Trash2, Grip, Settings, Sparkles, MousePointer, Zap } from 'lucide-react';

export function EditInstructions() {
  const instructions = [
    {
      icon: Grip,
      title: 'Drag & Drop',
      description: 'Drag widgets from the library to your dashboard',
      color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
      borderColor: 'border-blue-200 dark:border-blue-800',
    },
    {
      icon: Move,
      title: 'Rearrange',
      description: 'Drag existing widgets to reposition them',
      color: 'bg-green-500/10 text-green-600 dark:text-green-400',
      borderColor: 'border-green-200 dark:border-green-800',
    },
    {
      icon: Settings,
      title: 'Customize',
      description: 'Click widgets to change their settings',
      color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
      borderColor: 'border-purple-200 dark:border-purple-800',
    },
    {
      icon: Trash2,
      title: 'Remove',
      description: 'Hover over widgets and click the delete button',
      color: 'bg-red-500/10 text-red-600 dark:text-red-400',
      borderColor: 'border-red-200 dark:border-red-800',
    },
  ];

  const tips = [
    {
      icon: MousePointer,
      text: 'Hold and drag widgets to see drop zones',
    },
    {
      icon: Zap,
      text: 'Changes are saved automatically',
    },
    {
      icon: Sparkles,
      text: 'Use different widget sizes for better layouts',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Main Instructions */}
      <div className="space-y-3">
        {instructions.map((instruction, index) => {
          const Icon = instruction.icon;
          return (
            <div
              key={index}
              className={`p-4 rounded-xl border ${instruction.borderColor} ${instruction.color} transition-all hover:scale-[1.02]`}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white/80 dark:bg-slate-800/80 rounded-lg shadow-sm">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                    {instruction.title}
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                    {instruction.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tips Section */}
      <div className="pt-4 border-t border-gray-200 dark:border-slate-700">
        <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-yellow-500" />
          Pro Tips
        </h4>
        <div className="space-y-2">
          {tips.map((tip, index) => {
            const Icon = tip.icon;
            return (
              <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                <Icon className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  {tip.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Keyboard Shortcuts */}
      <div className="pt-4 border-t border-gray-200 dark:border-slate-700">
        <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-3">
          Keyboard Shortcuts
        </h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-600 dark:text-gray-400">Exit edit mode</span>
            <kbd className="px-2 py-1 bg-gray-100 dark:bg-slate-800 rounded text-xs font-mono">Esc</kbd>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-600 dark:text-gray-400">Save changes</span>
            <div className="flex gap-1">
              <kbd className="px-2 py-1 bg-gray-100 dark:bg-slate-800 rounded text-xs font-mono">Ctrl</kbd>
              <kbd className="px-2 py-1 bg-gray-100 dark:bg-slate-800 rounded text-xs font-mono">S</kbd>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}