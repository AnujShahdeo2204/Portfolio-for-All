import { X, Printer, Download } from "lucide-react";
import { toPng } from "html-to-image";
import { ResumeData } from "../types";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  resumeData: ResumeData;
}

export default function ResumeModal({ isOpen, onClose, resumeData }: ResumeModalProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const node = document.getElementById("resume-content-sheet");
    if (!node) return;

    toPng(node, {
      backgroundColor: document.documentElement.classList.contains("dark") ? "#161316" : "#FFFFFF",
      style: {
        borderRadius: "0px",
      }
    })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `${resumeData.name.replace(/\s+/g, "_")}_Resume.png`;
        link.href = dataUrl;
        link.click();

        // Track resume download click
        try {
          const countsStr = localStorage.getItem("resume_downloads") || "0";
          const counts = parseInt(countsStr, 10) + 1;
          localStorage.setItem("resume_downloads", counts.toString());
        } catch (e) {
          console.error(e);
        }
      })
      .catch((error) => {
        console.error("Oops, something went wrong!", error);
      });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-bg-theme border border-border-theme p-6 md:p-10 shadow-2xl rounded-2xl flex flex-col gap-6"
        id="resume-modal-container"
      >
        {/* Header Options */}
        <div className="flex justify-between items-center pb-4 border-b border-border-theme/40">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-text-theme">Curriculum Vitae</h2>
          <div className="flex items-center gap-2">
            <button 
              onClick={handlePrint}
              className="p-2.5 border border-border-theme bg-surface-theme hover:bg-secondary-theme hover:text-white rounded-full transition-all duration-200 cursor-pointer shadow-sm"
              title="Print Resume"
            >
              <Printer className="w-4.5 h-4.5" />
            </button>
             <button 
              onClick={handleDownload}
              className="p-2.5 border border-border-theme bg-surface-theme hover:bg-secondary-theme hover:text-white rounded-full transition-all duration-200 cursor-pointer shadow-sm"
              title="Download Resume (PNG)"
            >
              <Download className="w-4.5 h-4.5" />
            </button>
            <button 
              onClick={onClose}
              className="p-2.5 border border-border-theme bg-surface-theme hover:bg-secondary-theme hover:text-white rounded-full transition-all duration-200 cursor-pointer shadow-sm"
              title="Close Modal"
            >
              <X className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>

        {/* Resume Content */}
        <div id="resume-content-sheet" className="text-left bg-surface-theme p-6 md:p-8 rounded-xl border border-border-theme text-text-theme printable-resume space-y-8 select-text shadow-md">
          {/* Main Info */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-text-theme">{resumeData.name}</h1>
              <p className="font-sans text-xs font-bold tracking-widest text-secondary-theme uppercase mt-1.5">{resumeData.title}</p>
            </div>
            <div className="text-xs space-y-1 text-text-variant font-mono font-bold uppercase">
              <p>Email: {resumeData.email}</p>
              <p>Phone: {resumeData.phone}</p>
              <p>Location: {resumeData.location}</p>
            </div>
          </div>

          {/* Section: Profile */}
          <div>
            <h3 className="text-lg font-bold uppercase tracking-wider border-b border-border-theme/40 pb-1 mb-3 text-text-theme">Profile</h3>
            <p className="text-text-variant leading-relaxed text-sm font-medium">
              {resumeData.profile}
            </p>
          </div>

          {/* Section: Experience */}
          <div>
            <h3 className="text-lg font-bold uppercase tracking-wider border-b border-border-theme/40 pb-1 mb-4 text-text-theme">Work Experience</h3>
            <div className="space-y-6">
              {resumeData.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline flex-wrap gap-2">
                    <h4 className="font-bold uppercase tracking-tight text-text-theme text-base">{exp.title}</h4>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-text-theme/80 bg-surface-container-theme px-2.5 py-0.5 rounded-md">{exp.period}</span>
                  </div>
                  <p className="text-sm font-bold text-secondary-theme mt-1.5 uppercase tracking-wide">{exp.company}</p>
                  <ul className="list-disc pl-5 mt-3 space-y-1.5 text-xs font-medium text-text-variant leading-relaxed">
                    {exp.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Education */}
          <div>
            <h3 className="text-lg font-bold uppercase tracking-wider border-b border-border-theme/40 pb-1 mb-3 text-text-theme">Education</h3>
            <div className="space-y-4">
              {resumeData.education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline flex-wrap gap-2">
                    <h4 className="font-bold uppercase tracking-tight text-text-theme text-sm">{edu.degree}</h4>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-text-theme/80 bg-surface-container-theme px-2.5 py-0.5 rounded-md">{edu.period}</span>
                  </div>
                  <p className="text-xs font-bold text-secondary-theme mt-1 uppercase tracking-wide">{edu.school}</p>
                  <p className="text-xs font-medium text-text-variant mt-2 leading-relaxed">
                    {edu.details}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Technical Skills */}
          <div>
            <h3 className="text-lg font-bold uppercase tracking-wider border-b border-border-theme/40 pb-1 mb-3 text-text-theme">Technical Skills</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-medium">
              <div>
                <h5 className="font-bold uppercase tracking-wider text-text-theme mb-1">Frontend</h5>
                <p className="text-text-variant leading-relaxed">{resumeData.skills.frontend}</p>
              </div>
              <div>
                <h5 className="font-bold uppercase tracking-wider text-text-theme mb-1">Backend</h5>
                <p className="text-text-variant leading-relaxed">{resumeData.skills.backend}</p>
              </div>
              <div>
                <h5 className="font-bold uppercase tracking-wider text-text-theme mb-1">Tools</h5>
                <p className="text-text-variant leading-relaxed">{resumeData.skills.tools}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end gap-3 mt-4">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 bg-primary-theme text-on-primary-theme border border-transparent rounded-full shadow-sm hover:bg-secondary-theme hover:text-white hover:-translate-y-0.5 transition-all text-xs font-semibold tracking-wide cursor-pointer"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
}
