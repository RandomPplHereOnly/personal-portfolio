Here is a comprehensive README.md designed for the code you provided. It includes setup instructions, a breakdown of features, configuration for the custom animations used in the code, and a guide on how to customize the content.
Ernesto.dev - Modern Developer Portfolio

A sleek, high-performance personal portfolio website built with React and Tailwind CSS. This project features a dark/light mode toggle, an interactive terminal simulation, scroll-reveal animations, and a responsive design suitable for Full Stack Developers, UI/UX Designers, and Software Engineers.

![alt text](https://img.shields.io/badge/license-MIT-blue.svg)


![alt text](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)


![alt text](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?logo=tailwind-css)

✨ Features

    🎨 Dynamic Theme: Fully functional Dark/Light mode toggle with persistence.

    💻 Interactive Terminal: A playable "About Me" terminal component that accepts commands (help, about, skills, contact).

    📱 Fully Responsive: Mobile-first design with a custom hamburger menu.

    ⚡ Smooth Animations: Custom CSS keyframe animations for scroll reveals, fading, and scaling.

    👁️ Project Modals: detailed pop-up modals for showcasing project details without leaving the page.

    🔧 Tech Stack Visualization: Clean grid layout for skills and technologies.

    🔔 Toast Notifications: Custom notification system for form actions.

    📍 Scroll Spy: Navigation links highlight automatically as you scroll through sections.

🚀 Getting Started
Prerequisites

    Node.js (v16 or higher)

    npm or yarn

Installation

    Create a new React project (if you haven't already):
    code Bash

    npm create vite@latest my-portfolio -- --template react
    # or
    npx create-react-app my-portfolio

    Install Tailwind CSS:
    Follow the official Tailwind installation guide to generate your tailwind.config.js and postcss.config.js.

    Install Dependencies:
    This project relies on lucide-react for icons.
    code Bash

    npm install lucide-react

    Add the Code:
    Replace the contents of your src/App.jsx (or App.js) with the code provided in this repository.

⚙️ Configuration (Crucial)

The code utilizes custom animations (like animate-fade-in-up, animate-scale-up). You must extend your tailwind.config.js file to support these classes:
code JavaScript

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'scale-up': 'scaleUp 0.3s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleUp: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}

Running Locally
code Bash

npm run dev

📝 Customization

All data is contained within constant arrays at the top of the file. You do not need to edit the HTML structure to change the content.
1. Personal Info & Links

Edit the NAV_LINKS array and the hardcoded strings in the Hero and Footer components to change your name and social links.
2. Skills

Modify the SKILLS object. Keys (frontend, backend, etc.) determine the categories.
code JavaScript

const SKILLS = {
  frontend: { 
    icon: <Layout />, 
    title: "Frontend", 
    skills: ["Your", "Skills", "Here"] 
  },
  // ...
};

3. Projects

Update the PROJECTS array. The image property currently uses CSS gradients, but you can replace these with URL strings for actual screenshots.
code JavaScript

const PROJECTS = [
  {
    title: "Your Project",
    category: "Full Stack",
    description: "Short summary...",
    longDescription: "Modal content...",
    tags: ["React", "Node"],
    // Use an image URL here if preferred:
    // image: "url('/path/to/image.jpg')", 
    image: "linear-gradient(...)", 
    link: "https://your-demo.com",
    repo: "https://github.com/your/repo"
  },
];

4. Terminal Content

To change what the "Terminal" says, look for the handleCommand function inside the TerminalAbout component and update the switch case responses:
code JavaScript

case 'about':
  response = 'Your custom bio goes here...';
  break;

📂 Project Structure

Although provided as a single file for portability, a recommended structure for production would be:
code Text

src/
├── components/
│   ├── ui/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── ProjectModal.jsx
│   ├── sections/
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Projects.jsx
│   │   └── Contact.jsx
│   └── hooks/
│       ├── useScrollReveal.js
│       └── useActiveSection.js
├── data/
│   └── constants.js
├── App.jsx
└── main.jsx

🚀 Deployment

This project is optimized for static hosting.

Vercel:

    Push your code to GitHub.

    Import the repo into Vercel.

    Framework Preset: Vite (or Create React App).

    Deploy.

Netlify:

    Drag and drop your dist (build folder) or connect via Git.

📄 License

This project is open source and available under the MIT License. Feel free to use this code for your personal portfolio.
👤 Author

Ernesto Kevin Handoyo

    LinkedIn: Ernesto Kevin Handoyo