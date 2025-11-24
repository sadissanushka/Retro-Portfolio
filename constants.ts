import { ProjectData } from './types';

export const INITIAL_WINDOW_WIDTH = 500;
export const INITIAL_WINDOW_HEIGHT = 400;

export const PROJECTS: ProjectData[] = [
  {
    id: 'p1',
    title: 'E-Commerce Platform',
    fileName: 'shop_core.js',
    description: 'A full-stack e-commerce solution built with scalability in mind. Features real-time inventory tracking and Stripe integration.',
    tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    features: ['Shopping Cart', 'Payment Gateway', 'Admin Dashboard', 'User Auth'],
    githubUrl: '#',
    demoUrl: '#',
    status: 'Active'
  },
  {
    id: 'p2',
    title: 'Portfolio CMS',
    fileName: 'cms_engine.ts',
    description: 'A headless CMS designed specifically for creative portfolios. Allows designers to manage content without touching code.',
    tech: ['Next.js', 'Prisma', 'PostgreSQL', 'Tailwind'],
    features: ['Rich Text Editor', 'Image Optimization', 'API Generation'],
    githubUrl: '#',
    demoUrl: '#',
    status: 'In Progress'
  },
  {
    id: 'p3',
    title: 'Retro Design System',
    fileName: 'system_ui.css',
    description: 'A component library replicating 80s computer interfaces. Used to build this very website.',
    tech: ['CSS', 'Storybook', 'React'],
    features: ['Pixel Perfect', 'Accessible', 'Themeable'],
    githubUrl: '#',
    demoUrl: '#',
    status: 'Archived'
  }
];

export const BOOT_SEQUENCE_TEXT = [
  "Initializing System...",
  "Checking ROM...",
  "Loading Memory... OK",
  "Mounting Volume: PORTFOLIO_DISK",
  "Loading Finder...",
  "Starting UI Server...",
  "Welcome to System 1."
];