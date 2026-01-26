import React, { useState, useEffect } from 'react';
import { Sun, Moon, CheckCircle, X, Github, Linkedin, Mail } from 'lucide-react';
import { useScrollReveal, useActiveSection } from '../hooks';
import { NAV_LINKS } from '../data';

export const ScrollProgress = () => {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setWidth(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return <div className="fixed top-0 left-0 h-1 bg-gradient-to-r from-teal-500 to-indigo-600 z-[60] transition-all duration-150 ease-out" style={{ width: `${width}%` }} />;
};

export const Section = ({ children, id, className = "" }) => {
  const [ref, isVisible] = useScrollReveal();
  return (
    <section 
      id={id} 
      ref={ref}
      className={`py-20 md:py-32 px-6 transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${className}`}
    >
      <div className="max-w-6xl mx-auto">{children}</div>
    </section>
  );
};

export const Toast = ({ message, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);
  if (!isVisible) return null;
  return (
    <div className="fixed bottom-6 right-6 z-[100] animate-fade-in-up">
      <div className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 border border-slate-700 dark:border-slate-200">
        <CheckCircle className="text-teal-500" size={20} />
        <span className="font-medium">{message}</span>
        <button onClick={onClose} className="ml-4 opacity-50 hover:opacity-100 transition-opacity"><X size={16} /></button>
      </div>
    </div>
  );
};

export const Navbar = ({ darkMode, toggleTheme }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const activeSection = useActiveSection(NAV_LINKS.map(l => l.id));

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
      scrolled 
        ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-slate-200 dark:border-slate-800 py-3' 
        : 'bg-transparent border-transparent py-5'
    }`}>
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        <a href="#" className="text-xl font-bold font-mono tracking-tighter text-slate-800 dark:text-slate-100 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
          ernesto<span className="text-teal-500">.dev</span>
        </a>

        <div className="hidden md:flex items-center space-x-8">
          {NAV_LINKS.map(link => (
            <a 
              key={link.name} 
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                activeSection === link.id 
                  ? 'text-teal-600 dark:text-teal-400 font-bold' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400'
              }`}
            >
              {link.name}
            </a>
          ))}
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors">
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        <div className="md:hidden flex items-center gap-4">
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors">
             {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-slate-600 dark:text-slate-300">
            <div className="space-y-1.5">
              <span className={`block w-6 h-0.5 bg-current transition-transform ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-current transition-opacity ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-current transition-transform ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-4 shadow-xl">
          <div className="flex flex-col space-y-4 px-6">
            {NAV_LINKS.map(link => (
              <a key={link.name} href={link.href} onClick={() => setMobileMenuOpen(false)} className="text-slate-600 dark:text-slate-400 font-medium">
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export const Footer = () => (
  <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-12 px-6">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="text-center md:text-left">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Ernesto Kevin Handoyo</h3>
        <p className="text-slate-500 dark:text-slate-500 text-sm mt-1">Full Stack Developer • UI/UX Designer</p>
      </div>
      <div className="flex gap-6">
        <a href="#" className="text-slate-500 hover:text-teal-600 transition-colors"><Github size={20} /></a>
        <a href="https://www.linkedin.com/in/ernesto-kevin-handoyo" className="text-slate-500 hover:text-teal-600 transition-colors"><Linkedin size={20} /></a>
        <a href="#" className="text-slate-500 hover:text-teal-600 transition-colors"><Mail size={20} /></a>
      </div>
      <div className="text-slate-400 text-xs">&copy; {new Date().getFullYear()} Ernesto. All rights reserved.</div>
    </div>
  </footer>
);