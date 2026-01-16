import { useState, useEffect } from 'react';

import { Navbar, Footer, ScrollProgress } from './temp/components';
import {
  Hero,
  TerminalAbout,
  TechStack,
  Projects,
  UiUxShowcase,
  CaseStudies,
  StatsSection,
  Experience,
  Testimonials,
  Blog,
  Contact,
} from './temp/sections';

import { Toast } from './temp/components';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, []);

  return (
    <div className={darkMode ? 'dark bg-slate-900' : 'bg-white'}>
      <ScrollProgress />
      <Navbar darkMode={darkMode} toggleTheme={() => setDarkMode(!darkMode)} />

      <main>
        <Hero />
        <TerminalAbout />
        <TechStack />
        <Projects />
        <UiUxShowcase />
        <CaseStudies />
        <StatsSection />
        <Experience />
        <Testimonials />
        <Blog />
        <Contact onSendMessage={() => setShowToast(true)} />
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