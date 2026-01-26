import React, { useState, useEffect, useRef } from 'react';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  Moon, 
  Sun, 
  ArrowRight, 
  ExternalLink, 
  Code, 
  Database, 
  Server, 
  Cpu, 
  Layers, 
  Terminal, 
  Download,
  ChevronDown,
  Globe,
  Layout,
  MessageSquare,
  Quote,
  X,
  CheckCircle,
  Eye,
  Trophy,
  Coffee,
  Users,
  Palette,
  Smartphone,
  PenTool
} from 'lucide-react';

/**
 * UTILITIES & HOOKS
 */

// Custom hook for scroll reveal animations
const useScrollReveal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return [ref, isVisible];
};

// Custom hook for Active Section (Scroll Spy)
const useActiveSection = (sectionIds) => {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px' }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeSection;
};

// Custom hook for animated numbers
const useCounter = (end, duration = 2000, start = 0) => {
  const [count, setCount] = useState(start);
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    
    let startTime;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * (end - start) + start));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    
    window.requestAnimationFrame(step);
  }, [isVisible, end, duration, start]);

  return [count, ref];
};

// Reusable Section Wrapper with Animation
const Section = ({ children, id, className = "" }) => {
  const [ref, isVisible] = useScrollReveal();
  
  return (
    <section 
      id={id} 
      ref={ref}
      className={`py-20 md:py-32 px-6 transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${className}`}
    >
      <div className="max-w-6xl mx-auto">
        {children}
      </div>
    </section>
  );
};

/**
 * DATA CONSTANTS
 */

const NAV_LINKS = [
  { name: 'About', href: '#about', id: 'about' },
  { name: 'Stack', href: '#stack', id: 'stack' },
  { name: 'Projects', href: '#projects', id: 'projects' },
  { name: 'Design', href: '#design', id: 'design' },
  { name: 'Experience', href: '#experience', id: 'experience' },
  { name: 'Contact', href: '#contact', id: 'contact' },
];

const SKILLS = {
  frontend: { icon: <Layout className="w-5 h-5" />, title: "Frontend", skills: ["React", "Next.js", "Nuxt.js", "TypeScript", "Tailwind CSS", "Vue.js" , "Bootstrap"] },
  backend: { icon: <Server className="w-5 h-5" />, title: "Backend", skills: ["Node.js", "Python", "Go", "Laravel", "Express", "NestJS", "GraphQL"] },
  database: { icon: <Database className="w-5 h-5" />, title: "Database", skills: ["PostgreSQL", "MongoDB", "Redis", "Supabase", "Prisma"] },
  devops: { icon: <Cpu className="w-5 h-5" />, title: "DevOps", skills: ["Docker", "AWS", "CI/CD", "Terraform", "Vercel"] },
};

