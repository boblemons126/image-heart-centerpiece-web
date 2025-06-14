
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { motion } from 'framer-motion';
import { WidgetGrid } from './WidgetGrid';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { EditModeProvider } from './EditMode/EditModeProvider';
import { EditModeOverlay } from './EditMode/EditModeOverlay';

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <EditModeProvider>
      <DndProvider backend={HTML5Backend}>
        <div 
          className="min-h-screen transition-all duration-300"
          style={{ 
            background: `linear-gradient(135deg, var(--theme-background) 0%, var(--theme-surface) 50%, var(--theme-background) 100%)`,
          }}
        >
          <Header />
          <EditModeOverlay />
          
          <div className="flex">
            <Sidebar />
            
            <main className="flex-1 p-6 ml-64">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-7xl mx-auto"
              >
                <div className="mb-8">
                  <h1 
                    className="text-4xl font-bold mb-2"
                    style={{ color: 'var(--theme-text)' }}
                  >
                    Smart Home Dashboard
                  </h1>
                  <p style={{ color: 'var(--theme-textSecondary)' }}>
                    Control and monitor all your smart devices from one place
                  </p>
                </div>
                
                <WidgetGrid />
                {children}
              </motion.div>
            </main>
          </div>
        </div>
      </DndProvider>
    </EditModeProvider>
  );
}
