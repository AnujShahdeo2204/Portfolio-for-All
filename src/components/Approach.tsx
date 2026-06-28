import { useState } from "react";
import { PortfolioData, SkillDetail } from "../types";

interface ApproachProps {
  aboutData: PortfolioData["about"];
}

export default function Approach({ aboutData }: ApproachProps) {
  const [selectedSkill, setSelectedSkill] = useState<SkillDetail | null>(null);

  const renderSkillChip = (skill: SkillDetail) => {
    const isHovered = selectedSkill?.name === skill.name;

    return (
      <button
        key={skill.name}
        onMouseEnter={() => setSelectedSkill(skill)}
        onMouseLeave={() => setSelectedSkill(null)}
        onClick={() => setSelectedSkill(selectedSkill?.name === skill.name ? null : skill)}
        className={`px-4 py-2 rounded-full font-sans text-xs font-semibold tracking-wide cursor-pointer transition-all duration-200 border ${
          isHovered
            ? "bg-secondary-theme text-white border-transparent -translate-y-0.5 shadow-sm"
            : "bg-surface-theme text-text-theme border-border-theme hover:bg-surface-container-theme"
        }`}
      >
        {skill.name}
      </button>
    );
  };

  const frontendSkills = aboutData.skills.filter(s => s.category === "frontend");
  const backendSkills = aboutData.skills.filter(s => s.category === "backend");
  const toolsSkills = aboutData.skills.filter(s => s.category === "tools");

  return (
    <section id="about" className="py-24 md:py-32 border-t border-border-theme/40">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
        {/* Left Column: The Approach */}
        <div className="md:col-span-5 text-left">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text-theme mb-6">
            {aboutData.title}
          </h2>
          <p className="font-sans text-base leading-relaxed text-text-variant mb-6">
            {aboutData.paragraph1}
          </p>
          <p className="font-sans text-base leading-relaxed text-text-variant/90 border-l-2 border-secondary-theme pl-4">
            {aboutData.paragraph2}
          </p>
        </div>

        {/* Right Column: Technical Arsenal Card */}
        <div className="md:col-span-6 md:col-start-7">
          <div className="glass-panel p-6 md:p-8 flex flex-col gap-6 text-left relative overflow-hidden">
            <h3 className="font-sans text-xs font-bold tracking-widest text-text-theme uppercase pb-2 border-b border-border-theme/40">
              Technical Arsenal
            </h3>

            {/* Frontend Skills */}
            {frontendSkills.length > 0 && (
              <div>
                <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-text-theme/70 mb-3">
                  Frontend Architecture
                </h4>
                <div className="flex flex-wrap gap-2">
                  {frontendSkills.map(renderSkillChip)}
                </div>
              </div>
            )}

            {/* Backend Skills */}
            {backendSkills.length > 0 && (
              <div>
                <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-text-theme/70 mb-3">
                  Backend &amp; Systems
                </h4>
                <div className="flex flex-wrap gap-2">
                  {backendSkills.map(renderSkillChip)}
                </div>
              </div>
            )}

            {/* Tools Skills */}
            {toolsSkills.length > 0 && (
              <div>
                <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-text-theme/70 mb-3">
                  Tools &amp; Technologies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {toolsSkills.map(renderSkillChip)}
                </div>
              </div>
            )}

            {/* Interactive Dynamic Description Box */}
            <div className="mt-4 pt-4 border-t border-border-theme/40 min-h-[130px] flex flex-col justify-center">
              {selectedSkill ? (
                <div className="animate-[fadeInUp_0.3s_ease_forwards]">
                  <div className="flex justify-between items-center mb-2.5">
                    <span className="font-bold text-sm text-text-theme uppercase tracking-wide flex items-center gap-2">
                      {selectedSkill.name}
                      <span className="text-[9px] font-sans text-white bg-secondary-theme px-2 py-0.5 rounded-full font-bold uppercase">
                        {selectedSkill.badge}
                      </span>
                    </span>
                    <span className="text-xs font-mono font-bold text-text-theme uppercase">
                      {selectedSkill.proficiency}% Mastered
                    </span>
                  </div>
                  {/* Modern rounded progress bar */}
                  <div className="w-full h-2 bg-surface-container-theme rounded-full overflow-hidden mb-3">
                    <div 
                      className="h-full bg-secondary-theme rounded-full transition-all duration-500 ease-out" 
                      style={{ width: `${selectedSkill.proficiency}%` }} 
                    />
                  </div>
                  <p className="text-xs text-text-variant font-medium leading-relaxed">
                    {selectedSkill.description}
                  </p>
                </div>
              ) : (
                <div className="text-center py-4 text-xs text-text-variant/60 font-mono italic">
                  [ Hover or tap any skill tag to view detailed telemetry metrics ]
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