const PROJECTS = [
  {
    title: "HiBob!",
    category: "Systems", 
    description: "Real-time staff position tracking platform for monitoring and coordinating field patrol teams.",
    longDescription: "Designed for operational visibility and safety. The system provides live GPS tracking of field staff, allowing supervisors to monitor patrol routes, respond quickly to incidents, and ensure coverage across assigned zones. Built for reliability in mobile environments, it supports real-time updates, location history, and scalable team management for on-field operations.",
    tags: ["Codeigniter", "Express", "Node.js", "WebSockets", "MQTT"],
    image: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", 
    link: "https://hibob.id/",
    repo: "#"
  },
  {
    title: "Chandra Remittance",
    category: "Frontend", 
    description: "Digital foreign currency trading and international money transfer platform built for migrant workers.",
    longDescription: "A web and mobile application enabling migrant workers to trade foreign currencies and send money overseas securely and efficiently. The platform provides real-time exchange rates, low-cost cross-border transfers, and a simple user experience designed for accessibility. Built with strong security controls and transaction monitoring, it supports high-volume transfers while ensuring compliance with financial regulations.",
    tags: ["Bootstrap", "Node.js"],
    image: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", 
    link: "#",
    repo: "#"
  },
  {
    title: "Temperature Control System",
    category: "Systems",
    description: "Smart temperature monitoring and automated air conditioning control application.",
    longDescription: "A web and mobile application that tracks real-time temperature data and automatically activates or deactivates air conditioning systems based on predefined thresholds or schedules. Designed for energy efficiency and comfort, the platform supports remote control, scheduling, and automation rules, helping reduce power consumption while maintaining optimal indoor conditions.",
    tags: ["Django", "Python", "Flask"],
    image: "linear-gradient(135deg, #134e4a 0%, #0f766e 100%)", 
    link: "#",
    repo: "#"
  },
  {
    title: "Smart Parking Monitor",
    category: "Backend",
    description: "Vehicle entry and exit detection system for real-time parking space monitoring.",
    longDescription: "A web and mobile application that detects vehicles entering and leaving a parking area to automatically calculate available parking spaces. The system provides real-time occupancy updates, historical reports, and automated notifications, enabling efficient parking management and better space utilization. Designed for reliability, it supports data analytics and reporting for operational and planning purposes.",
    tags: ["Node.JS", "MQTT", "Express"],
    image: "linear-gradient(135deg, #312e81 0%, #4338ca 100%)", 
    link: "#",
    repo: "#"
  },
  {
    title: "Eventnia",
    category: "Systems",
    description: "Integrated accommodation and event booking platform.",
    longDescription: "A web and mobile application that combines short-term accommodation reservations with event booking in a single platform. Users can discover places to stay, browse upcoming events, and manage bookings seamlessly. The system supports availability management, secure payments, and booking confirmations, providing a unified experience for travelers, hosts, and event organizers.",
    tags: ["Quasar", "Vue.JS", "Laravel", "Pubnub"],
    image: "linear-gradient(135deg, #701a75 0%, #4a044e 100%)", 
    link: "#",
    repo: "#"
  }
];

const DESIGN_PORTFOLIO = [
  {
    title: "NeoBank Mobile App",
    category: "App Design",
    description: "Complete redesign of a fintech mobile experience focusing on trust, clarity, and ease of transfer.",
    color: "from-purple-500 to-indigo-600",
    tools: ["Figma", "Principle"]
  },
  {
    title: "Carbon Design System",
    category: "Design Systems",
    description: "A comprehensive dark-mode first design system for enterprise data tools, including 50+ components.",
    color: "from-slate-700 to-slate-900",
    tools: ["Figma", "Storybook"]
  },
  {
    title: "Zenith Travel",
    category: "User Research & UX",
    description: "User journey mapping and high-fidelity prototyping for a luxury travel booking engine.",
    color: "from-orange-400 to-rose-500",
    tools: ["Whimsical", "Figma"]
  }
];

const TESTIMONIALS = [
  {
    text: "Temporary transformed our legacy codebase into a modern, high-performance masterpiece. The attention to detail was unmatched.",
    author: "Sarah Chen",
    role: "CTO, FinTech Startups"
  },
  {
    text: "Not just a developer, but a true product partner. They understood the business goals better than some of our PMs.",
    author: "Mark Johnson",
    role: "Product Lead, HealthCore"
  }
];

const CASE_STUDY = {
  title: "Scaling 'MarketStream' to 50k Concurrent Users",
  summary: "A deep dive into how we re-architected a legacy monolith into event-driven microservices to handle Black Friday traffic spikes.",
  role: "Lead Architect",
  impact: "99.99% Uptime during peak load",
  stack: ["Kubernetes", "Kafka", "Go", "React"]
};

const EXPERIENCE = [
  {
    company: "PT. Jovimaro Karya Agung",
    role: "Full Stack Developer",
    period: "2020 - 2025",
    description: "Leading a team of 6 developers building scalable SaaS products. Improved CI/CD pipeline reducing build times by 40%."
  },
  {
    company: "Creative Pulse Agency",
    role: "Full Stack Developer",
    period: "2018 - 2021",
    description: "Developed award-winning marketing sites and custom web applications for Fortune 500 clients."
  },
  {
    company: "Freelance",
    role: "Web Developer",
    period: "2016 - 2018",
    description: "Partnered with early-stage startups to build MVPs and iterate on product-market fit."
  }
];

