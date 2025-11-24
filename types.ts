export enum AppType {
  PORTFOLIO = 'PORTFOLIO',
  PROJECTS = 'PROJECTS',
  MAIL = 'MAIL',
  TERMINAL = 'TERMINAL',
  PROJECT_DETAIL = 'PROJECT_DETAIL',
}

export interface ProjectData {
  id: string;
  title: string;
  fileName: string;
  description: string;
  tech: string[];
  features: string[];
  githubUrl: string;
  demoUrl: string;
  status: 'Active' | 'In Progress' | 'Archived';
}

export interface WindowState {
  id: number;
  appType: AppType;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  isMinimized: boolean;
  data?: any; // For passing specific data like project details
}

export interface DragState {
  isDragging: boolean;
  windowId: number | null;
  startX: number;
  startY: number;
  initialX: number;
  initialY: number;
}

export interface ResizeState {
  isResizing: boolean;
  windowId: number | null;
  startX: number;
  startY: number;
  initialWidth: number;
  initialHeight: number;
}