import { FileText, Download, Briefcase, GraduationCap } from "lucide-react";
import { ResumeData } from "../types";

interface ResumePreviewProps {
  resumeData: ResumeData;
}

export default function ResumePreview({ resumeData }: ResumePreviewProps) {
  const handleDownload = () => {
    const expText = resumeData.experience
      .map(
        (exp) =>
          `${exp.title.toUpperCase()}\n${exp.company} (${exp.period})\n` +
          exp.bullets.map((b) => `• ${b}`).join("\n")
      )
      .join("\n\n");

    const eduText = resumeData.education
      .map(
        (edu) =>
          `${edu.degree.toUpperCase()}\n${edu.school} (${edu.period})\n• ${edu.details}`
      )
      .join("\n\n");

    const resumeText = `
============================================================
${resumeData.name.toUpperCase()} - RESUME
${resumeData.title.toUpperCase()}
============================================================
Portfolio: ${window.location.origin}
Email: ${resumeData.email}
Phone: ${resumeData.phone}
Location: ${resumeData.location}

PROFILE
------------------------------------------------------------
${resumeData.profile}

WORK EXPERIENCE
------------------------------------------------------------
${expText}

EDUCATION
------------------------------------------------------------
${eduText}

TECHNICAL SKILLS
------------------------------------------------------------
Frontend: ${resumeData.skills.frontend}
Backend & Systems: ${resumeData.skills.backend}
Tools & Technologies: ${resumeData.skills.tools}

============================================================
Generated from Creative Portfolio Template on ${new Date().toLocaleDateString()}
`;

    const blob = new Blob([resumeText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${resumeData.name.replace(/\s+/g, "_")}_Resume.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    // Track resume download click
    try {
      const countsStr = localStorage.getItem("resume_downloads") || "0";
      const counts = parseInt(countsStr, 10) + 1;
      localStorage.setItem("resume_downloads", counts.toString());
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section id="resume-preview" className="py-24 md:py-32 border-t border-border-theme/40 text-left">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text-theme mb-2">
            Curriculum Vitae
          </h2>
          <p className="text-sm text-text-variant font-medium">
            Professional background and technical credentials.
          </p>
        </div>
        <button
          onClick={handleDownload}
          className="brutalist-button px-6 py-3 flex items-center gap-2 text-sm rounded-full cursor-pointer shadow-sm hover:scale-102"
        >
          <Download className="w-4 h-4" />
          Download Resume (TXT)
        </button>
      </div>

      <div className="glass-panel p-6 md:p-10 bg-surface-theme/50 relative overflow-hidden flex flex-col gap-10">
        {/* Profile / Intro Header */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 border-b border-border-theme/40 pb-8">
          <div className="space-y-1.5">
            <h3 className="text-2xl font-bold text-text-theme tracking-tight">{resumeData.name}</h3>
            <p className="text-xs font-semibold uppercase tracking-wider text-secondary-theme">{resumeData.title}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-2 gap-x-6 text-xs font-mono font-bold uppercase text-text-variant">
            <div><span className="text-text-theme/50">Email:</span> {resumeData.email}</div>
            <div><span className="text-text-theme/50">Phone:</span> {resumeData.phone}</div>
            <div><span className="text-text-theme/50">Location:</span> {resumeData.location}</div>
          </div>
        </div>

        {/* Brief Profile Summary */}
        <div className="space-y-3">
          <h4 className="font-sans text-xs font-bold tracking-widest text-text-theme uppercase flex items-center gap-2">
            <FileText className="w-4 h-4 text-secondary-theme" />
            Executive Summary
          </h4>
          <p className="text-sm text-text-variant font-medium leading-relaxed max-w-4xl">
            {resumeData.profile}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Experience Column */}
          <div className="lg:col-span-8 space-y-6">
            <h4 className="font-sans text-xs font-bold tracking-widest text-text-theme uppercase flex items-center gap-2 pb-2 border-b border-border-theme/40">
              <Briefcase className="w-4 h-4 text-secondary-theme" />
              Work Experience
            </h4>
            <div className="space-y-8">
              {resumeData.experience.map((exp) => (
                <div key={exp.id} className="group relative">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-2 mb-2">
                    <h5 className="font-bold text-text-theme text-base leading-tight">
                      {exp.title}
                    </h5>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-text-theme/80 bg-surface-container-theme px-2 py-0.5 rounded-md flex-shrink-0 self-start sm:self-auto">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-secondary-theme uppercase tracking-wider mb-3">
                    {exp.company}
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-xs font-medium text-text-variant leading-relaxed">
                    {exp.bullets.map((bullet, i) => (
                      <li key={i}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Side Column: Education & Skills */}
          <div className="lg:col-span-4 space-y-8">
            {/* Education */}
            <div className="space-y-4">
              <h4 className="font-sans text-xs font-bold tracking-widest text-text-theme uppercase flex items-center gap-2 pb-2 border-b border-border-theme/40">
                <GraduationCap className="w-4 h-4 text-secondary-theme" />
                Education
              </h4>
              <div className="space-y-6">
                {resumeData.education.map((edu) => (
                  <div key={edu.id} className="space-y-1">
                    <h5 className="font-bold text-text-theme text-sm leading-tight">{edu.degree}</h5>
                    <p className="text-xs font-bold text-secondary-theme uppercase tracking-wider">{edu.school}</p>
                    <span className="text-[9px] font-mono font-semibold text-text-variant block pt-0.5">{edu.period}</span>
                    <p className="text-xs text-text-variant leading-relaxed pt-1.5 font-medium">{edu.details}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Tech Stack */}
            <div className="space-y-4">
              <h4 className="font-sans text-xs font-bold tracking-widest text-text-theme uppercase flex items-center gap-2 pb-2 border-b border-border-theme/40">
                Technical Frameworks
              </h4>
              <div className="space-y-3 text-xs font-medium text-text-variant leading-normal">
                <div>
                  <h6 className="font-bold text-text-theme mb-1">Frontend Engineering</h6>
                  <p>{resumeData.skills.frontend}</p>
                </div>
                <div>
                  <h6 className="font-bold text-text-theme mb-1">Backend & Systems</h6>
                  <p>{resumeData.skills.backend}</p>
                </div>
                <div>
                  <h6 className="font-bold text-text-theme mb-1">Tools & Deployments</h6>
                  <p>{resumeData.skills.tools}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
