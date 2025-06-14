
import { useState } from 'react';
import { Search } from 'lucide-react';

interface WidgetSearchProps {
  onSearch: (query: string) => void;
}

export function WidgetSearch({ onSearch }: WidgetSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search widgets..."
        value={searchQuery}
        onChange={handleInputChange}
        className="w-full px-4 py-2 rounded-lg border transition-all duration-200 focus:ring-0 focus:outline-none focus:border-primary-500 text-sm"
        style={{
          backgroundColor: 'var(--theme-background)',
          borderColor: 'var(--theme-border)',
          color: 'var(--theme-text)',
        }}
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <Search className="w-4 h-4" style={{ color: 'var(--theme-textSecondary)' }} />
      </div>
    </div>
  );
}
