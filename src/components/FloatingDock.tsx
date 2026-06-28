import React, { useEffect, useState } from "react";
import { Briefcase, AppWindow, User, Mail, FileText } from "lucide-react";

type ActiveSection = "work" | "projects" | "about" | "contact";

interface FloatingDockProps {
  onResumeClick: () => void;
}

export default function FloatingDock({ onResumeClick }: FloatingDockProps) {
  const [active, setActive] = useState<ActiveSection>("work");

  useEffect(() => {
    const sections: ActiveSection[] = ["work", "about", "projects", "contact"];
    
    const handleScroll = () => {
      let currentSection: ActiveSection = "work";
      
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4) {
            currentSection = section;
          }
        }
      }
      setActive(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navItems = [
    { id: "work", label: "Work", icon: Briefcase },
    { id: "about", label: "About", icon: User },
    { id: "projects", label: "Projects", icon: AppWindow },
    { id: "resume", label: "Resume", icon: FileText, action: true },
    { id: "contact", label: "Contact", icon: Mail }
  ];

  return (
    <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1.5 px-3 py-2 rounded-full border border-border-theme bg-surface-theme/85 backdrop-blur-md shadow-lg scale-100 transition-all duration-150">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = active === item.id;

        if (item.action) {
          return (
            <button
              key={item.id}
              onClick={onResumeClick}
              className="flex flex-col items-center gap-0.5 group relative px-4.5 py-2 rounded-full transition-all duration-150 border border-transparent text-text-variant hover:text-text-theme hover:bg-surface-container-theme/50 cursor-pointer"
            >
              <Icon className="w-4 h-4" />
              <span className="text-[10px] font-sans font-bold uppercase tracking-wider hidden sm:block">
                {item.label}
              </span>
            </button>
          );
        }

        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => handleLinkClick(e, item.id)}
            className={`flex flex-col items-center gap-0.5 group relative px-4.5 py-2 rounded-full transition-all duration-150 border ${
              isActive 
                ? "text-white bg-secondary-theme border-transparent shadow-sm" 
                : "text-text-variant border-transparent hover:text-text-theme hover:bg-surface-container-theme/50"
            }`}
          >
            <Icon className="w-4 h-4" />
            <span className="text-[10px] font-sans font-bold uppercase tracking-wider hidden sm:block">
              {item.label}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
