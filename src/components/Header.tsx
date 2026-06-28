import { Sun, Moon, Mail, Settings } from "lucide-react";
import { useEffect, useState } from "react";

interface HeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
  logoName: string;
  onOpenAdmin: () => void;
}

export default function Header({ isDark, onToggleTheme, logoName, onOpenAdmin }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getInitials = (name: string) => {
    const clean = name.replace(/[^a-zA-Z\s]/g, "");
    const parts = clean.split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 px-6 md:px-12 flex justify-between items-center border-b border-border-theme/40 ${
        isScrolled 
          ? "bg-bg-theme/95 h-16 shadow-md backdrop-blur-md" 
          : "bg-bg-theme h-20"
      }`}
    >
      <a 
        href="#work" 
        className="text-xl font-bold tracking-tight text-text-theme hover:opacity-75 transition-opacity"
      >
        {logoName}
      </a>
      
      <div className="flex items-center gap-3">
        {/* Modern Admin Portal button */}
        <button
          onClick={onOpenAdmin}
          className="px-4 h-10 flex items-center gap-1.5 rounded-full border border-border-theme bg-primary-theme text-on-primary-theme font-sans text-xs font-semibold hover:bg-secondary-theme hover:text-white transition-all duration-200 cursor-pointer"
          title="Open Admin Portal to Edit Everything"
        >
          <Settings className="w-4 h-4 animate-[spin_12s_linear_infinite]" />
          <span className="hidden sm:inline">Admin Panel</span>
        </button>

        {/* Theme Toggle Button - Modern Circle */}
        <button
          onClick={onToggleTheme}
          className="w-10 h-10 flex items-center justify-center rounded-full border border-border-theme bg-surface-theme text-text-theme hover:bg-secondary-theme hover:text-white transition-all duration-200 cursor-pointer"
          aria-label="Toggle theme"
          title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Contact Email Link - Modern Circle */}
        <a
          href="#contact"
          className="w-10 h-10 flex items-center justify-center rounded-full border border-border-theme bg-surface-theme text-text-theme hover:bg-secondary-theme hover:text-white transition-all duration-200 relative group"
          aria-label="Contact Section"
          title="Send a message"
        >
          <Mail className="w-4.5 h-4.5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-secondary-theme rounded-full animate-ping" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-secondary-theme rounded-full" />
        </a>

        {/* Modern Initials Avatar */}
        <div className="w-10 h-10 bg-surface-container-theme text-text-theme border border-border-theme rounded-full flex items-center justify-center font-bold uppercase text-xs select-none">
          {getInitials(logoName)}
        </div>
      </div>
    </nav>
  );
}
