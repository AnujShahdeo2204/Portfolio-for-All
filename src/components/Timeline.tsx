import { useState } from "react";
import { Briefcase, GraduationCap, ChevronDown, ChevronUp } from "lucide-react";
import { PortfolioData } from "../types";

interface TimelineProps {
  timelineData: PortfolioData["timeline"];
}

export default function Timeline({ timelineData }: TimelineProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="timeline" className="py-24 md:py-32 border-t border-border-theme/40 text-left">
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text-theme mb-12">
        {timelineData.title}
      </h2>

      <div className="max-w-3xl ml-4 md:ml-8 border-l-2 border-border-theme/40 relative">
        {timelineData.items.map((item) => {
          const isExpanded = expandedId === item.id;
          const isEducation = item.title.includes("BSc") || item.title.includes("Science") || item.title.includes("Degree") || item.title.includes("University") || item.title.includes("College") || item.title.includes("School") || item.title.includes("Education");

          return (
            <div 
              key={item.id} 
              className="mb-12 relative pl-8 md:pl-10 group"
            >
              {/* Custom Timeline Dot with Icons (Circular Modern) */}
              <div 
                className={`absolute -left-[19px] top-1.5 w-9 h-9 rounded-full border border-border-theme flex items-center justify-center transition-all duration-200 ${
                  isExpanded 
                    ? "bg-secondary-theme text-white border-transparent shadow-sm" 
                    : "bg-surface-theme text-text-theme group-hover:bg-secondary-theme group-hover:text-white"
                }`}
              >
                {isEducation ? (
                  <GraduationCap className="w-4.5 h-4.5" />
                ) : (
                  <Briefcase className="w-4.5 h-4.5" />
                )}
              </div>

              {/* Timestamp */}
              <span className="text-xs font-mono font-bold tracking-widest text-secondary-theme uppercase block mb-1.5">
                {item.period}
              </span>

              {/* Title & Organization Header */}
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight text-text-theme group-hover:text-secondary-theme transition-colors mt-0.5">
                    {item.title}
                  </h3>
                  <div className="mt-1.5">
                    <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-text-theme/80 bg-surface-container-theme px-2 py-0.5 rounded-md inline-block">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
                
                {/* Expand Toggle Button */}
                <button
                  onClick={() => toggleExpand(item.id)}
                  className="p-1.5 border border-border-theme bg-surface-theme hover:bg-secondary-theme hover:text-white hover:border-transparent text-text-theme rounded-full transition-all duration-200 cursor-pointer shadow-sm"
                  title={isExpanded ? "Collapse Details" : "Expand Details"}
                >
                  {isExpanded ? (
                    <ChevronUp className="w-4.5 h-4.5" />
                  ) : (
                    <ChevronDown className="w-4.5 h-4.5" />
                  )}
                </button>
              </div>

              {/* Description summary */}
              <p className="font-sans text-sm md:text-base font-medium text-text-variant mt-3 leading-relaxed max-w-2xl">
                {item.description}
              </p>

              {/* Accordion Expanded Content (Achievements / Milestones) */}
              <div 
                className={`transition-all duration-300 overflow-hidden ${
                  isExpanded 
                    ? "max-h-[500px] mt-4 opacity-100" 
                    : "max-h-0 opacity-0 pointer-events-none"
                }`}
              >
                <div className="bg-surface-theme/50 p-5 border border-border-theme max-w-2xl shadow-sm rounded-2xl">
                  <h4 className="font-sans text-xs font-bold tracking-widest text-text-theme uppercase mb-3 border-b border-border-theme/40 pb-1">
                    Key Contributions &amp; Scope
                  </h4>
                  <ul className="space-y-2.5 text-xs font-medium text-text-variant leading-relaxed pl-1">
                    {item.achievements.map((achievement, idx) => (
                      <li key={idx} className="flex gap-2.5 items-start">
                        <span className="w-1.5 h-1.5 bg-secondary-theme rounded-full flex-shrink-0 mt-1.5" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Micro interactive hint */}
              {!isExpanded && (
                <button
                  onClick={() => toggleExpand(item.id)}
                  className="text-xs font-bold uppercase tracking-wider text-white hover:underline mt-2.5 inline-flex items-center gap-1 cursor-pointer bg-secondary-theme px-3 py-1.5 rounded-full shadow-sm hover:bg-[#ff8147] transition-all"
                >
                  View Key Contributions
                </button>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
