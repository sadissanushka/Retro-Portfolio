import React, { useState, useEffect } from 'react';
import { Apple, Wifi } from 'lucide-react';

const MenuBar: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const menuItems = [
    { id: 'file', label: 'File', items: ['New', 'Open', 'Close', 'Save', 'Print'] },
    { id: 'edit', label: 'Edit', items: ['Undo', 'Cut', 'Copy', 'Paste'] },
    { id: 'view', label: 'View', items: ['Icon', 'List', 'Details'] },
    { id: 'special', label: 'Special', items: ['Empty Trash', 'Erase Disk', 'Restart', 'Shutdown'] },
  ];

  return (
    <div className="fixed top-0 left-0 w-full h-8 bg-white border-b-2 border-black flex items-center justify-between px-2 select-none z-[9999]">
      <div className="flex items-center h-full">
        {/* Apple Menu */}
        <div 
            className="relative h-full flex items-center px-3 hover:bg-black hover:text-white cursor-pointer"
            onClick={() => setOpenMenu(openMenu === 'apple' ? null : 'apple')}
        >
          <Apple size={16} fill="currentColor" />
           {openMenu === 'apple' && (
            <div className="absolute top-full left-0 w-48 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-black">
              <div className="p-2 hover:bg-black hover:text-white cursor-pointer border-b border-gray-300">About This Portfolio</div>
              <div className="p-2 hover:bg-black hover:text-white cursor-pointer text-gray-400">Control Panel</div>
            </div>
          )}
        </div>

        {/* Main Menus */}
        {menuItems.map((menu) => (
          <div 
            key={menu.id}
            className="relative h-full flex items-center px-3 hover:bg-black hover:text-white cursor-pointer font-bold text-sm"
            onClick={() => setOpenMenu(openMenu === menu.id ? null : menu.id)}
          >
            {menu.label}
            {openMenu === menu.id && (
              <div className="absolute top-full left-0 w-40 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-black z-50">
                {menu.items.map((item) => (
                  <div key={item} className="px-4 py-1 hover:bg-black hover:text-white cursor-pointer text-left">
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4 px-2">
        <Wifi size={16} />
        <span className="font-bold text-sm font-mono tracking-widest">{formatTime(time)}</span>
      </div>
      
      {/* Click outside handler overlay */}
      {openMenu && (
        <div className="fixed inset-0 z-40 bg-transparent" onClick={() => setOpenMenu(null)} />
      )}
    </div>
  );
};

export default MenuBar;