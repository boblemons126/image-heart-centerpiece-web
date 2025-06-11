export interface Widget {
  id: string;
  name: string;
  icon: string;
}

export const AVAILABLE_WIDGETS: Widget[] = [
  { id: 'weather', name: 'Weather', icon: '🌤️' },
  { id: 'clock', name: 'Clock', icon: '🕐' },
  { id: 'calendar', name: 'Calendar', icon: '📅' },
  { id: 'todo', name: 'Todo List', icon: '✓' },
  { id: 'timer', name: 'Timer', icon: '⏲️' },
]; 