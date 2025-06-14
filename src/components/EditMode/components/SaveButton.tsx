
import { Save } from 'lucide-react';

interface SaveButtonProps {
  onClick: () => void;
}

export function SaveButton({ onClick }: SaveButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-full py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 shadow-lg"
    >
      <Save className="w-4 h-4" />
      Save Changes
    </button>
  );
} 
