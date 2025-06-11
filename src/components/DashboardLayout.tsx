import React from 'react';
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
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
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
                  <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    Smart Home Dashboard
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">
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