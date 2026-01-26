import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowRight, Download, ChevronDown, Eye, ExternalLink, Github, 
  Palette, Smartphone, PenTool 
} from 'lucide-react';
import { Section } from './Layout';
import { ProjectModal } from './Modals';
import { SKILLS, PROJECTS, DESIGN_PORTFOLIO, EXPERIENCE, STATS } from '../data';
import { useCounter } from '../hooks';

export const Hero = () => (
  <section className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px]" />
    </div>
    <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in-up">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold tracking-wide uppercase border border-slate-200 dark:border-slate-700">
        <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span> Available for new projects
      </div>
      <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
        Building digital calm from <br className="hidden md:block" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-indigo-600">complex chaos.</span>
      </h1>
      <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
        I'm <span className="text-slate-900 dark:text-white font-semibold">Ernesto</span>, a Full Stack Developer & UX Designer.
        I craft robust, scalable applications with a focus on user experience and clean architecture.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <a href="#projects" className="group px-8 py-3.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg font-medium hover:bg-slate-800 dark:hover:bg-slate-100 transition-all flex items-center gap-2">
          View Projects <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </a>
        <a href="/resume.pdf" className="px-8 py-3.5 bg-transparent border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center gap-2">
          <Download size={18} /> Download Resume
        </a>
      </div>
    </div>
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-slate-400 dark:text-slate-600">
      <ChevronDown size={24} />
    </div>
  </section>
);

