import React, { useEffect } from 'react';
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

  return <DashboardLayout />;
}

export default App;