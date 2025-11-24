import React, { useEffect, useState } from 'react';
import { BOOT_SEQUENCE_TEXT } from '../constants';

interface BootScreenProps {
  onComplete: () => void;
}

const BootScreen: React.FC<BootScreenProps> = ({ onComplete }) => {
  const [lines, setLines] = useState<string[]>([]);
  
  useEffect(() => {
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex >= BOOT_SEQUENCE_TEXT.length) {
        clearInterval(interval);
        setTimeout(onComplete, 1000); // Wait a bit after last line
        return;
      }
      
      // Play a subtle blip sound if user interacted (optional, but hard to auto-play without interaction)
      setLines(prev => [...prev, BOOT_SEQUENCE_TEXT[currentIndex]]);
      currentIndex++;
    }, 600);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-start justify-start p-8 font-[VT323] text-green-500 text-xl">
      <div className="w-full max-w-2xl">
        {lines.map((line, i) => (
          <div key={i} className="mb-1">{line}</div>
        ))}
        <div className="animate-pulse">_</div>
      </div>
    </div>
  );
};

export default BootScreen;