export const TerminalAbout = () => {
  const [history, setHistory] = useState([{ type: 'output', content: 'Welcome to ernesto.sh v1.0.0' }, { type: 'output', content: 'Type "help" to see available commands.' }]);
  const [input, setInput] = useState('');
  const terminalBodyRef = useRef(null);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      const newHistory = [...history, { type: 'input', content: input }];
      let response = '';
      switch (cmd) {
        case 'help': response = 'Available commands: about, skills, contact, clear'; break;
        case 'about': response = 'I am a Full Stack Developer bridging the gap between design and engineering.'; break;
        case 'skills': response = 'Frontend: React, Next.js | Backend: Node, Go | Database: Postgres'; break;
        case 'contact': response = 'Email: ernestokevin1996@gmail.com | LinkedIn: Ernesto Kevin Handoyo'; break;
        case 'clear': setHistory([]); setInput(''); return;
        default: response = `Command not found: ${cmd}. Type "help" for assistance.`;
      }
      newHistory.push({ type: 'output', content: response });
      setHistory(newHistory);
      setInput('');
    }
  };

  useEffect(() => {
    if (terminalBodyRef.current) terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
  }, [history]);

  return (
    <Section id="about" className="bg-slate-50 dark:bg-slate-900/50">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">About Me</h2>
          <div className="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed">
            <p>I bridge the gap between design and engineering. My philosophy is simple: technology should be invisible.</p>
            <p>With a background in both visual design and distributed systems, I bring a unique perspective to full-stack development.</p>
          </div>
        </div>
        <div className="rounded-xl overflow-hidden bg-slate-900 shadow-2xl border border-slate-700 font-mono text-sm h-80 flex flex-col">
          <div className="bg-slate-800 px-4 py-3 flex items-center gap-2 border-b border-slate-700 shrink-0">
            <div className="flex gap-2"><div className="w-3 h-3 rounded-full bg-red-500" /><div className="w-3 h-3 rounded-full bg-yellow-500" /><div className="w-3 h-3 rounded-full bg-green-500" /></div>
            <div className="ml-4 text-slate-400 text-xs">user@ernesto:~/interactive</div>
          </div>
          <div ref={terminalBodyRef} className="p-4 text-slate-300 flex-1 overflow-y-auto custom-scrollbar">
            {history.map((line, i) => (
              <div key={i} className="mb-2 break-words">
                {line.type === 'input' ? <div><span className="text-teal-400">➜</span> <span className="text-purple-400">~</span> <span className="text-white">{line.content}</span></div> : <div className="text-slate-400 pl-4">{line.content}</div>}
              </div>
            ))}
            <div className="flex items-center gap-2 mt-2">
              <span className="text-teal-400">➜</span><span className="text-purple-400">~</span>
              <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleCommand} className="bg-transparent border-none outline-none text-white w-full" placeholder="Type 'help'..." />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export const TechStack = () => (
  <Section id="stack">
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Technical Arsenal</h2>
      <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">I choose the right tool for the job.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Object.entries(SKILLS).map(([key, category]) => (
        <div key={key} className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-6 text-teal-600 dark:text-teal-400">
            <div className="p-2 bg-teal-50 dark:bg-teal-900/30 rounded-lg">{category.icon}</div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white capitalize">{category.title}</h3>
          </div>
          <ul className="space-y-2">
            {category.skills.map(skill => (
              <li key={skill} className="flex items-center text-slate-600 dark:text-slate-400 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-600 mr-2"></span>{skill}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </Section>
);

export const Projects = () => {
  const [filter, setFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const categories = ['All', 'Frontend', 'Backend', 'Systems'];
  const filteredProjects = filter === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === filter);

  return (
    <Section id="projects" className="bg-slate-50 dark:bg-slate-900/50">
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Featured Projects</h2>
          <p className="text-slate-600 dark:text-slate-400">A selection of recent work and experiments.</p>
        </div>
        <div className="flex gap-2 p-1 bg-slate-200 dark:bg-slate-800 rounded-lg">
          {categories.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)} className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${filter === cat ? 'bg-white dark:bg-slate-700 text-teal-600 dark:text-teal-400 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'}`}>
              {cat}
            </button>
          ))}
        </div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, index) => (
          <div key={index} className="group bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full animate-fade-in">
            <div className="h-48 w-full bg-slate-200 relative overflow-hidden cursor-pointer" style={{ background: project.image }} onClick={() => setSelectedProject(project)}>
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                <button className="flex items-center gap-2 px-4 py-2 bg-white text-slate-900 rounded-full font-medium transform hover:scale-105 transition-transform"><Eye size={18} /> Quick View</button>
              </div>
              <div className="absolute top-4 right-4 px-2 py-1 bg-black/50 backdrop-blur-md text-white text-xs font-bold rounded uppercase tracking-wider">{project.category}</div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-teal-600 transition-colors cursor-pointer" onClick={() => setSelectedProject(project)}>{project.title}</h3>
                <div className="flex gap-2">
                  <a href={project.repo} className="text-slate-400 hover:text-teal-500 transition-colors"><Github size={16}/></a>
                  <a href={project.link} className="text-slate-400 hover:text-teal-500 transition-colors"><ExternalLink size={16}/></a>
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 flex-1">{project.description}</p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tags.map(tag => (
                  <span key={tag} className="px-2.5 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs rounded-md font-medium border border-slate-200 dark:border-slate-600">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <ProjectModal project={selectedProject} isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} />
    </Section>
  );
};

export const UiUxShowcase = () => (
  <Section id="design">
    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
      <div>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">UI/UX Design</h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl">Beyond code, I craft digital experiences that look beautiful and feel intuitive.</p>
      </div>
      <div className="flex gap-2">
        <div className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-lg"><Palette size={20} /></div>
        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg"><Smartphone size={20} /></div>
        <div className="p-2 bg-pink-100 dark:bg-pink-900/30 text-pink-600 rounded-lg"><PenTool size={20} /></div>
      </div>
    </div>
    <div className="grid md:grid-cols-3 gap-8">
      {DESIGN_PORTFOLIO.map((item, index) => (
        <div key={index} className="group relative rounded-2xl overflow-hidden cursor-pointer h-80 shadow-md hover:shadow-2xl transition-all">
          <div className={`absolute inset-0 bg-gradient-to-br ${item.color} transition-transform duration-700 group-hover:scale-110`}></div>
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-colors duration-300"></div>
          <div className="absolute bottom-0 left-0 w-full p-8 text-white transform translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
            <div className="text-xs font-bold uppercase tracking-wider mb-2 opacity-80 flex items-center gap-2"><span className="w-1 h-1 bg-white rounded-full"></span>{item.category}</div>
            <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
            <p className="text-sm text-slate-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mb-6 leading-relaxed">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  </Section>
);

export const Experience = () => (
  <Section id="experience" className="bg-slate-50 dark:bg-slate-900/50">
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-12 text-center">Experience</h2>
      <div className="relative border-l-2 border-slate-200 dark:border-slate-700 ml-3 md:ml-6 space-y-12">
        {EXPERIENCE.map((job, index) => (
          <div key={index} className="relative pl-8 md:pl-12">
            <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-teal-500 border-4 border-white dark:border-slate-900"></span>
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">{job.company}</h3>
              <span className="text-sm font-mono text-slate-500">{job.period}</span>
            </div>
            <div className="text-teal-600 dark:text-teal-400 font-medium mb-3">{job.role}</div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{job.description}</p>
          </div>
        ))}
      </div>
    </div>
  </Section>
);

export const StatsSection = () => {
  const StatItem = ({ value, suffix, label }) => {
    const [count, ref] = useCounter(value);
    return (
      <div ref={ref} className="space-y-2">
        <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-indigo-600">{count}{suffix}</div>
        <div className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">{label}</div>
      </div>
    );
  };
  return (
    <div className="border-y border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STATS.map((stat, index) => <StatItem key={index} {...stat} />)}
        </div>
      </div>
    </div>
  );
};

export const Contact = ({ onSendMessage }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSendMessage();
  };
  return (
    <Section id="contact">
      <div className="max-w-xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Let's build something together</h2>
        <p className="text-slate-600 dark:text-slate-400">Currently open for new opportunities.</p>
      </div>
      <div className="max-w-md mx-auto bg-white dark:bg-slate-800 p-8 rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Name</label>
            <input required type="text" className="w-full px-4 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-900 dark:text-white" placeholder="Jane Doe" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
            <input required type="email" className="w-full px-4 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-900 dark:text-white" placeholder="jane@example.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Message</label>
            <textarea required rows="4" className="w-full px-4 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-900 dark:text-white resize-none" placeholder="Hello..." />
          </div>
          <button type="submit" className="w-full py-3 bg-teal-600 text-white rounded-lg font-bold hover:bg-teal-700 transition-colors shadow-lg shadow-teal-500/20">Send Message</button>
        </form>
      </div>
    </Section>
  );
};