import { useEffect, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Approach from "./components/Approach";
import Projects from "./components/Projects";
import Timeline from "./components/Timeline";
import ContactForm from "./components/ContactForm";
import FloatingDock from "./components/FloatingDock";
import PixelDog from "./components/PixelDog";
import ResumeModal from "./components/ResumeModal";
import CursorFollower from "./components/CursorFollower";
import AdminPortal from "./components/AdminPortal";
import Photography from "./components/Photography";
import ResumePreview from "./components/ResumePreview";
import { DEFAULT_PORTFOLIO_DATA } from "./defaultData";
import { PortfolioData } from "./types";

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Load portfolio template data from localStorage or fallback to default
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(() => {
    try {
      const saved = localStorage.getItem("portfolio_template_data");
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_PORTFOLIO_DATA,
          ...parsed,
          resume: parsed.resume || DEFAULT_PORTFOLIO_DATA.resume
        };
      }
    } catch (e) {
      console.error("Error reading portfolio_template_data", e);
    }
    return DEFAULT_PORTFOLIO_DATA;
  });

  // Synchronize dark class on document root
  useEffect(() => {
    const htmlClass = document.documentElement.classList;
    if (isDark) {
      htmlClass.add("dark");
    } else {
      htmlClass.remove("dark");
    }
  }, [isDark]);

  // Track page visits
  useEffect(() => {
    try {
      const visitsStr = localStorage.getItem("portfolio_visits") || "0";
      const visits = parseInt(visitsStr, 10) + 1;
      localStorage.setItem("portfolio_visits", visits.toString());
    } catch (e) {
      console.error(e);
    }
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  // Save changes from Admin Portal
  const handleSavePortfolioData = (newData: PortfolioData) => {
    setPortfolioData(newData);
    localStorage.setItem("portfolio_template_data", JSON.stringify(newData));
  };

  // Reset to default template
  const handleResetPortfolioData = () => {
    setPortfolioData(DEFAULT_PORTFOLIO_DATA);
    localStorage.removeItem("portfolio_template_data");
  };

  return (
    <div className="min-h-screen bg-bg-theme text-text-theme font-sans selection:bg-secondary-theme/20 selection:text-secondary-theme transition-colors duration-300">
      {/* Top Fixed Header with admin trigger */}
      <Header 
        isDark={isDark} 
        onToggleTheme={toggleTheme} 
        logoName={portfolioData.hero.logoName}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Main Content Layout */}
      <main className="max-w-7xl mx-auto px-6 md:px-16 pb-36 space-y-12">
        {/* Home & Hero section */}
        <Hero 
          onResumeOpen={() => setIsResumeOpen(true)} 
          heroData={portfolioData.hero}
        />

        {/* Dynamic skills approach */}
        <Approach aboutData={portfolioData.about} />

        {/* Selected Projects */}
        <Projects projectsData={portfolioData.projects} />

        {/* Historical Timeline */}
        <Timeline timelineData={portfolioData.timeline} />

        {/* Photography Showcase */}
        <Photography photographyData={portfolioData.photography} />

        {/* Interactive Validation Contact Section */}
        <ContactForm recipientEmail={portfolioData.resume.email} />
      </main>

      {/* Fixed Navigation Dock */}
      <FloatingDock onResumeClick={() => setIsResumeOpen(true)} />

      {/* Interactive Draggable Dog Widget */}
      <PixelDog />

      {/* Subtle Brutalist Cursor Follower Effect */}
      <CursorFollower />

      {/* Immersive printable Resume Modal */}
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} resumeData={portfolioData.resume} />

      {/* Admin Panel Drawer Modal */}
      <AdminPortal 
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        data={portfolioData}
        onSave={handleSavePortfolioData}
        onReset={handleResetPortfolioData}
      />
    </div>
  );
}
