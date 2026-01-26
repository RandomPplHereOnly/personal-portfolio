import React from 'react';
import { X, Github, ExternalLink } from 'lucide-react';

export const ProjectModal = ({ project, isOpen, onClose }) => {
  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white dark:bg-slate-900 w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden animate-scale-up">
        <div className="h-48 w-full relative" style={{ background: project.image }}>
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="text-teal-600 dark:text-teal-400 font-mono text-sm uppercase tracking-wider">{project.category}</span>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{project.title}</h3>
            </div>
            <div className="flex gap-3">
              <a href={project.repo} className="p-2 text-slate-500 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                <Github size={20} />
              </a>
              <a href={project.link} className="p-2 text-slate-500 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                <ExternalLink size={20} />
              </a>
            </div>
          </div>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
            {project.longDescription}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full text-sm font-medium">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};