import React, { useState, useRef, useEffect } from 'react';
import { Layout, Terminal as TerminalIcon, Mail as MailIcon, Github, Trash2, Printer } from 'lucide-react';
import MenuBar from './components/MenuBar';
import DesktopIcon from './components/DesktopIcon';
import Window from './components/Window';
import BootScreen from './components/BootScreen';
import Portfolio from './components/apps/Portfolio';
import Projects from './components/apps/Projects';
import Terminal from './components/apps/Terminal';
import Mail from './components/apps/Mail';
import { AppType, DragState, ProjectData, ResizeState, WindowState } from './types';
import { INITIAL_WINDOW_HEIGHT, INITIAL_WINDOW_WIDTH } from './constants';

// Sound helper
const playBeep = () => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.type = 'square';
    osc.frequency.setValueAtTime(440, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.05);
    
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  } catch (e) {
    console.error("Audio not supported");
  }
};

const App: React.FC = () => {
  const [booting, setBooting] = useState(true);
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<number | null>(null);
  const [nextZIndex, setNextZIndex] = useState(10);

  // Refs for drag/resize logic to avoid stale closures in event listeners
  const dragState = useRef<DragState>({ isDragging: false, windowId: null, startX: 0, startY: 0, initialX: 0, initialY: 0 });
  const resizeState = useRef<ResizeState>({ isResizing: false, windowId: null, startX: 0, startY: 0, initialWidth: 0, initialHeight: 0 });

  // Window Management
  const openWindow = (appType: AppType, data?: any) => {
    playBeep();
    
    // Check if already open (except for generic types if we wanted multiple)
    const existing = windows.find(w => w.appType === appType && (!data || w.data?.id === data.id));
    if (existing) {
      bringToFront(existing.id);
      return;
    }

    const id = Date.now();
    const titleMap: Record<AppType, string> = {
      [AppType.PORTFOLIO]: 'Portfolio.doc',
      [AppType.PROJECTS]: 'Projects',
      [AppType.MAIL]: 'Mail Client',
      [AppType.TERMINAL]: 'Terminal',
      [AppType.PROJECT_DETAIL]: data ? `Project: ${data.title}` : 'Project Details',
    };

    // Randomize initial position slightly
    const offset = windows.length * 20;

    const newWindow: WindowState = {
      id,
      appType,
      title: titleMap[appType],
      x: 100 + offset,
      y: 80 + offset,
      width: INITIAL_WINDOW_WIDTH,
      height: INITIAL_WINDOW_HEIGHT,
      zIndex: nextZIndex,
      isMinimized: false,
      data
    };

    setWindows(prev => [...prev, newWindow]);
    setNextZIndex(prev => prev + 1);
    setActiveWindowId(id);
  };

  const closeWindow = (id: number) => {
    setWindows(prev => prev.filter(w => w.id !== id));
    if (activeWindowId === id) setActiveWindowId(null);
  };

  const bringToFront = (id: number) => {
    setActiveWindowId(id);
    setWindows(prev => prev.map(w => {
      if (w.id === id) {
        return { ...w, zIndex: nextZIndex };
      }
      return w;
    }));
    setNextZIndex(prev => prev + 1);
  };

  // Mouse Event Handlers (Global)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Dragging
      if (dragState.current.isDragging && dragState.current.windowId !== null) {
        const dx = e.clientX - dragState.current.startX;
        const dy = e.clientY - dragState.current.startY;
        
        setWindows(prev => prev.map(w => {
          if (w.id === dragState.current.windowId) {
            return {
              ...w,
              x: dragState.current.initialX + dx,
              y: dragState.current.initialY + dy
            };
          }
          return w;
        }));
      }

      // Resizing
      if (resizeState.current.isResizing && resizeState.current.windowId !== null) {
        const dx = e.clientX - resizeState.current.startX;
        const dy = e.clientY - resizeState.current.startY;

        setWindows(prev => prev.map(w => {
          if (w.id === resizeState.current.windowId) {
            return {
              ...w,
              width: Math.max(300, resizeState.current.initialWidth + dx), // Min width
              height: Math.max(200, resizeState.current.initialHeight + dy) // Min height
            };
          }
          return w;
        }));
      }
    };

    const handleMouseUp = () => {
      dragState.current = { isDragging: false, windowId: null, startX: 0, startY: 0, initialX: 0, initialY: 0 };
      resizeState.current = { isResizing: false, windowId: null, startX: 0, startY: 0, initialWidth: 0, initialHeight: 0 };
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const handleDragStart = (e: React.MouseEvent, id: number) => {
    const win = windows.find(w => w.id === id);
    if (win) {
      dragState.current = {
        isDragging: true,
        windowId: id,
        startX: e.clientX,
        startY: e.clientY,
        initialX: win.x,
        initialY: win.y
      };
    }
  };

  const handleResizeStart = (e: React.MouseEvent, id: number) => {
    e.stopPropagation(); // Prevent drag start
    const win = windows.find(w => w.id === id);
    if (win) {
      resizeState.current = {
        isResizing: true,
        windowId: id,
        startX: e.clientX,
        startY: e.clientY,
        initialWidth: win.width,
        initialHeight: win.height
      };
    }
  };

  const renderWindowContent = (win: WindowState) => {
    switch (win.appType) {
      case AppType.PORTFOLIO:
        return <Portfolio />;
      case AppType.PROJECTS:
        return <Projects onOpenProject={(p) => openWindow(AppType.PROJECT_DETAIL, p)} />;
      case AppType.PROJECT_DETAIL:
        const p = win.data as ProjectData;
        return (
            <div className="p-6 font-serif">
                <h2 className="text-2xl font-bold mb-2 uppercase">{p.title}</h2>
                <div className="flex gap-2 mb-4">
                    <span className="px-2 py-0.5 bg-black text-white text-xs">{p.status}</span>
                    <span className="px-2 py-0.5 border border-black text-xs font-mono">{p.fileName}</span>
                </div>
                <p className="mb-4">{p.description}</p>
                
                <div className="mb-4">
                    <h3 className="font-bold border-b border-black mb-2">Technologies Used</h3>
                    <div className="flex flex-wrap gap-2">
                        {p.tech.map(t => <span key={t} className="px-2 py-1 bg-gray-200 text-xs">{t}</span>)}
                    </div>
                </div>

                <div className="mt-8 flex gap-4">
                    <a 
                      href={p.githubUrl}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1 block text-center py-2 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white text-sm font-bold uppercase no-underline text-black transition-all active:translate-y-[2px] active:shadow-none"
                    >
                        View on GitHub
                    </a>
                    <a 
                      href={p.demoUrl}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1 block text-center py-2 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white text-sm font-bold uppercase no-underline text-black transition-all active:translate-y-[2px] active:shadow-none"
                    >
                        Live Demo
                    </a>
                </div>
            </div>
        );
      case AppType.MAIL:
        return <Mail />;
      case AppType.TERMINAL:
        return <Terminal />;
      default:
        return <div className="p-4">Unknown Application</div>;
    }
  };

  return (
    <div className="w-screen h-screen overflow-hidden text-black select-none scanlines">
      {booting && <BootScreen onComplete={() => {
          setBooting(false);
          openWindow(AppType.PORTFOLIO); // Auto open portfolio after boot
      }} />}

      {!booting && (
        <>
          <MenuBar />
          
          {/* Desktop Area */}
          <div className="absolute inset-0 pt-8">
            
            {/* Icons - Absolute positioned on the right */}
            <DesktopIcon 
              label="Portfolio" 
              icon={<Layout size={28} strokeWidth={1.5} />} 
              onClick={() => openWindow(AppType.PORTFOLIO)} 
              top={40} 
              right={20} 
            />
            <DesktopIcon 
              label="Projects" 
              icon={<Github size={28} strokeWidth={1.5} />} 
              onClick={() => openWindow(AppType.PROJECTS)} 
              top={130} 
              right={20} 
            />
            <DesktopIcon 
              label="Mail" 
              icon={<MailIcon size={28} strokeWidth={1.5} />} 
              onClick={() => openWindow(AppType.MAIL)} 
              top={220} 
              right={20} 
            />
            <DesktopIcon 
              label="Terminal" 
              icon={<TerminalIcon size={28} strokeWidth={1.5} />} 
              onClick={() => openWindow(AppType.TERMINAL)} 
              top={310} 
              right={20} 
            />
            
            <div className="absolute bottom-24 right-[20px]">
                <DesktopIcon 
                label="Print" 
                icon={<Printer size={28} strokeWidth={1.5} />} 
                onClick={() => alert("Connecting to printer...")} 
                top={0} 
                right={0} 
                />
            </div>

            <div className="absolute bottom-4 right-[20px]">
                <DesktopIcon 
                label="Trash" 
                icon={<Trash2 size={28} strokeWidth={1.5} />} 
                onClick={() => alert("Trash is empty.")} 
                top={0} 
                right={0} 
                />
            </div>

            {/* Windows */}
            {windows.map(win => (
              <Window
                key={win.id}
                windowState={win}
                isActive={activeWindowId === win.id}
                onClose={closeWindow}
                onFocus={bringToFront}
                onMouseDown={handleDragStart}
                onResizeStart={handleResizeStart}
              >
                {renderWindowContent(win)}
              </Window>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default App;