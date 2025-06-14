
import { useEffect } from 'react';
import { TooltipProvider } from './components/ui/tooltip';
import { Toaster } from './components/ui/sonner';
import { DashboardProvider } from './contexts/DashboardContext';
import { DashboardLayout } from './components/DashboardLayout';
import { websocketService } from './services/websocket';

function App() {
  useEffect(() => {
    // Initialize WebSocket connection
    websocketService.connect();

    return () => {
      websocketService.disconnect();
    };
  }, []);

  return (
    <TooltipProvider>
      <DashboardProvider>
        <DashboardLayout />
      </DashboardProvider>
      <Toaster />
    </TooltipProvider>
  );
}

export default App;
