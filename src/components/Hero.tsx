import { ArrowDown, Download } from "lucide-react";
import { PortfolioData } from "../types";

interface HeroProps {
  onResumeOpen: () => void;
  heroData: PortfolioData["hero"];
}

export default function Hero({ onResumeOpen, heroData }: HeroProps) {
  const formattedHeadline = () => {
    if (heroData.headline.includes("&")) {
      const parts = heroData.headline.split("&");
      return (
        <>
          {parts[0]}&amp;<br/>{parts[1]}
        </>
      );
    }
    return heroData.headline;
  };

  return (
    <section 
      id="work" 
      className="min-h-[85vh] flex flex-col justify-center items-start pt-28 pb-12 hero-gradient relative select-none"
    >
      <div className="max-w-5xl text-left">
        {/* Animated Headline - Elegant Modern Block Title */}
        <h1 className="text-6xl md:text-[80px] lg:text-[95px] leading-[0.9] font-black tracking-tight mb-6 text-text-theme opacity-0 animate-[fadeInUp_0.8s_cubic-bezier(0.16,1,0.3,1)_forwards] break-words max-w-full">
          {formattedHeadline()}
        </h1>

        {/* Description - Editorial sans serif */}
        <p className="font-sans text-lg md:text-[22px] leading-relaxed font-medium text-text-variant mb-10 max-w-2xl opacity-0 animate-[fadeInUp_0.8s_cubic-bezier(0.16,1,0.3,1)_0.15s_forwards] border-l-2 border-secondary-theme pl-4">
          {heroData.description}
        </p>

        {/* CTA Actions - Modern Pill Buttons */}
        <div className="flex flex-wrap gap-4 opacity-0 animate-[fadeInUp_0.8s_cubic-bezier(0.16,1,0.3,1)_0.3s_forwards]">
          <a 
            href="#projects"
            className="brutalist-button px-8 py-4 flex items-center gap-2 text-sm rounded-full"
          >
            {heroData.buttonText1}
            <ArrowDown className="w-4 h-4" />
          </a>
          
          <button 
            onClick={onResumeOpen}
            className="border border-border-theme bg-surface-theme text-text-theme hover:bg-surface-container-theme font-semibold text-sm px-8 py-4 rounded-full shadow-sm hover:scale-102 active:scale-98 transition-all duration-200 cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <Download className="w-4.5 h-4.5 text-secondary-theme" />
              {heroData.buttonText2}
            </span>
          </button>
        </div>
      </div>

      {/* Decorative vertical spacer or minimal layout element */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-text-variant/60">
        <span className="text-[10px] tracking-[0.3em] uppercase font-semibold">Scroll</span>
        <div className="w-1.5 h-12 bg-surface-container-theme rounded-full overflow-hidden relative border border-border-theme/30">
          <div className="w-full h-1/2 bg-secondary-theme absolute top-0 rounded-full animate-[scroll_2s_infinite]" />
        </div>
      </div>
    </section>
  );
}
