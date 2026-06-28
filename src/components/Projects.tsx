import { useState } from "react";
import { ExternalLink, Code, Check, Sparkles, AlertCircle, Cpu } from "lucide-react";
import { PortfolioData, Project } from "../types";

interface ProjectsProps {
  projectsData: PortfolioData["projects"];
}

export default function Projects({ projectsData }: ProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-24 md:py-32">
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-left text-text-theme mb-12">
        {projectsData.title}
      </h2>

      {/* Modern Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-[340px]">
        {projectsData.items.map((project, idx) => {
          const isLarge = idx === 0;
          return (
            <div 
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className={`${
                isLarge ? "lg:col-span-2 lg:row-span-2" : ""
              } group relative overflow-hidden rounded-2xl border border-border-theme bg-surface-theme flex flex-col justify-end p-6 md:p-8 hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 cursor-pointer select-none shadow-md`}
            >
              {/* Linear gradient filter */}
              <div className="absolute inset-0 bg-gradient-to-t from-bg-theme via-bg-theme/40 to-transparent z-10 transition-colors duration-300" />
              
              <img 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 brightness-95 dark:brightness-90" 
                src={project.imageUrl || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"} 
                alt={`${project.title} Preview`}
                referrerPolicy="no-referrer"
              />

              <div className="relative z-20 text-left">
                <span className="bg-secondary-theme text-white px-3 py-1 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider mb-4 inline-block">
                  {project.year}
                </span>
                <h3 className={`${isLarge ? "text-2xl md:text-3xl" : "text-xl"} font-bold tracking-tight text-text-theme mb-2`}>
                  {project.title}
                </h3>
                <p className="font-sans text-sm md:text-base font-medium text-text-variant max-w-md mb-6 leading-snug">
                  {project.subtitle}
                </p>
                <div className="flex gap-3">
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-border-theme bg-surface-theme text-text-theme hover:bg-secondary-theme hover:text-white transition-all duration-200">
                    <ExternalLink className="w-4.5 h-4.5" />
                  </span>
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-border-theme bg-surface-theme text-text-theme hover:bg-secondary-theme hover:text-white transition-all duration-200">
                    <Code className="w-4.5 h-4.5" />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-bg-theme border border-border-theme p-6 md:p-8 shadow-2xl rounded-2xl flex flex-col gap-6 text-left">
            
            {/* Modal Image Header */}
            <div className="relative h-48 md:h-72 w-full rounded-xl overflow-hidden border border-border-theme">
              <img 
                src={selectedProject.imageUrl || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"} 
                alt={selectedProject.title} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <span className="bg-secondary-theme text-white px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider mb-1.5 inline-block">
                    {selectedProject.year} Project
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                    {selectedProject.title}
                  </h3>
                </div>
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="bg-secondary-theme hover:bg-opacity-90 text-white border border-transparent rounded-full p-2.5 transition-all duration-200 cursor-pointer shadow-md"
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content Layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Left Details */}
              <div className="md:col-span-7 space-y-4">
                <div>
                  <h4 className="font-sans text-xs font-bold tracking-widest text-text-theme uppercase mb-1.5 flex items-center gap-1.5">
                    <Cpu className="w-4 h-4 text-text-theme" />
                    System Architecture
                  </h4>
                  <p className="text-sm text-text-variant font-medium leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                <div>
                  <h4 className="font-sans text-xs font-bold tracking-widest text-text-theme uppercase mb-2 flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-text-theme" />
                    Engineering Challenges
                  </h4>
                  <p className="text-sm text-text-variant leading-relaxed font-medium bg-surface-container-theme/40 p-4 rounded-xl border border-border-theme">
                    {selectedProject.challenges}
                  </p>
                </div>
              </div>

              {/* Right Highlights & Tech */}
              <div className="md:col-span-5 space-y-4">
                <div>
                  <h4 className="font-sans text-xs font-bold tracking-widest text-text-theme uppercase mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-text-theme" />
                    Key Milestones
                  </h4>
                  <ul className="space-y-2.5">
                    {selectedProject.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex gap-2 items-start text-xs font-medium text-text-variant">
                        <Check className="w-4.5 h-4.5 text-white flex-shrink-0 mt-0.5 bg-secondary-theme rounded-full p-1" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-sans text-xs font-bold tracking-widest text-text-theme uppercase mb-2">
                    Technologies Implemented
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.tech.map((t) => (
                      <span key={t} className="bg-surface-container-theme text-text-theme px-2.5 py-1 rounded-md font-mono text-[10px] font-bold border border-border-theme uppercase">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions Footer */}
            <div className="flex flex-wrap justify-between items-center gap-4 pt-4 border-t border-border-theme/40">
              <div className="flex flex-wrap gap-3">
                <a 
                  href={selectedProject.liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => {
                    try {
                      const visitsStr = localStorage.getItem("project_visits") || "{}";
                      const visits = JSON.parse(visitsStr);
                      visits[selectedProject.id] = (visits[selectedProject.id] || 0) + 1;
                      localStorage.setItem("project_visits", JSON.stringify(visits));
                    } catch (e) {
                      console.error(e);
                    }
                  }}
                  className="bg-primary-theme text-on-primary-theme px-5 py-2.5 border border-transparent rounded-full shadow-sm hover:-translate-y-0.5 transition-all duration-200 text-xs font-semibold tracking-wide flex items-center gap-1.5 hover:bg-secondary-theme hover:text-white"
                >
                  <ExternalLink className="w-4 h-4" />
                  Launch Application
                </a>
                <a 
                  href={selectedProject.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => {
                    try {
                      const repoStr = localStorage.getItem("repo_visits") || "{}";
                      const repos = JSON.parse(repoStr);
                      repos[selectedProject.id] = (repos[selectedProject.id] || 0) + 1;
                      localStorage.setItem("repo_visits", JSON.stringify(repos));
                    } catch (e) {
                      console.error(e);
                    }
                  }}
                  className="bg-secondary-theme text-white px-5 py-2.5 rounded-full shadow-sm hover:-translate-y-0.5 transition-all duration-200 text-xs font-semibold tracking-wide flex items-center gap-1.5 hover:bg-[#ff8147]"
                >
                  <Code className="w-4 h-4" />
                  Inspect Codebase
                </a>
              </div>
              <button 
                onClick={() => setSelectedProject(null)}
                className="px-5 py-2.5 text-xs font-semibold tracking-wide border border-border-theme rounded-full bg-surface-theme hover:bg-surface-container-theme transition-colors duration-200 cursor-pointer"
              >
                Close View
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
