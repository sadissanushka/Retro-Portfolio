import React, { useState } from 'react';
import { Send, Mail as MailIcon } from 'lucide-react';

const Mail: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    // Mock send
    setTimeout(() => {
      setStatus('sent');
    }, 1500);
  };

  if (status === 'sent') {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center">
        <MailIcon size={48} className="mb-4" />
        <h2 className="text-xl font-bold mb-2">Message Sent!</h2>
        <p>The system carrier pigeon has been dispatched.</p>
        <button 
          onClick={() => setStatus('idle')}
          className="mt-6 px-4 py-2 bg-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white active:translate-y-[2px] active:shadow-none transition-all"
        >
          Write Another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 flex flex-col h-full">
      <div className="mb-4">
        <label className="block text-xs font-bold uppercase mb-1">To:</label>
        <div className="w-full border border-black p-1 bg-gray-100 text-sm select-none cursor-not-allowed">
          admin@wssat.online
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-xs font-bold uppercase mb-1">From (Email):</label>
        <input 
          required
          type="email" 
          className="w-full border border-black p-1 focus:outline-none focus:bg-black focus:text-white transition-colors text-sm font-mono"
          placeholder="visitor@internet.com"
        />
      </div>

      <div className="flex-1 mb-4 flex flex-col">
        <label className="block text-xs font-bold uppercase mb-1">Message:</label>
        <textarea 
          required
          className="w-full flex-1 border border-black p-2 focus:outline-none focus:bg-gray-50 text-sm resize-none font-mono"
          placeholder="Type your message here..."
        ></textarea>
      </div>

      <div className="flex justify-end">
        <button 
          type="submit"
          disabled={status === 'sending'}
          className="flex items-center gap-2 px-6 py-2 bg-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white active:translate-y-[2px] active:shadow-none transition-all disabled:opacity-50"
        >
          {status === 'sending' ? 'Transmitting...' : 'Send Mail'}
          <Send size={14} />
        </button>
      </div>
    </form>
  );
};

export default Mail;