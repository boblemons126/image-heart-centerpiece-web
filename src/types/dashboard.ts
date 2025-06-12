import { Widget } from './index';

export interface DashboardView {
  id: string;
  title: string;
  path: string;
  widgets: Widget[];
}

export interface DashboardConfig {
  title:string;
  views: DashboardView[];
} 