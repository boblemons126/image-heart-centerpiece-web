import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Palette, X } from 'lucide-react';
import { useEditMode } from './EditModeProvider';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { getAllThemes, getThemeById, applyTheme } from '../../themes/themeManager';
import { builtInThemes } from '../../themes/themeManager';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface WidgetCustomizerProps {
  onClose: () => void;
  widgetTemplate: any;
}

export function WidgetCustomizer({ onClose, widgetTemplate }: WidgetCustomizerProps) {
  const { setEditMode } = useEditMode();
  const [selectedTheme, setSelectedTheme] = useState('dark');
  const availableThemes = getAllThemes();

  const handleThemeChange = (themeId: string) => {
    setSelectedTheme(themeId);
    const theme = getThemeById(themeId);
    if (theme) {
      applyTheme(theme);
    }
    console.log('Theme changed to:', themeId);
  };

  const data = [
    { name: 'Jan', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Feb', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Mar', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Apr', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'May', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Jun', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Jul', uv: 3490, pv: 4300, amt: 2100 },
  ];

  return (
    <motion.div
      initial={{ x: 400, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 400, opacity: 0 }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="fixed top-4 left-4 z-50 w-96 max-h-[calc(100vh-2rem)] flex flex-col bg-white border border-gray-200 rounded-2xl shadow-2xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-blue-500">
            <Settings className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-900">Widget Settings</h3>
            <p className="text-xs text-gray-500">Customize your widget</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-red-500/20 rounded-lg transition-all group"
        >
          <X className="w-4 h-4 group-hover:text-red-500 transition-colors" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 h-full overflow-y-auto">
        <Tabs defaultValue="theme" className="w-full">
          <TabsList>
            <TabsTrigger value="theme">Theme</TabsTrigger>
            <TabsTrigger value="data">Data</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="theme">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Theme Selection</h4>
              <p className="text-sm text-gray-500">Choose your dashboard appearance</p>
              {/* Theme Selection */}
            </div>
          </TabsContent>
          <TabsContent value="data">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Data Configuration</h4>
              <p className="text-sm text-gray-500">Configure the data source for this widget</p>
              {/* Data Configuration */}
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart
                  data={data}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="pv" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          <TabsContent value="settings">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Widget Settings</h4>
              <p className="text-sm text-gray-500">Configure the general settings for this widget</p>
              {/* Widget Settings */}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={onClose}
          className="w-full py-3 text-white rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
          style={{ background: `linear-gradient(135deg, var(--theme-primary), var(--theme-accent))` }}
        >
          <span>Apply Changes</span>
        </button>
      </div>
    </motion.div>
  );
}
