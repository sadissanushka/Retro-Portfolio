import React, { useState, useEffect } from 'react';
import { Code, Briefcase, MapPin, GraduationCap, Mail } from 'lucide-react';

const TYPEWRITER_TEXT = "I build pixel-perfect, accessible, and performant web applications with a touch of nostalgia.";

const Portfolio: React.FC = () => {
  const [typedText, setTypedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    setTypedText('');
    setIsTypingComplete(false);
    
    let index = 0;
    const timer = setInterval(() => {
      if (index < TYPEWRITER_TEXT.length) {
        setTypedText((prev) => prev + TYPEWRITER_TEXT.charAt(index));
        index++;
      } else {
        setIsTypingComplete(true);
        clearInterval(timer);
      }
    }, 40);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-4 md:p-6 font-serif select-text h-full">
      <div className="flex flex-col md:flex-row gap-6 border-b-2 border-black pb-6 mb-6">
        <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-200 border-2 border-black shrink-0 overflow-hidden relative shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] self-center md:self-start">
            <img src="profile_pic.png" alt="Profile" className="w-full h-full object-cover grayscale contrast-125" />
            {/* Dithering effect overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:2px_2px] opacity-20 pointer-events-none"></div>
        </div>
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 uppercase tracking-widest font-mono text-center md:text-left">W S S A T</h1>
          <p className="text-sm font-bold mb-3 border-b border-black inline-block pb-1 block text-center md:text-left">Full Stack Engineer & UI Designer</p>
          
          <div className="flex flex-col gap-1 text-xs mb-4 font-mono items-center md:items-start">
            <div className="flex items-center gap-2">
              <MapPin size={14} />
              <span>Puttalam, Sri Lanka</span>
            </div>
             <div className="flex items-center gap-2">
              <Mail size={14} />
              <span>admin@wssat.online</span>
            </div>
          </div>

          <div className="min-h-[4rem] bg-gray-50 p-2 border border-gray-300 border-dashed rounded-sm">
            <p className="text-sm leading-relaxed font-mono text-gray-800">
              <span className="mr-2 text-green-700 font-bold">{">"}</span>
              {typedText}
              <span className={`inline-block w-2 h-4 align-middle bg-black ml-1 ${isTypingComplete ? 'animate-pulse' : ''}`}></span>
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 pb-6">
        
        {/* Skills Section */}
        <div className="border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white relative mt-2">
          <div className="absolute -top-3 left-4 bg-white px-2 border-2 border-black font-bold text-xs uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2">
             <Code size={12} /> Technical Skills
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 pt-2">
             <div>
                <h3 className="font-bold text-xs uppercase mb-2 border-b border-gray-300">Frontend</h3>
                <ul className="list-disc list-inside space-y-1 text-xs font-mono">
                    <li>React / Next.js / Remix</li>
                    <li>TypeScript / ES6+</li>
                    <li>Tailwind / CSS Modules</li>
                    <li>WebGL / Three.js</li>
                </ul>
             </div>
             <div>
                <h3 className="font-bold text-xs uppercase mb-2 border-b border-gray-300">Backend & DevOps</h3>
                <ul className="list-disc list-inside space-y-1 text-xs font-mono">
                    <li>Node.js / NestJS</li>
                    <li>PostgreSQL / Prisma</li>
                    <li>Docker / Kubernetes</li>
                    <li>AWS / CI/CD</li>
                </ul>
             </div>
          </div>
        </div>

        {/* Experience Section */}
        <div className="border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white relative mt-2">
          <div className="absolute -top-3 left-4 bg-white px-2 border-2 border-black font-bold text-xs uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2">
             <Briefcase size={12} /> Work Experience
          </div>
          
          <div className="text-sm space-y-5 pt-2">
            <div>
              <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-1">
                <p className="font-bold uppercase">Frontend</p>
                <span className="text-xs bg-black text-white px-2 py-0.5 font-mono w-max">2023 - Present</span>
              </div>
              <p className="text-xs font-bold mb-2 text-gray-600"></p>
              <ul className="list-inside text-xs space-y-1 text-gray-800 ml-2 marker:text-black" style={{ listStyleType: 'square' }}>
                <li>Led the migration of a legacy monolithic application to a modern micro-frontend architecture using React and Webpack Module Federation.</li>
                <li>Improved Core Web Vitals scores by 40% across the platform.</li>
                <li>Mentored junior developers and introduced automated testing pipelines.</li>
              </ul>
            </div>
            
            <div className="border-t-2 border-dotted border-gray-300 pt-4">
              <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-1">
                <p className="font-bold uppercase">Full Stack Developer</p>
                <span className="text-xs border border-black px-2 py-0.5 font-mono w-max">2021 - 2023</span>
              </div>
              <p className="text-xs font-bold mb-2 text-gray-600"></p>
              <ul className="list-inside text-xs space-y-1 text-gray-800 ml-2 marker:text-black" style={{ listStyleType: 'square' }}>
                <li>Developed high-fidelity custom websites for international clients.</li>
                <li>Integrated headless CMS solutions and payment gateways.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Education Section */}
        <div className="border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white relative mt-2">
           <div className="absolute -top-3 left-4 bg-white px-2 border-2 border-black font-bold text-xs uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2">
             <GraduationCap size={12} /> Education
          </div>
          <div className="text-sm pt-2">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                <div>
                    <p className="font-bold">B.Sc. (Hons) in Information Technology</p>
                    <p className="text-xs mt-1">University of Moratuwa</p>
                </div>
                <span className="text-xs font-mono border border-black px-1 w-max">2025 - Now</span>
            </div>
            <p className="text-xs text-gray-600 mt-2 italic"></p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Portfolio;