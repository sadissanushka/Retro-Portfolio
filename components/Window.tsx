import React from 'react';
import { X, Minus } from 'lucide-react';
import { WindowState } from '../types';

interface WindowProps {
  windowState: WindowState;
  isActive: boolean;
  onClose: (id: number) => void;
  onFocus: (id: number) => void;
  onMouseDown: (e: React.MouseEvent, id: number) => void; // For drag start
  onResizeStart: (e: React.MouseEvent, id: number) => void;
  children: React.ReactNode;
}

const Window: React.FC<WindowProps> = ({ 
  windowState, 
  isActive, 
  onClose, 
  onFocus, 
  onMouseDown, 
  onResizeStart,
  children 
}) => {
  const { id, title, x, y, width, height, zIndex } = windowState;

  return (
    <div
      className={`absolute bg-white border-2 border-black flex flex-col shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] transition-opacity duration-200 ${isActive ? 'opacity-100' : 'opacity-95'}`}
      style={{
        left: x,
        top: y,
        width: width,
        height: height,
        zIndex: zIndex,
      }}
      onMouseDown={() => onFocus(id)}
    >
      {/* Title Bar */}
      <div
        className={`h-8 border-b-2 border-black flex items-center justify-between px-1 select-none cursor-grab active:cursor-grabbing ${isActive ? 'striped-bg' : 'bg-white'}`}
        onMouseDown={(e) => onMouseDown(e, id)}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose(id);
          }}
          className="w-5 h-5 bg-white border border-black flex items-center justify-center hover:bg-black hover:text-white active:invert z-10"
        >
          <X size={14} />
        </button>

        <span className={`px-2 text-sm font-bold bg-white border-x border-black ${isActive ? 'mx-auto' : 'ml-2'}`}>
          {title}
        </span>

        {/* Spacer to balance the close button visually if needed, or just empty */}
        <div className="w-5" />
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto p-0 relative bg-white">
        {children}
      </div>

      {/* Resize Handle */}
      <div
        className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize flex items-end justify-end p-0.5 bg-white z-20"
        onMouseDown={(e) => onResizeStart(e, id)}
      >
         <div className="w-full h-full border-r-2 border-b-2 border-black" />
      </div>
    </div>
  );
};

export default Window;