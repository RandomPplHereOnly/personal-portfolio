import React, { useState, useEffect } from 'react';
import { Navbar, Footer, ScrollProgress, Toast } from './components/Layout';
import { Hero, TerminalAbout, TechStack, Projects, UiUxShowcase, StatsSection, Experience, Contact } from './components/Sections';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [showToast, setShowToast] = useState(false);

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
      <Toast message="Message sent successfully!" isVisible={showToast} onClose={() => setShowToast(false)} />
    </div>
  );
};

export default App;