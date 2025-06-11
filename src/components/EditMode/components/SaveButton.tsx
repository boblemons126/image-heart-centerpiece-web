import React from 'react';
import { Save } from 'lucide-react';

interface SaveButtonProps {
  onClick: () => void;
}

export function SaveButton({ onClick }: SaveButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2"
    >
      <Save className="w-4 h-4" />
      Save Changes
    </button>
  );
} 