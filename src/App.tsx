import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
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

  // Initialize with defaults, but we will fetch live data from Firebase
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(DEFAULT_PORTFOLIO_DATA);
  const [isLoading, setIsLoading] = useState(true);

  const FIREBASE_URL = "https://portfolio-for-all-9fdc3-default-rtdb.firebaseio.com/portfolio.json";

  // Load portfolio template data from Firebase
  useEffect(() => {
    fetch(FIREBASE_URL)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then(data => {
        if (data && !data.error) {
          setPortfolioData({
            ...DEFAULT_PORTFOLIO_DATA,
            ...data,
            resume: data.resume || DEFAULT_PORTFOLIO_DATA.resume
          });
        }
      })
      .catch(err => {
        console.error("Failed to fetch portfolio data from Firebase:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

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

  // Save changes from Admin Portal to Firebase
  const handleSavePortfolioData = async (newData: PortfolioData) => {
    const res = await fetch(FIREBASE_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newData)
    });
    if (!res.ok) {
      throw new Error(`Firebase save failed with status: ${res.status}`);
    }
    setPortfolioData(newData);
  };

  // Reset to default template on Firebase
  const handleResetPortfolioData = async () => {
    const res = await fetch(FIREBASE_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(DEFAULT_PORTFOLIO_DATA)
    });
    if (!res.ok) {
      throw new Error(`Firebase reset failed with status: ${res.status}`);
    }
    setPortfolioData(DEFAULT_PORTFOLIO_DATA);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg-theme flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-secondary-theme" />
      </div>
    );
  }

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