const BLOG_POSTS = [
  {
    title: "Understanding React Server Components",
    date: "Oct 12, 2023",
    readTime: "5 min read",
    excerpt: "A practical guide to implementing RSCs in your Next.js 14 applications without losing your mind."
  },
  {
    title: "The Zen of Clean Architecture",
    date: "Sep 28, 2023",
    readTime: "8 min read",
    excerpt: "Why separating concerns early saves you from technical debt later. A look at domain-driven design."
  }
];

const STATS = [
  { label: "Years Experience", value: 5, suffix: "+" },
  { label: "Projects Shipped", value: 10, suffix: "+" },
  { label: "Happy Clients", value: 12, suffix: "" },
  { label: "Coffee Consumed", value: 5000, suffix: "L" },
];

/**
 * COMPONENTS
 */

const ScrollProgress = () => {
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

  return (
    <div className="fixed top-0 left-0 h-1 bg-gradient-to-r from-teal-500 to-indigo-600 z-[60] transition-all duration-150 ease-out" style={{ width: `${width}%` }} />
  );
};

// Toast Notification Component
const Toast = ({ message, isVisible, onClose }) => {
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
        <button onClick={onClose} className="ml-4 opacity-50 hover:opacity-100 transition-opacity">
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

// Project Modal Component
const ProjectModal = ({ project, isOpen, onClose }) => {
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

const Navbar = ({ darkMode, toggleTheme }) => {
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
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors"
            aria-label="Toggle Theme"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-4">
            <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-slate-600 dark:text-slate-300"
          >
            <div className="space-y-1.5">
              <span className={`block w-6 h-0.5 bg-current transition-transform ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-current transition-opacity ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-current transition-transform ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-4 shadow-xl">
          <div className="flex flex-col space-y-4 px-6">
            {NAV_LINKS.map(link => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base font-medium ${
                  activeSection === link.id 
                    ? 'text-teal-600 dark:text-teal-400' 
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in-up">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold tracking-wide uppercase border border-slate-200 dark:border-slate-700">
          <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
          Available for new projects
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
            View Projects
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="/resume.pdf" className="px-8 py-3.5 bg-transparent border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center gap-2">
            <Download size={18} />
            Download Resume
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-slate-400 dark:text-slate-600">
        <ChevronDown size={24} />
      </div>
    </section>
  );
};

const TerminalAbout = () => {
  const [history, setHistory] = useState([
    { type: 'output', content: 'Welcome to ernesto.sh v1.0.0' },
    { type: 'output', content: 'Type "help" to see available commands.' },
  ]);
  const [input, setInput] = useState('');
  const terminalBodyRef = useRef(null);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      const newHistory = [...history, { type: 'input', content: input }];

      let response = '';
      switch (cmd) {
        case 'help':
          response = 'Available commands: about, skills, contact, clear';
          break;
        case 'about':
          response = 'I am a Full Stack Developer bridging the gap between design and engineering. Based in Global/Remote.';
          break;
        case 'skills':
          response = 'Frontend: React, Next.js | Backend: Node, Go | Database: Postgres, Redis';
          break;
        case 'contact':
          response = 'Email: ernestokevin1996@gmail.com | LinkedIn: Ernesto Kevin Handoyo';
          break;
        case 'clear':
          setHistory([]);
          setInput('');
          return;
        default:
          response = `Command not found: ${cmd}. Type "help" for assistance.`;
      }

      newHistory.push({ type: 'output', content: response });
      setHistory(newHistory);
      setInput('');
    }
  };

  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <Section id="about" className="bg-slate-50 dark:bg-slate-900/50">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">About Me</h2>
          <div className="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed">
            <p>
              I bridge the gap between design and engineering. My philosophy is simple: technology should be invisible, enabling users to achieve their goals without friction.
            </p>
            <p>
              With a background in both visual design and distributed systems, I bring a unique perspective to full-stack development. I don't just write code; I build product ecosystems.
            </p>
            <p>
              When I'm not deploying to production, you'll find me contributing to open source, optimizing my Vim config, or exploring minimal architecture.
            </p>
          </div>
        </div>

        {/* Interactive Terminal UI */}
        <div className="rounded-xl overflow-hidden bg-slate-900 shadow-2xl border border-slate-700 font-mono text-sm h-80 flex flex-col">
          <div className="bg-slate-800 px-4 py-3 flex items-center gap-2 border-b border-slate-700 shrink-0">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="ml-4 text-slate-400 text-xs">user@ernesto:~/interactive</div>
          </div>
          <div 
            ref={terminalBodyRef}
            className="p-4 text-slate-300 flex-1 overflow-y-auto custom-scrollbar"
          >
            {history.map((line, i) => (
              <div key={i} className="mb-2 break-words">
                {line.type === 'input' ? (
                  <div>
                    <span className="text-teal-400">➜</span> <span className="text-purple-400">~</span> <span className="text-white">{line.content}</span>
                  </div>
                ) : (
                  <div className="text-slate-400 pl-4">{line.content}</div>
                )}
              </div>
            ))}
            <div className="flex items-center gap-2 mt-2">
              <span className="text-teal-400">➜</span>
              <span className="text-purple-400">~</span>
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleCommand}
                className="bg-transparent border-none outline-none text-white w-full"
                placeholder="Type 'help'..."
              />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

const TechStack = () => {
  return (
    <Section id="stack">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Technical Arsenal</h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          I choose the right tool for the job. Here is my preferred stack for building scalable, high-performance applications.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(SKILLS).map(([key, category]) => (
          <div key={key} className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-6 text-teal-600 dark:text-teal-400">
              <div className="p-2 bg-teal-50 dark:bg-teal-900/30 rounded-lg">
                {category.icon}
              </div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white capitalize">{category.title}</h3>
            </div>
            <ul className="space-y-2">
              {category.skills.map(skill => (
                <li key={skill} className="flex items-center text-slate-600 dark:text-slate-400 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-600 mr-2"></span>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
};

const StatItem = ({ value, suffix, label }) => {
  const [count, ref] = useCounter(value);

  return (
    <div ref={ref} className="space-y-2">
      <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-indigo-600">
        {count}{suffix}
      </div>
      <div className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
};

const StatsSection = () => {
  return (
    <div className="border-y border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STATS.map((stat, index) => (
            <StatItem
              key={index}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const [filter, setFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const categories = ['All', 'Frontend', 'Backend', 'Systems'];

  const filteredProjects = filter === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === filter);

  return (
    <Section id="projects" className="bg-slate-50 dark:bg-slate-900/50">
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Featured Projects</h2>
          <p className="text-slate-600 dark:text-slate-400">A selection of recent work and experiments.</p>
        </div>
        <div className="flex gap-2 p-1 bg-slate-200 dark:bg-slate-800 rounded-lg">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                filter === cat 
                  ? 'bg-white dark:bg-slate-700 text-teal-600 dark:text-teal-400 shadow-sm' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, index) => (
          <div key={index} className="group bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full animate-fade-in">
            <div 
              className="h-48 w-full bg-slate-200 relative overflow-hidden cursor-pointer"
              style={{ background: project.image }}
              onClick={() => setSelectedProject(project)}
            >
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                <button className="flex items-center gap-2 px-4 py-2 bg-white text-slate-900 rounded-full font-medium transform hover:scale-105 transition-transform">
                  <Eye size={18} /> Quick View
                </button>
              </div>
              <div className="absolute top-4 right-4 px-2 py-1 bg-black/50 backdrop-blur-md text-white text-xs font-bold rounded uppercase tracking-wider">
                {project.category}
              </div>
            </div>
            
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors cursor-pointer" onClick={() => setSelectedProject(project)}>
                  {project.title}
                </h3>
                <div className="flex gap-2">
                   <a href={project.repo} className="text-slate-400 hover:text-teal-500 transition-colors"><Github size={16}/></a>
                   <a href={project.link} className="text-slate-400 hover:text-teal-500 transition-colors"><ExternalLink size={16}/></a>
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 flex-1">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tags.map(tag => (
                  <span key={tag} className="px-2.5 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs rounded-md font-medium border border-slate-200 dark:border-slate-600">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <ProjectModal 
        project={selectedProject} 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </Section>
  );
};

const UiUxShowcase = () => {
  return (
    <Section id="design">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            UI/UX Design
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl">
            Beyond code, I craft digital experiences that look beautiful and feel intuitive.
          </p>
        </div>
        <div className="flex gap-2">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg">
                <Palette size={20} />
            </div>
             <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                <Smartphone size={20} />
            </div>
             <div className="p-2 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 rounded-lg">
                <PenTool size={20} />
            </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {DESIGN_PORTFOLIO.map((item, index) => (
          <div key={index} className="group relative rounded-2xl overflow-hidden cursor-pointer h-80 shadow-md hover:shadow-2xl transition-all">
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${item.color} transition-transform duration-700 group-hover:scale-110`}></div>
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-colors duration-300"></div>
            
            {/* Content */}
            <div className="absolute bottom-0 left-0 w-full p-8 text-white transform translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
               <div className="text-xs font-bold uppercase tracking-wider mb-2 opacity-80 flex items-center gap-2">
                 <span className="w-1 h-1 bg-white rounded-full"></span>
                 {item.category}
               </div>
               <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
               <p className="text-sm text-slate-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mb-6 leading-relaxed">
                 {item.description}
               </p>
               <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  <div className="flex gap-2">
                      {item.tools.map(t => (
                          <span key={t} className="text-[10px] font-medium border border-white/30 bg-white/10 px-2 py-1 rounded backdrop-blur-md">
                            {t}
                          </span>
                      ))}
                  </div>
                   <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle download logic here
                    }}
                    className="flex items-center gap-1 text-xs font-bold bg-white text-slate-900 px-3 py-1.5 rounded-full hover:bg-teal-50 transition-colors"
                  >
                    <Download size={12} /> Download
                  </button>
               </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

const CaseStudies = () => {
  return (
    <Section id="casestudies">
      <div className="bg-slate-900 rounded-2xl p-8 md:p-12 text-white overflow-hidden relative">
        {/* Abstract Pattern */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="relative z-10 grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="inline-block px-3 py-1 rounded bg-teal-500/20 text-teal-300 text-xs font-bold uppercase tracking-wider">
              Featured Case Study
            </div>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              {CASE_STUDY.title}
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed">
              {CASE_STUDY.summary}
            </p>
            
            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-slate-800">
              <div>
                <p className="text-slate-500 text-xs uppercase tracking-wide font-semibold mb-1">My Role</p>
                <p className="font-medium text-slate-200">{CASE_STUDY.role}</p>
              </div>
              <div>
                <p className="text-slate-500 text-xs uppercase tracking-wide font-semibold mb-1">Impact</p>
                <p className="font-medium text-teal-400">{CASE_STUDY.impact}</p>
              </div>
            </div>

            <button className="text-white border-b border-teal-500 pb-1 hover:text-teal-400 transition-colors inline-flex items-center gap-2">
              Read full retrospective <ArrowRight size={16} />
            </button>
          </div>

          <div className="flex flex-col justify-center space-y-4">
             <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 backdrop-blur-sm">
                <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Architecture Highlights</h4>
                <ul className="space-y-3">
                  {['Decoupled Frontend via Federation', 'Event Sourcing with Kafka', 'Redis Caching Strategy', 'Auto-scaling K8s Clusters'].map((item, i) => (
                    <li key={i} className="flex items-center text-slate-300 text-sm">
                       <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mr-3"></span>
                       {item}
                    </li>
                  ))}
                </ul>
             </div>
             <div className="flex gap-2">
                {CASE_STUDY.stack.map(tech => (
                  <span key={tech} className="px-3 py-1 bg-slate-800 text-slate-300 rounded text-xs border border-slate-700">
                    {tech}
                  </span>
                ))}
             </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

const Experience = () => {
  return (
    <Section id="experience" className="bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-12 text-center">Experience</h2>
        
        <div className="relative border-l-2 border-slate-200 dark:border-slate-700 ml-3 md:ml-6 space-y-12">
          {EXPERIENCE.map((job, index) => (
            <div key={index} className="relative pl-8 md:pl-12">
              <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-teal-500 border-4 border-white dark:border-slate-900"></span>
              
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{job.company}</h3>
                <span className="text-sm font-mono text-slate-500 dark:text-slate-500">{job.period}</span>
              </div>
              
              <div className="text-teal-600 dark:text-teal-400 font-medium mb-3">{job.role}</div>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {job.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

const Testimonials = () => {
  return (
    <Section id="testimonials">
      <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-12 text-center">What People Say</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {TESTIMONIALS.map((t, i) => (
          <div key={i} className="bg-white dark:bg-slate-800 p-8 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm relative">
            <Quote className="absolute top-8 right-8 text-teal-500/20 w-10 h-10" />
            <p className="text-slate-600 dark:text-slate-400 italic mb-6 relative z-10">"{t.text}"</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold text-slate-500">
                {t.author[0]}
              </div>
              <div>
                <div className="font-bold text-slate-900 dark:text-white text-sm">{t.author}</div>
                <div className="text-teal-600 dark:text-teal-400 text-xs">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

const Blog = () => {
  return (
    <Section id="blog" className="bg-slate-50 dark:bg-slate-900/50">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Latest Writings</h2>
        <a href="#" className="text-teal-600 dark:text-teal-400 hover:underline font-medium text-sm">View all posts</a>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {BLOG_POSTS.map((post, index) => (
          <article key={index} className="group cursor-pointer">
            <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-500 mb-3 font-mono">
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
              {post.title}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
              {post.excerpt}
            </p>
            <div className="flex items-center gap-1 text-teal-600 dark:text-teal-400 text-sm font-medium group-hover:translate-x-1 transition-transform">
              Read Article <ArrowRight size={14} />
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
};

const Contact = ({ onSendMessage }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSendMessage();
  };

  return (
    <Section id="contact">
      <div className="max-w-xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Let's build something together</h2>
        <p className="text-slate-600 dark:text-slate-400">
          Currently open for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
        </p>
      </div>

      <div className="max-w-md mx-auto bg-white dark:bg-slate-800 p-8 rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Name</label>
            <input required type="text" className="w-full px-4 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-900 dark:text-white transition-all" placeholder="Jane Doe" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
            <input required type="email" className="w-full px-4 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-900 dark:text-white transition-all" placeholder="jane@example.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Message</label>
            <textarea required rows="4" className="w-full px-4 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-900 dark:text-white transition-all resize-none" placeholder="Hello..." />
          </div>
          <button type="submit" className="w-full py-3 bg-teal-600 text-white rounded-lg font-bold hover:bg-teal-700 transition-colors shadow-lg shadow-teal-500/20">
            Send Message
          </button>
        </form>
      </div>
    </Section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Ernesto Kevin Handoyo</h3>
          <p className="text-slate-500 dark:text-slate-500 text-sm mt-1">Full Stack Developer • UI/UX Designer</p>
        </div>
        
        <div className="flex gap-6">
          <a href="#" className="text-slate-500 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
            <Github size={20} />
          </a>
          <a href="https://www.linkedin.com/in/ernesto-kevin-handoyo" className="text-slate-500 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
            <Linkedin size={20} />
          </a>
          <a href="#" className="text-slate-500 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
            <Mail size={20} />
          </a>
        </div>
        
        <div className="text-slate-400 text-xs">
          &copy; {new Date().getFullYear()} Ernesto. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

/**
 * ROOT COMPONENT
 */

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Initialize Theme based on system or local storage
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const handleSendMessage = () => {
    setShowToast(true);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans selection:bg-teal-500/30 ${darkMode ? 'dark bg-slate-900' : 'bg-white'}`}>
      <ScrollProgress />
      <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />
      
      <main>
        <Hero />
        <TerminalAbout />
        <TechStack />
        <Projects />
        {/* <UiUxShowcase /> */}
        <StatsSection />
        <Experience />
        <Contact onSendMessage={handleSendMessage} />
      </main>

      <Footer />
      <Toast 
        message="Message sent successfully!" 
        isVisible={showToast} 
        onClose={() => setShowToast(false)} 
      />
    </div>
  );
};

export default App;