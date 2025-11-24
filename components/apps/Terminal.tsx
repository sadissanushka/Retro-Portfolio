import React, { useState, useRef, useEffect } from 'react';

const Terminal: React.FC = () => {
  const [history, setHistory] = useState<string[]>(["Welcome to System 1 Shell.", "Type 'help' for commands."]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmd: string) => {
    const args = cmd.trim().split(' ');
    const main = args[0].toLowerCase();

    let output: string[] = [`> ${cmd}`];

    switch (main) {
      case 'help':
        output.push("Available commands: help, ls, whoami, neofetch, clear");
        break;
      case 'ls':
        output.push("Portfolio  Projects  Mail  System");
        break;
      case 'whoami':
        output.push("guest@retro-mac");
        break;
      case 'neofetch':
        output = [
          ...output,
          "       _      OS: Retro Mac System 1",
          "      (_)     Kernel: React 18",
          "     /   \\    Shell: ZSH (Simulated)",
          "    |     |   Resolution: 100%",
          "     \\___/    Theme: Classic Monochrome",
        ];
        break;
      case 'clear':
        setHistory([]);
        return;
      case '':
        break;
      default:
        output.push(`Command not found: ${main}`);
    }

    setHistory(prev => [...prev, ...output]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    }
  };

  return (
    <div className="h-full bg-black text-green-500 p-2 font-[VT323] text-lg overflow-auto flex flex-col">
      <div className="flex-1">
        {history.map((line, i) => (
          <pre key={i} className="whitespace-pre-wrap mb-1">{line}</pre>
        ))}
      </div>
      <div className="flex mt-2">
        <span className="mr-2">$</span>
        <input 
          className="bg-transparent border-none outline-none text-green-500 flex-1 font-inherit caret-green-500"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          spellCheck={false}
        />
      </div>
      <div ref={bottomRef} />
    </div>
  );
};

export default Terminal;