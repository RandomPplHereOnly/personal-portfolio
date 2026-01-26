import { Layout, Server, Database, Cpu } from 'lucide-react';

export const NAV_LINKS = [
  { name: 'About', href: '#about', id: 'about' },
  { name: 'Stack', href: '#stack', id: 'stack' },
  { name: 'Projects', href: '#projects', id: 'projects' },
  { name: 'Design', href: '#design', id: 'design' },
  { name: 'Experience', href: '#experience', id: 'experience' },
  { name: 'Contact', href: '#contact', id: 'contact' },
];

export const SKILLS = {
  frontend: { icon: <Layout className="w-5 h-5" />, title: "Frontend", skills: ["React", "Next.js", "Nuxt.js", "TypeScript", "Tailwind CSS", "Vue.js" , "Bootstrap", "Android", "Kotlin"},
  backend: { icon: <Server className="w-5 h-5" />, title: "Backend", skills: ["Node.js", "Python", "Go", "Laravel", "Express", "NestJS", "GraphQL"] },
  database: { icon: <Database className="w-5 h-5" />, title: "Database", skills: ["PostgreSQL", "MongoDB", "Redis", "Supabase", "Prisma"] },
  devops: { icon: <Cpu className="w-5 h-5" />, title: "DevOps", skills: ["Docker", "AWS", "CI/CD", "Terraform", "Vercel"] },
};

export const PROJECTS = [
  {
    title: "HiBob!",
    category: "Systems", 
    description: "Real-time staff position tracking platform for monitoring and coordinating field patrol teams.",
    longDescription: "Designed for operational visibility and safety. The system provides live GPS tracking of field staff, allowing supervisors to monitor patrol routes, respond quickly to incidents, and ensure coverage across assigned zones.",
    tags: ["Codeigniter", "Express", "Node.js", "WebSockets", "MQTT"],
    image: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", 
    link: "https://hibob.id/",
    repo: "#"
  },
  {
    title: "Chandra Remittance",
    category: "Frontend", 
    description: "Digital foreign currency trading and international money transfer platform built for migrant workers.",
    longDescription: "A web and mobile application enabling migrant workers to trade foreign currencies and send money overseas securely and efficiently.",
    tags: ["Bootstrap", "Node.js"],
    image: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", 
    link: "#",
    repo: "#"
  },
  {
    title: "Temperature Control System",
    category: "Systems",
    description: "Smart temperature monitoring and automated air conditioning control application.",
    longDescription: "Tracks real-time temperature data and automatically activates or deactivates air conditioning systems based on predefined thresholds.",
    tags: ["Django", "Python", "Flask"],
    image: "linear-gradient(135deg, #134e4a 0%, #0f766e 100%)", 
    link: "#",
    repo: "#"
  },
  {
    title: "Smart Parking Monitor",
    category: "Backend",
    description: "Vehicle entry and exit detection system for real-time parking space monitoring.",
    longDescription: "Detects vehicles entering and leaving a parking area to automatically calculate available parking spaces.",
    tags: ["Node.JS", "MQTT", "Express"],
    image: "linear-gradient(135deg, #312e81 0%, #4338ca 100%)", 
    link: "#",
    repo: "#"
  },
  {
    title: "Eventnia",
    category: "Systems",
    description: "Integrated accommodation and event booking platform.",
    longDescription: "Combines short-term accommodation reservations with event booking in a single platform.",
    tags: ["Quasar", "Vue.JS", "Laravel", "Pubnub"],
    image: "linear-gradient(135deg, #701a75 0%, #4a044e 100%)", 
    link: "#",
    repo: "#"
  }
];

export const DESIGN_PORTFOLIO = [
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

export const EXPERIENCE = [
  {
    company: "PT. Jovimaro Karya Agung",
    role: "Full Stack Developer",
    period: "2020 - 2025",
    description: "Partnered with early-stage startups to improve accuracy and detection of smart monitoring position system"
  }
];

export const STATS = [
  { label: "Years Experience", value: 5, suffix: "+" },
  { label: "Projects Shipped", value: 10, suffix: "+" },
  { label: "Happy Clients", value: 12, suffix: "" },
  { label: "Coffee Consumed", value: 5000, suffix: "L" },
];