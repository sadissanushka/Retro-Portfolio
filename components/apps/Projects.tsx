import React from 'react';
import { FileText, Folder } from 'lucide-react';
import { PROJECTS } from '../../constants';
import { ProjectData } from '../../types';

interface ProjectsProps {
  onOpenProject: (project: ProjectData) => void;
}

const Projects: React.FC<ProjectsProps> = ({ onOpenProject }) => {
  return (
    <div className="p-4">
      <div className="grid grid-cols-3 gap-4">
        {PROJECTS.map((proj) => (
          <div 
            key={proj.id}
            onClick={() => onOpenProject(proj)}
            className="flex flex-col items-center cursor-pointer group p-2 hover:bg-black hover:text-white border border-transparent hover:border-white"
          >
            <FileText size={32} strokeWidth={1.5} className="mb-2" />
            <span className="text-xs text-center break-all font-mono px-1 mb-1">{proj.fileName}</span>
            <span className="text-[10px] uppercase border border-gray-400 px-1 text-gray-500 group-hover:border-white group-hover:text-white">{proj.status}</span>
          </div>
        ))}
        {/* Mock Empty Folder for aesthetics */}
        <div className="flex flex-col items-center opacity-50">
            <Folder size={32} strokeWidth={1.5} className="mb-2" />
            <span className="text-xs text-center font-mono">Archived</span>
        </div>
      </div>
      
      <div className="mt-8 border-t border-black pt-2">
        <p className="text-xs text-center">3 items, 140MB available</p>
      </div>
    </div>
  );
};

export default Projects;