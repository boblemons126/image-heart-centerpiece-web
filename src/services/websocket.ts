class WebSocketService {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;
  private listeners: Map<string, Set<(data: any) => void>> = new Map();

  connect() {
    // Mock WebSocket connection for demonstration
    this.simulateConnection();
  }

  private simulateConnection() {
    // Simulate WebSocket messages for real-time updates
    setInterval(() => {
      this.simulateDeviceUpdate();
    }, 5000);

    // Simulate connection status
    setTimeout(() => {
      this.notifyListeners('connection', { status: 'connected' });
    }, 1000);
  }

  private simulateDeviceUpdate() {
    const devices = ['device-1', 'device-2', 'device-3', 'device-4'];
    const randomDevice = devices[Math.floor(Math.random() * devices.length)];
    
    const updateData = {
      deviceId: randomDevice,
      properties: {
        brightness: Math.floor(Math.random() * 100),
        temperature: Math.floor(Math.random() * 30) + 18,
        humidity: Math.floor(Math.random() * 40) + 40,
      },
      timestamp: new Date().toISOString(),
    };

    this.notifyListeners('deviceUpdate', updateData);
  }

  subscribe(event: string, callback: (data: any) => void) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(callback);

    return () => {
      this.listeners.get(event)?.delete(callback);
    };
  }

  private notifyListeners(event: string, data: any) {
    this.listeners.get(event)?.forEach(callback => callback(data));
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}

export const websocketService = new WebSocketService();