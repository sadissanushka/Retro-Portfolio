import React from 'react';

interface DesktopIconProps {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  top?: number;
  right?: number;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ label, icon, onClick, top = 0, right = 0 }) => {
  return (
    <div 
      onClick={onClick}
      className="absolute flex flex-col items-center w-20 cursor-pointer group"
      style={{ top: `${top}px`, right: `${right}px` }}
    >
      <div className="w-12 h-12 bg-white border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover:bg-black group-hover:text-white transition-colors">
        {icon}
      </div>
      <span className="mt-1 bg-white px-1 border border-black text-xs font-bold shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] group-hover:bg-black group-hover:text-white select-none">
        {label}
      </span>
    </div>
  );
};

export default DesktopIcon;