import React, { useState } from "react";
import {
  X,
  Save,
  RotateCcw,
  Plus,
  Trash2,
  Edit2,
  User,
  Briefcase,
  AppWindow,
  HelpCircle,
  Cpu,
  Sliders,
  Sparkles,
  Layout,
  Download,
  Upload,
  Check,
  AlertTriangle,
  FileText,
  Lock,
  Unlock,
  ShieldAlert,
  BarChart3,
  MousePointerClick,
  Info,
  Camera
} from "lucide-react";
import { PortfolioData, Project, TimelineItem, SkillDetail, ResumeExperience, ResumeEducation } from "../types";

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
  data: PortfolioData;
  onSave: (newData: PortfolioData) => void;
  onReset: () => void;
}

type TabType = "hero" | "about" | "projects" | "timeline" | "resume" | "photography" | "system" | "stats";

export default function AdminPortal({ isOpen, onClose, data, onSave, onReset }: AdminPortalProps) {
  const [activeTab, setActiveTab] = useState<TabType>("hero");
  const [localData, setLocalData] = useState<PortfolioData>(JSON.parse(JSON.stringify(data)));
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem("admin_authenticated") === "true";
  });
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);

  // States for handling item selection & creation
  const [selectedProjectId, setSelectedProjectId] = useState<string>(localData.projects.items[0]?.id || "");
  const [selectedTimelineId, setSelectedTimelineId] = useState<string>(localData.timeline.items[0]?.id || "");
  const [selectedSkillName, setSelectedSkillName] = useState<string>(localData.about.skills[0]?.name || "");

  // Resume specific sub-item selections
  const [selectedResumeExpId, setSelectedResumeExpId] = useState<string>(localData.resume?.experience?.[0]?.id || "");
  const [selectedResumeEduId, setSelectedResumeEduId] = useState<string>(localData.resume?.education?.[0]?.id || "");
  const [selectedPhotoId, setSelectedPhotoId] = useState<string>(localData.photography?.photos?.[0]?.id || "");

  if (!isOpen) return null;

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const hashString = async (str: string) => {
    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(str));
    return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const userHash = await hashString(usernameInput.trim());
      const passHash = await hashString(passwordInput);

      if (
        userHash === "07b36ee8e6a81d895327eeda6cfdcc5416a0ccd38ee94e2080076827ecb85bf4" && 
        passHash === "4716616fbf7a3f1e8f24beeebc3070d33db57bb9eb59b663ee56d58a224e035e"
      ) {
        setIsAuthenticated(true);
        sessionStorage.setItem("admin_authenticated", "true");
        setLoginError(null);
        triggerToast("Access Granted. Secure Session Established.");
      } else {
        setLoginError("Invalid Administrator Credentials. Access Denied.");
      }
    } catch (err) {
      setLoginError("Authentication error. Secure context required.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("admin_authenticated");
    setUsernameInput("");
    setPasswordInput("");
    triggerToast("Logged out of Admin Session.");
  };

  // Save changes
  const handleSave = () => {
    onSave(localData);
    triggerToast("All template changes successfully deployed & synced!");
  };

  // Reset to defaults
  const handleResetClick = () => {
    if (confirm("Are you sure you want to reset all portfolio details back to default template presets? This cannot be undone.")) {
      onReset();
      onClose();
    }
  };

  // JSON Template Export
  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(localData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `portfolio-template-${localData.hero.logoName.toLowerCase()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    triggerToast("Template JSON exported successfully!");
  };

  // JSON Template Import
  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (parsed.hero && parsed.about && parsed.projects && parsed.timeline) {
            setLocalData(parsed);
            if (parsed.projects.items.length > 0) setSelectedProjectId(parsed.projects.items[0].id);
            if (parsed.timeline.items.length > 0) setSelectedTimelineId(parsed.timeline.items[0].id);
            if (parsed.about.skills.length > 0) setSelectedSkillName(parsed.about.skills[0].name);
            triggerToast("Portfolio template JSON loaded successfully! Click Save to apply.");
          } else {
            alert("Error: The selected JSON file does not match the PortfolioData schema template.");
          }
        } catch (err) {
          alert("Error parsing file. Please ensure it is a valid JSON file.");
        }
      };
    }
  };

  // CRUD for Projects
  const currentProject = localData.projects.items.find(p => p.id === selectedProjectId);

  const handleProjectChange = (field: keyof Project, value: any) => {
    if (!currentProject) return;
    const updatedItems = localData.projects.items.map(p => {
      if (p.id === selectedProjectId) {
        return { ...p, [field]: value };
      }
      return p;
    });
    setLocalData({
      ...localData,
      projects: { ...localData.projects, items: updatedItems }
    });
  };

  const handleAddNewProject = () => {
    const newId = `project-${Date.now()}`;
    const newProject: Project = {
      id: newId,
      title: "NEW BRUTALIST PROJECT",
      subtitle: "A fresh development study template",
      description: "Provide a comprehensive description detailing your high-performance application.",
      year: new Date().getFullYear().toString(),
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBdMrB3y6CwgMnKuVTzhpm_IRTXu5Ek_eyZ5EU2Vm5UWz--DKE_x70O1S_AfTwsWLqq6dlmGHoEIWC3DQDNSfunthGcd9i3dWxldXV797O6dpnjJc14hecgfWNsIhrH3XQWM-ZbBCBsPgYAiyGHTQ06yMuTtIv2DCXzftxzZ0NjfONAAmbwnGIrYxgP4YOQ-cp2BbV3OAzAa_7RRVYkp3cK9u2pamJVPUkKdVMJ20AH27HwAvB4t1Zj",
      tech: ["React", "TypeScript", "Tailwind CSS"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      highlights: [
        "Dynamic high-contrast visual component rendering system.",
        "Engineered with modular React structure layout modules."
      ],
      challenges: "Overcoming custom design systems complexity on standard viewports. Resolved by integrating flexible, mobile-first design patterns."
    };

    setLocalData({
      ...localData,
      projects: {
        ...localData.projects,
        items: [...localData.projects.items, newProject]
      }
    });
    setSelectedProjectId(newId);
    triggerToast("Created new project template!");
  };

  const handleDeleteProject = (id: string) => {
    if (localData.projects.items.length <= 1) {
      alert("Error: Portfolio must have at least one project showcase.");
      return;
    }
    if (confirm("Are you sure you want to delete this project?")) {
      const filtered = localData.projects.items.filter(p => p.id !== id);
      setLocalData({
        ...localData,
        projects: { ...localData.projects, items: filtered }
      });
      setSelectedProjectId(filtered[0]?.id || "");
      triggerToast("Project deleted from local draft.");
    }
  };

  // CRUD for Timeline
  const currentTimeline = localData.timeline.items.find(t => t.id === selectedTimelineId);

  const handleTimelineChange = (field: keyof TimelineItem, value: any) => {
    if (!currentTimeline) return;
    const updatedItems = localData.timeline.items.map(t => {
      if (t.id === selectedTimelineId) {
        return { ...t, [field]: value };
      }
      return t;
    });
    setLocalData({
      ...localData,
      timeline: { ...localData.timeline, items: updatedItems }
    });
  };

  const handleAddNewTimeline = () => {
    const newId = `timeline-${Date.now()}`;
    const newTimelineItem: TimelineItem = {
      id: newId,
      period: "2024 - Present",
      title: "ROLE OR STUDY",
      subtitle: "Agency or University Name",
      description: "Brief summary description detailing the key responsibilities, learnings, or architectural focus.",
      achievements: [
        "Designed high-fidelity interactive templates using TypeScript modules.",
        "Improved workflow automation pipeline efficiency by 25%."
      ]
    };

    setLocalData({
      ...localData,
      timeline: {
        ...localData.timeline,
        items: [...localData.timeline.items, newTimelineItem]
      }
    });
    setSelectedTimelineId(newId);
    triggerToast("Created new timeline event!");
  };

  const handleDeleteTimeline = (id: string) => {
    if (localData.timeline.items.length <= 1) {
      alert("Error: Portfolio must keep at least one history item.");
      return;
    }
    if (confirm("Are you sure you want to delete this timeline event?")) {
      const filtered = localData.timeline.items.filter(t => t.id !== id);
      setLocalData({
        ...localData,
        timeline: { ...localData.timeline, items: filtered }
      });
      setSelectedTimelineId(filtered[0]?.id || "");
      triggerToast("Timeline event deleted from local draft.");
    }
  };

  // CRUD for Skills
  const currentSkill = localData.about.skills.find(s => s.name === selectedSkillName);

  const handleSkillChange = (field: keyof SkillDetail, value: any) => {
    if (!currentSkill) return;
    const updatedSkills = localData.about.skills.map(s => {
      if (s.name === selectedSkillName) {
        return { ...s, [field]: value };
      }
      return s;
    });
    setLocalData({
      ...localData,
      about: { ...localData.about, skills: updatedSkills }
    });
  };

  const handleAddNewSkill = () => {
    const defaultName = `Skill ${localData.about.skills.length + 1}`;
    const newSkill: SkillDetail = {
      name: defaultName,
      proficiency: 90,
      description: "Explain your experience level and how you apply this technology.",
      badge: "Expert",
      category: "frontend"
    };

    setLocalData({
      ...localData,
      about: {
        ...localData.about,
        skills: [...localData.about.skills, newSkill]
      }
    });
    setSelectedSkillName(defaultName);
    triggerToast("Created new skill!");
  };

  const handleDeleteSkill = (name: string) => {
    if (localData.about.skills.length <= 1) {
      alert("Error: Portfolio must show at least one professional skill.");
      return;
    }
    if (confirm(`Are you sure you want to remove '${name}' skill?`)) {
      const filtered = localData.about.skills.filter(s => s.name !== name);
      setLocalData({
        ...localData,
        about: { ...localData.about, skills: filtered }
      });
      setSelectedSkillName(filtered[0]?.name || "");
      triggerToast("Skill removed from local draft.");
    }
  };

  // Resume CRUD and Download Systems
  const currentResumeExp = localData.resume?.experience?.find(e => e.id === selectedResumeExpId) || localData.resume?.experience?.[0];
  const currentResumeEdu = localData.resume?.education?.find(e => e.id === selectedResumeEduId) || localData.resume?.education?.[0];

  const handleResumeExpChange = (field: keyof ResumeExperience, value: any) => {
    if (!currentResumeExp) return;
    const updated = (localData.resume?.experience || []).map(e => {
      if (e.id === currentResumeExp.id) {
        return { ...e, [field]: value };
      }
      return e;
    });
    setLocalData({
      ...localData,
      resume: { ...localData.resume, experience: updated }
    });
  };

  const handleAddNewResumeExp = () => {
    const newId = `exp-${Date.now()}`;
    const newItem: ResumeExperience = {
      id: newId,
      title: "Senior Frontend Engineer",
      company: "New Company Inc.",
      period: "2024 - Present",
      bullets: [
        "Led core interface development of modular browser-rendering components.",
        "Refactored styling themes into beautiful light/dark mode templates."
      ]
    };
    setLocalData({
      ...localData,
      resume: {
        ...localData.resume,
        experience: [...(localData.resume?.experience || []), newItem]
      }
    });
    setSelectedResumeExpId(newId);
    triggerToast("Added new resume work experience event!");
  };

  const handleDeleteResumeExp = (id: string) => {
    if ((localData.resume?.experience || []).length <= 1) {
      alert("Error: Resume must have at least one work experience.");
      return;
    }
    if (confirm("Are you sure you want to delete this resume experience?")) {
      const filtered = localData.resume.experience.filter(e => e.id !== id);
      setLocalData({
        ...localData,
        resume: { ...localData.resume, experience: filtered }
      });
      setSelectedResumeExpId(filtered[0]?.id || "");
      triggerToast("Deleted work experience from resume draft.");
    }
  };

  const handleResumeEduChange = (field: keyof ResumeEducation, value: any) => {
    if (!currentResumeEdu) return;
    const updated = (localData.resume?.education || []).map(e => {
      if (e.id === currentResumeEdu.id) {
        return { ...e, [field]: value };
      }
      return e;
    });
    setLocalData({
      ...localData,
      resume: { ...localData.resume, education: updated }
    });
  };

  const handleAddNewResumeEdu = () => {
    const newId = `edu-${Date.now()}`;
    const newItem: ResumeEducation = {
      id: newId,
      degree: "BSc in Computer Science",
      school: "University of Technology",
      period: "2015 - 2019",
      details: "Specialized in advanced architectures and web frameworks."
    };
    setLocalData({
      ...localData,
      resume: {
        ...localData.resume,
        education: [...(localData.resume?.education || []), newItem]
      }
    });
    setSelectedResumeEduId(newId);
    triggerToast("Added new resume education event!");
  };

  const handleDeleteResumeEdu = (id: string) => {
    if ((localData.resume?.education || []).length <= 1) {
      alert("Error: Resume must have at least one education item.");
      return;
    }
    if (confirm("Are you sure you want to delete this resume education?")) {
      const filtered = localData.resume.education.filter(e => e.id !== id);
      setLocalData({
        ...localData,
        resume: { ...localData.resume, education: filtered }
      });
      setSelectedResumeEduId(filtered[0]?.id || "");
      triggerToast("Deleted education item from resume draft.");
    }
  };

  const handleDownloadFromAdmin = () => {
    if (!localData.resume) return;
    const expText = localData.resume.experience
      .map(
        (exp) =>
          `${exp.title.toUpperCase()}\n${exp.company} (${exp.period})\n` +
          exp.bullets.map((b) => `• ${b}`).join("\n")
      )
      .join("\n\n");

    const eduText = localData.resume.education
      .map(
        (edu) =>
          `${edu.degree.toUpperCase()}\n${edu.school} (${edu.period})\n• ${edu.details}`
      )
      .join("\n\n");

    const resumeText = `
============================================================
${localData.resume.name.toUpperCase()} - RESUME
${localData.resume.title.toUpperCase()}
============================================================
Portfolio: ${window.location.origin}
Email: ${localData.resume.email}
Phone: ${localData.resume.phone}
Location: ${localData.resume.location}

PROFILE
------------------------------------------------------------
${localData.resume.profile}

WORK EXPERIENCE
------------------------------------------------------------
${expText}

EDUCATION
------------------------------------------------------------
${eduText}

TECHNICAL SKILLS
------------------------------------------------------------
Frontend: ${localData.resume.skills.frontend}
Backend & Systems: ${localData.resume.skills.backend}
Tools & Technologies: ${localData.resume.skills.tools}

============================================================
Generated from Creative Portfolio Template on ${new Date().toLocaleDateString()}
`;

    const blob = new Blob([resumeText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${localData.resume.name.replace(/\s+/g, "_")}_Resume.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    triggerToast("Formatted resume downloaded successfully!");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-6 bg-black/75 backdrop-blur-sm animate-fade-in text-left select-text overflow-hidden">
      <div className="admin-portal-modern w-full h-full md:max-w-6xl md:h-[90vh] bg-bg-theme border border-border-theme flex flex-col shadow-2xl relative rounded-2xl overflow-hidden">

        {/* Banner Headers */}
        <div className="bg-secondary-theme text-white border-b border-border-theme/40 p-4 flex justify-between items-center select-none flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Sliders className="w-6 h-6 stroke-[2]" />
            <span className="font-sans text-lg font-bold tracking-tight">
              Template Admin Portal
            </span>
            <span className="bg-white/20 text-white px-2.5 py-0.5 text-[9px] font-semibold tracking-widest  rounded-full">
              SANDBOX DEV MODE
            </span>
          </div>
          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <>
                <button
                  onClick={handleLogout}
                  className="px-3.5 py-1.5 bg-white/10 hover:bg-white/20 text-white font-sans text-xs font-semibold rounded-full flex items-center gap-1.5 transition-all cursor-pointer"
                  title="Logout from admin session"
                >
                  <Lock className="w-3.5 h-3.5" />
                  Logout
                </button>
                <button
                  onClick={handleResetClick}
                  className="px-3.5 py-1.5 bg-red-600/90 hover:bg-red-700 text-white font-sans text-xs font-semibold rounded-full flex items-center gap-1.5 transition-all cursor-pointer"
                  title="Reset everything to hardcoded defaults"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset Template
                </button>
              </>
            )}
            <button
              onClick={onClose}
              className="p-1.5 border border-white/20 bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer rounded-full"
              aria-label="Close portal"
            >
              <X className="w-5 h-5 stroke-[2]" />
            </button>
          </div>
        </div>

        {/* Portal Workspace (Sidebar Nav + Main Editor Forms) */}
        {!isAuthenticated ? (
          <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 bg-surface-theme overflow-y-auto">
            <form onSubmit={handleLogin} className="w-full max-w-md border border-border-theme/40 bg-bg-theme p-6 md:p-8 shadow-lg  rounded-xl space-y-6">
              <div className="text-center space-y-2">
                <div className="inline-flex p-3 bg-red-100 dark:bg-red-950/40 border border-red-500/30 rounded-xl text-red-600 dark:text-red-400 rounded-xl mb-2">
                  <ShieldAlert className="w-8 h-8 stroke-[2.5]" />
                </div>
                <h3 className="text-2xl font-bold  tracking-tight text-text-theme">RESTRICTED ADMIN AREA</h3>
                <p className="font-sans text-[10px] font-bold  text-text-variant tracking-wider">
                  Administrator authentication required to configure portfolio templates
                </p>
              </div>

              {loginError && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-600 rounded-xl dark:text-red-400 text-xs font-sans font-bold flex items-center gap-2 animate-pulse">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block font-sans text-[10px] font-bold  tracking-wider text-text-theme">
                    Username
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-text-variant">
                      <User className="w-4 h-4" />
                    </span>
                    <input
                      type="text"
                      required
                      value={usernameInput}
                      onChange={(e) => setUsernameInput(e.target.value)}
                      placeholder="Enter administrator username"
                      className="w-full pl-9 pr-3 py-2.5 border border-border-theme/40 bg-surface-theme font-sans text-xs text-text-theme rounded-xl focus:outline-none focus:ring-0 focus:border-primary-theme"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block font-sans text-[10px] font-bold  tracking-wider text-text-theme">
                    Security Password
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-text-variant">
                      <Lock className="w-4 h-4" />
                    </span>
                    <input
                      type="password"
                      required
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-3 py-2.5 border border-border-theme/40 bg-surface-theme font-sans text-xs text-text-theme rounded-xl focus:outline-none focus:ring-0 focus:border-primary-theme"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-primary-theme hover:bg-opacity-95 text-on-primary-theme font-sans text-xs font-bold tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer rounded-full"
              >
                <Unlock className="w-4 h-4" />
                Authorize Session
              </button>

            </form>
          </div>
        ) : (
          <>
            <div className="flex-1 flex overflow-hidden flex-col md:flex-row">

              {/* Admin Navigation Left Bar */}
              <div className="admin-sidebar w-full md:w-56 bg-surface-theme border-b md:border-b-0 md:border-r border-border-theme/40 flex flex-row md:flex-col overflow-x-auto md:overflow-x-visible select-none flex-shrink-0 p-3 gap-1.5">
                <button
                  onClick={() => setActiveTab("hero")}
                  className={`flex-1 md:flex-none p-3 font-sans text-xs font-semibold  tracking-wider text-left rounded-xl flex items-center gap-2.5 transition-all duration-200 cursor-pointer ${activeTab === "hero" ? "bg-secondary-theme text-white border-transparent shadow-sm" : "hover:bg-surface-container-theme text-text-theme border-transparent"
                    }`}
                >
                  <Layout className="w-4 h-4 flex-shrink-0" />
                  Hero Section
                </button>
                <button
                  onClick={() => setActiveTab("about")}
                  className={`flex-1 md:flex-none p-3 font-sans text-xs font-semibold  tracking-wider text-left rounded-xl flex items-center gap-2.5 transition-all duration-200 cursor-pointer ${activeTab === "about" ? "bg-secondary-theme text-white border-transparent shadow-sm" : "hover:bg-surface-container-theme text-text-theme border-transparent"
                    }`}
                >
                  <User className="w-4 h-4 flex-shrink-0" />
                  About &amp; Skills
                </button>
                <button
                  onClick={() => setActiveTab("projects")}
                  className={`flex-1 md:flex-none p-3 font-sans text-xs font-semibold  tracking-wider text-left rounded-xl flex items-center gap-2.5 transition-all duration-200 cursor-pointer ${activeTab === "projects" ? "bg-secondary-theme text-white border-transparent shadow-sm" : "hover:bg-surface-container-theme text-text-theme border-transparent"
                    }`}
                >
                  <AppWindow className="w-4 h-4 flex-shrink-0" />
                  Selected Works
                </button>
                <button
                  onClick={() => setActiveTab("timeline")}
                  className={`flex-1 md:flex-none p-3 font-sans text-xs font-semibold  tracking-wider text-left rounded-xl flex items-center gap-2.5 transition-all duration-200 cursor-pointer ${activeTab === "timeline" ? "bg-secondary-theme text-white border-transparent shadow-sm" : "hover:bg-surface-container-theme text-text-theme border-transparent"
                    }`}
                >
                  <Briefcase className="w-4 h-4 flex-shrink-0" />
                  Experience Log
                </button>
                <button
                  onClick={() => setActiveTab("resume")}
                  className={`flex-1 md:flex-none p-3 font-sans text-xs font-semibold  tracking-wider text-left rounded-xl flex items-center gap-2.5 transition-all duration-200 cursor-pointer ${activeTab === "resume" ? "bg-secondary-theme text-white border-transparent shadow-sm" : "hover:bg-surface-container-theme text-text-theme border-transparent"
                    }`}
                >
                  <FileText className="w-4 h-4 flex-shrink-0" />
                  Resume Builder
                </button>
                <button
                  onClick={() => setActiveTab("photography")}
                  className={`flex-1 md:flex-none p-3 font-sans text-xs font-semibold  tracking-wider text-left rounded-xl flex items-center gap-2.5 transition-all duration-200 cursor-pointer ${activeTab === "photography" ? "bg-secondary-theme text-white border-transparent shadow-sm" : "hover:bg-surface-container-theme text-text-theme border-transparent"
                    }`}
                >
                  <Camera className="w-4 h-4 flex-shrink-0" />
                  Photography
                </button>
                <button
                  onClick={() => setActiveTab("system")}
                  className={`flex-1 md:flex-none p-3 font-sans text-xs font-semibold  tracking-wider text-left rounded-xl flex items-center gap-2.5 transition-all duration-200 cursor-pointer ${activeTab === "system" ? "bg-secondary-theme text-white border-transparent shadow-sm" : "hover:bg-surface-container-theme text-text-theme border-transparent"
                    }`}
                >
                  <Cpu className="w-4 h-4 flex-shrink-0" />
                  Template IO
                </button>
                <button
                  onClick={() => setActiveTab("stats")}
                  className={`flex-1 md:flex-none p-3 font-sans text-xs font-semibold  tracking-wider text-left rounded-xl flex items-center gap-2.5 transition-all duration-200 cursor-pointer ${activeTab === "stats" ? "bg-secondary-theme text-white border-transparent shadow-sm" : "hover:bg-surface-container-theme text-text-theme border-transparent"
                    }`}
                >
                  <BarChart3 className="w-4 h-4 flex-shrink-0" />
                  Visitor Analytics
                </button>
              </div>

              {/* Admin Editor Panel Right Side */}
              <div className="flex-1 p-6 md:p-8 overflow-y-auto space-y-6">

                {/* HERO TAB */}
                {activeTab === "hero" && (
                  <div className="space-y-6 animate-[fadeInUp_0.2s_ease_forwards]">
                    <h3 className="text-xl font-bold  tracking-tight text-text-theme flex items-center gap-2 border-b-2 border-text-theme pb-1">
                      Edit Hero Section Presets
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="block font-sans text-xs font-bold  text-text-theme">Logo Signature Text</label>
                        <input
                          type="text"
                          value={localData.hero.logoName}
                          onChange={(e) => setLocalData({
                            ...localData,
                            hero: { ...localData.hero, logoName: e.target.value }
                          })}
                          className="w-full p-2.5 border border-border-theme/40 bg-surface-theme font-sans font-medium text-sm text-text-theme"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block font-sans text-xs font-bold  text-text-theme">Main Bold Headline</label>
                        <input
                          type="text"
                          value={localData.hero.headline}
                          onChange={(e) => setLocalData({
                            ...localData,
                            hero: { ...localData.hero, headline: e.target.value }
                          })}
                          className="w-full p-2.5 border border-border-theme/40 bg-surface-theme font-sans font-medium text-sm text-text-theme"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block font-sans text-xs font-bold  text-text-theme">Editorial Subtitle / Overview Description</label>
                      <textarea
                        value={localData.hero.description}
                        onChange={(e) => setLocalData({
                          ...localData,
                          hero: { ...localData.hero, description: e.target.value }
                        })}
                        className="w-full p-2.5 border border-border-theme/40 bg-surface-theme font-sans font-medium text-sm text-text-theme h-28 resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="block font-sans text-xs font-bold  text-text-theme">Primary Button Action Text</label>
                        <input
                          type="text"
                          value={localData.hero.buttonText1}
                          onChange={(e) => setLocalData({
                            ...localData,
                            hero: { ...localData.hero, buttonText1: e.target.value }
                          })}
                          className="w-full p-2.5 border border-border-theme/40 bg-surface-theme font-sans font-medium text-sm text-text-theme"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block font-sans text-xs font-bold  text-text-theme">Secondary Button Action Text</label>
                        <input
                          type="text"
                          value={localData.hero.buttonText2}
                          onChange={(e) => setLocalData({
                            ...localData,
                            hero: { ...localData.hero, buttonText2: e.target.value }
                          })}
                          className="w-full p-2.5 border border-border-theme/40 bg-surface-theme font-sans font-medium text-sm text-text-theme"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* ABOUT & SKILLS TAB */}
                {activeTab === "about" && (
                  <div className="space-y-6 animate-[fadeInUp_0.2s_ease_forwards]">
                    <h3 className="text-xl font-bold  tracking-tight text-text-theme flex items-center gap-2 border-b-2 border-text-theme pb-1">
                      Edit Approach Paragraphs &amp; Skills
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="block font-sans text-xs font-bold  text-text-theme">Section Heading Title</label>
                        <input
                          type="text"
                          value={localData.about.title}
                          onChange={(e) => setLocalData({
                            ...localData,
                            about: { ...localData.about, title: e.target.value }
                          })}
                          className="w-full p-2.5 border border-border-theme/40 bg-surface-theme font-sans font-medium text-sm text-text-theme"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="block font-sans text-xs font-bold  text-text-theme">Approach Paragraph 1 (Main Profile Text)</label>
                        <textarea
                          value={localData.about.paragraph1}
                          onChange={(e) => setLocalData({
                            ...localData,
                            about: { ...localData.about, paragraph1: e.target.value }
                          })}
                          className="w-full p-2.5 border border-border-theme/40 bg-surface-theme font-sans text-sm text-text-theme h-28"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block font-sans text-xs font-bold  text-text-theme">Approach Paragraph 2 (Quote / Philosophy)</label>
                        <textarea
                          value={localData.about.paragraph2}
                          onChange={(e) => setLocalData({
                            ...localData,
                            about: { ...localData.about, paragraph2: e.target.value }
                          })}
                          className="w-full p-2.5 border border-border-theme/40 bg-surface-theme font-sans text-sm text-text-theme h-28"
                        />
                      </div>
                    </div>

                    {/* SKILLS CRUDS */}
                    <div className="pt-4 border-t-2 border-text-theme space-y-4">
                      <div className="flex justify-between items-center flex-wrap gap-2">
                        <h4 className="font-sans text-xs font-bold  tracking-wider text-text-theme">
                          Manage Arsenal Skill Matrix
                        </h4>
                        <button
                          onClick={handleAddNewSkill}
                          className="px-3 py-1 bg-secondary-theme hover:bg-yellow-400 text-black border border-border-theme/40 text-xs font-sans font-bold  flex items-center gap-1.5 shadow-sm active:translate-y-0 active:translate-y-0 active:scale-98 transition-all cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          Add Skill
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-1.5 p-3 bg-surface-theme border border-border-theme/40 max-h-24 overflow-y-auto">
                        {localData.about.skills.map((skill) => (
                          <div
                            key={skill.name}
                            className={`flex items-center border border-border-theme/40 font-sans text-[11px] font-bold  overflow-hidden ${selectedSkillName === skill.name ? "bg-secondary-theme text-black" : "bg-bg-theme text-text-theme"
                              }`}
                          >
                            <button
                              onClick={() => setSelectedSkillName(skill.name)}
                              className="px-2 py-1 cursor-pointer"
                            >
                              {skill.name}
                            </button>
                            <button
                              onClick={() => handleDeleteSkill(skill.name)}
                              className="px-1.5 py-1 bg-red-500 hover:bg-red-600 border-l-2 border-text-theme text-white text-xs cursor-pointer"
                              title="Delete skill"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>

                      {currentSkill && (
                        <div className="p-4 border border-border-theme/40 bg-surface-theme grid grid-cols-1 md:grid-cols-3 gap-4 animate-[fadeInUp_0.15s_ease_forwards]">
                          <div className="space-y-2">
                            <label className="block font-sans text-[10px] font-bold  text-text-theme">Skill Name</label>
                            <input
                              type="text"
                              value={currentSkill.name}
                              onChange={(e) => {
                                const oldName = currentSkill.name;
                                const newName = e.target.value;
                                handleSkillChange("name", newName);
                                setSelectedSkillName(newName);
                              }}
                              className="w-full p-2 border border-border-theme/40 bg-surface-theme rounded-xl p-2.5 font-sans text-xs font-bold text-text-theme "
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="block font-sans text-[10px] font-bold  text-text-theme">Category Group</label>
                            <select
                              value={currentSkill.category}
                              onChange={(e) => handleSkillChange("category", e.target.value as any)}
                              className="w-full p-2 border border-border-theme/40 bg-surface-theme rounded-xl p-2.5 font-sans text-xs font-bold text-text-theme "
                            >
                              <option value="frontend">Frontend Architecture</option>
                              <option value="backend">Backend &amp; Systems</option>
                              <option value="tools">Tools &amp; Technologies</option>
                            </select>
                          </div>

                          <div className="space-y-2">
                            <label className="block font-sans text-[10px] font-bold  text-text-theme">Badge Text</label>
                            <input
                              type="text"
                              value={currentSkill.badge}
                              onChange={(e) => handleSkillChange("badge", e.target.value)}
                              className="w-full p-2 border border-border-theme/40 bg-surface-theme rounded-xl p-2.5 font-sans text-xs font-bold text-text-theme "
                            />
                          </div>

                          <div className="space-y-2 md:col-span-1">
                            <label className="block font-sans text-[10px] font-bold  text-text-theme">Proficiency Metric ({currentSkill.proficiency}%)</label>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={currentSkill.proficiency}
                              onChange={(e) => handleSkillChange("proficiency", parseInt(e.target.value))}
                              className="w-full accent-secondary-theme cursor-pointer"
                            />
                          </div>

                          <div className="space-y-2 md:col-span-2">
                            <label className="block font-sans text-[10px] font-bold  text-text-theme">Experience / Highlight Summary Description</label>
                            <input
                              type="text"
                              value={currentSkill.description}
                              onChange={(e) => handleSkillChange("description", e.target.value)}
                              className="w-full p-2 border border-border-theme/40 bg-surface-theme rounded-xl p-2.5 font-sans text-xs font-medium text-text-theme"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* PROJECTS TAB */}
                {activeTab === "projects" && (
                  <div className="space-y-6 animate-[fadeInUp_0.2s_ease_forwards]">
                    <h3 className="text-xl font-bold  tracking-tight text-text-theme flex items-center gap-2 border-b-2 border-text-theme pb-1">
                      Edit Selected Works Grid
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="block font-sans text-xs font-bold  text-text-theme">Section Heading Title</label>
                        <input
                          type="text"
                          value={localData.projects.title}
                          onChange={(e) => setLocalData({
                            ...localData,
                            projects: { ...localData.projects, title: e.target.value }
                          })}
                          className="w-full p-2.5 border border-border-theme/40 bg-surface-theme font-sans font-medium text-sm text-text-theme"
                        />
                      </div>
                    </div>

                    <div className="pt-2 space-y-4">
                      <div className="flex justify-between items-center flex-wrap gap-2">
                        <h4 className="font-sans text-xs font-bold  tracking-wider text-text-theme">
                          Select Project Template to Edit
                        </h4>
                        <button
                          onClick={handleAddNewProject}
                          className="px-3 py-1 bg-secondary-theme hover:bg-yellow-400 text-black border border-border-theme/40 text-xs font-sans font-bold  flex items-center gap-1.5 shadow-sm active:translate-y-0 active:translate-y-0 active:scale-98 transition-all cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          Add Project
                        </button>
                      </div>

                      {/* Selector list */}
                      <div className="flex flex-wrap gap-2 p-3 bg-surface-theme border border-border-theme/40">
                        {localData.projects.items.map((proj) => (
                          <div
                            key={proj.id}
                            className={`flex items-center border border-border-theme/40 font-sans text-[11px] font-bold  overflow-hidden ${selectedProjectId === proj.id ? "bg-secondary-theme text-black" : "bg-bg-theme text-text-theme"
                              }`}
                          >
                            <button
                              onClick={() => setSelectedProjectId(proj.id)}
                              className="px-3 py-1.5 cursor-pointer"
                            >
                              {proj.title} ({proj.year})
                            </button>
                            <button
                              onClick={() => handleDeleteProject(proj.id)}
                              className="px-2 py-1.5 bg-red-500 hover:bg-red-600 border-l-2 border-text-theme text-white text-xs cursor-pointer"
                              title="Delete Project"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>

                      {/* Selected Project fields */}
                      {currentProject && (
                        <div className="p-4 border border-border-theme/40 bg-surface-theme space-y-4 animate-[fadeInUp_0.15s_ease_forwards]">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <label className="block font-sans text-[10px] font-bold  text-text-theme">Project Title</label>
                              <input
                                type="text"
                                value={currentProject.title}
                                onChange={(e) => handleProjectChange("title", e.target.value)}
                                className="w-full p-2 border border-border-theme/40 bg-surface-theme rounded-xl p-2.5 font-sans font-bold  text-xs text-text-theme"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="block font-sans text-[10px] font-bold  text-text-theme">Year / Period</label>
                              <input
                                type="text"
                                value={currentProject.year}
                                onChange={(e) => handleProjectChange("year", e.target.value)}
                                className="w-full p-2 border border-border-theme/40 bg-surface-theme rounded-xl p-2.5 font-sans text-xs text-text-theme"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="block font-sans text-[10px] font-bold  text-text-theme">Tech Tags (Comma separated)</label>
                              <input
                                type="text"
                                value={currentProject.tech.join(", ")}
                                onChange={(e) => handleProjectChange("tech", e.target.value.split(",").map(t => t.trim()).filter(Boolean))}
                                className="w-full p-2 border border-border-theme/40 bg-surface-theme rounded-xl p-2.5 font-sans text-xs text-text-theme"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="block font-sans text-[10px] font-bold  text-text-theme">Aesthetic Subtitle (Short descriptor for card)</label>
                            <input
                              type="text"
                              value={currentProject.subtitle}
                              onChange={(e) => handleProjectChange("subtitle", e.target.value)}
                              className="w-full p-2 border border-border-theme/40 bg-surface-theme rounded-xl p-2.5 font-sans font-semibold text-xs text-text-theme"
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="block font-sans text-[10px] font-bold  text-text-theme">Detailed Description (For detailed architecture modal)</label>
                            <textarea
                              value={currentProject.description}
                              onChange={(e) => handleProjectChange("description", e.target.value)}
                              className="w-full p-2 border border-border-theme/40 bg-surface-theme rounded-xl p-2.5 font-sans text-xs text-text-theme h-20"
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2 md:col-span-1">
                              <label className="block font-sans text-[10px] font-bold text-text-theme">Project Thumbnail Image URL</label>
                              <div className="flex gap-2.5 items-center mt-1">
                                {currentProject.imageUrl && (
                                  <img
                                    src={currentProject.imageUrl}
                                    alt="Thumbnail Preview"
                                    className="w-10 h-10 object-cover rounded-lg border border-border-theme/40 flex-shrink-0"
                                  />
                                )}
                                <input
                                  type="text"
                                  value={currentProject.imageUrl}
                                  onChange={(e) => handleProjectChange("imageUrl", e.target.value)}
                                  placeholder="Thumbnail image URL..."
                                  className="w-full p-2 border border-border-theme/40 bg-surface-theme rounded-xl p-2.5 font-sans text-xs text-text-theme"
                                />
                              </div>
                            </div>
                            <div className="space-y-2 md:col-span-1">
                              <label className="block font-sans text-[10px] font-bold  text-text-theme">Live App / Demo Link</label>
                              <input
                                type="text"
                                value={currentProject.liveUrl}
                                onChange={(e) => handleProjectChange("liveUrl", e.target.value)}
                                className="w-full p-2 border border-border-theme/40 bg-surface-theme rounded-xl p-2.5 font-sans text-xs text-text-theme"
                              />
                            </div>
                            <div className="space-y-2 md:col-span-1">
                              <label className="block font-sans text-[10px] font-bold  text-text-theme">GitHub Repository Link</label>
                              <input
                                type="text"
                                value={currentProject.githubUrl}
                                onChange={(e) => handleProjectChange("githubUrl", e.target.value)}
                                className="w-full p-2 border border-border-theme/40 bg-surface-theme rounded-xl p-2.5 font-sans text-xs text-text-theme"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="block font-sans text-[10px] font-bold  text-text-theme">Engineering Challenges Faced</label>
                              <textarea
                                value={currentProject.challenges}
                                onChange={(e) => handleProjectChange("challenges", e.target.value)}
                                className="w-full p-2 border border-border-theme/40 bg-surface-theme rounded-xl p-2.5 font-sans text-xs text-text-theme h-16"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="block font-sans text-[10px] font-bold  text-text-theme">Key Milestones list (One item per line)</label>
                              <textarea
                                value={currentProject.highlights.join("\n")}
                                onChange={(e) => handleProjectChange("highlights", e.target.value.split("\n").map(h => h.trim()).filter(Boolean))}
                                className="w-full p-2 border border-border-theme/40 bg-surface-theme rounded-xl p-2.5 font-sans text-xs text-text-theme h-16"
                                placeholder="Enter one highlight per line"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* TIMELINE TAB */}
                {activeTab === "timeline" && (
                  <div className="space-y-6 animate-[fadeInUp_0.2s_ease_forwards]">
                    <h3 className="text-xl font-bold  tracking-tight text-text-theme flex items-center gap-2 border-b-2 border-text-theme pb-1">
                      Edit Experience &amp; Education Log
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="block font-sans text-xs font-bold  text-text-theme">Section Heading Title</label>
                        <input
                          type="text"
                          value={localData.timeline.title}
                          onChange={(e) => setLocalData({
                            ...localData,
                            timeline: { ...localData.timeline, title: e.target.value }
                          })}
                          className="w-full p-2.5 border border-border-theme/40 bg-surface-theme font-sans font-medium text-sm text-text-theme"
                        />
                      </div>
                    </div>

                    <div className="pt-2 space-y-4">
                      <div className="flex justify-between items-center flex-wrap gap-2">
                        <h4 className="font-sans text-xs font-bold  tracking-wider text-text-theme">
                          Select Log Item to Edit
                        </h4>
                        <button
                          onClick={handleAddNewTimeline}
                          className="px-3 py-1 bg-secondary-theme hover:bg-yellow-400 text-black border border-border-theme/40 text-xs font-sans font-bold  flex items-center gap-1.5 shadow-sm active:translate-y-0 active:translate-y-0 active:scale-98 transition-all cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          Add Event
                        </button>
                      </div>

                      {/* Selector list */}
                      <div className="flex flex-wrap gap-2 p-3 bg-surface-theme border border-border-theme/40">
                        {localData.timeline.items.map((item) => (
                          <div
                            key={item.id}
                            className={`flex items-center border border-border-theme/40 font-sans text-[11px] font-bold  overflow-hidden ${selectedTimelineId === item.id ? "bg-secondary-theme text-black" : "bg-bg-theme text-text-theme"
                              }`}
                          >
                            <button
                              onClick={() => setSelectedTimelineId(item.id)}
                              className="px-3 py-1.5 cursor-pointer"
                            >
                              {item.title} ({item.period})
                            </button>
                            <button
                              onClick={() => handleDeleteTimeline(item.id)}
                              className="px-2 py-1.5 bg-red-500 hover:bg-red-600 border-l-2 border-text-theme text-white text-xs cursor-pointer"
                              title="Delete Timeline Event"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>

                      {/* Selected timeline item fields */}
                      {currentTimeline && (
                        <div className="p-4 border border-border-theme/40 bg-surface-theme space-y-4 animate-[fadeInUp_0.15s_ease_forwards]">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <label className="block font-sans text-[10px] font-bold  text-text-theme">Role Title / Degree</label>
                              <input
                                type="text"
                                value={currentTimeline.title}
                                onChange={(e) => handleTimelineChange("title", e.target.value)}
                                className="w-full p-2 border border-border-theme/40 bg-surface-theme rounded-xl p-2.5 font-sans font-bold  text-xs text-text-theme"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="block font-sans text-[10px] font-bold  text-text-theme">Company / Institution Name</label>
                              <input
                                type="text"
                                value={currentTimeline.subtitle}
                                onChange={(e) => handleTimelineChange("subtitle", e.target.value)}
                                className="w-full p-2 border border-border-theme/40 bg-surface-theme rounded-xl p-2.5 font-sans text-xs text-text-theme "
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="block font-sans text-[10px] font-bold  text-text-theme">Duration Period</label>
                              <input
                                type="text"
                                value={currentTimeline.period}
                                onChange={(e) => handleTimelineChange("period", e.target.value)}
                                className="w-full p-2 border border-border-theme/40 bg-surface-theme rounded-xl p-2.5 font-sans text-xs text-text-theme"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="block font-sans text-[10px] font-bold  text-text-theme">Brief Summary Description</label>
                            <textarea
                              value={currentTimeline.description}
                              onChange={(e) => handleTimelineChange("description", e.target.value)}
                              className="w-full p-2 border border-border-theme/40 bg-surface-theme rounded-xl p-2.5 font-sans text-xs text-text-theme h-16"
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="block font-sans text-[10px] font-bold  text-text-theme">Key Achievements / Contributions list (One per line)</label>
                            <textarea
                              value={currentTimeline.achievements.join("\n")}
                              onChange={(e) => handleTimelineChange("achievements", e.target.value.split("\n").map(a => a.trim()).filter(Boolean))}
                              className="w-full p-2 border border-border-theme/40 bg-surface-theme rounded-xl p-2.5 font-sans text-xs text-text-theme h-24"
                              placeholder="Enter one achievement per line"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* RESUME BUILDER SYSTEM */}
                {activeTab === "resume" && (
                  <div className="space-y-6 animate-[fadeInUp_0.2s_ease_forwards]">
                    <div className="flex justify-between items-center border-b-2 border-text-theme pb-2 flex-wrap gap-4">
                      <h3 className="text-xl font-bold  tracking-tight text-text-theme flex items-center gap-2">
                        <FileText className="w-5 h-5 text-secondary-theme" />
                        Curriculum Vitae Resume Editor
                      </h3>
                      <button
                        onClick={handleDownloadFromAdmin}
                        className="px-4 py-2 bg-secondary-theme hover:bg-yellow-400 text-black border border-border-theme/40 text-xs font-sans font-bold  flex items-center gap-1.5 shadow-sm active:translate-y-0 active:translate-y-0 active:scale-98 transition-all cursor-pointer rounded-xl"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Download formatted Resume
                      </button>
                    </div>

                    {/* Personal Information */}
                    <div className="p-4 border border-border-theme/40 bg-surface-theme space-y-4 shadow-md ">
                      <h4 className="font-sans text-[11px] font-bold  tracking-wider text-secondary-theme">1. Contact &amp; Header Details</h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="block font-sans text-[10px] font-bold  text-text-theme">Full Name</label>
                          <input
                            type="text"
                            value={localData.resume?.name || ""}
                            onChange={(e) => setLocalData({
                              ...localData,
                              resume: { ...localData.resume, name: e.target.value }
                            })}
                            className="w-full p-2 border border-border-theme/40 bg-surface-theme rounded-xl p-2.5 font-sans font-bold text-xs text-text-theme rounded-xl"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block font-sans text-[10px] font-bold  text-text-theme">Professional Title</label>
                          <input
                            type="text"
                            value={localData.resume?.title || ""}
                            onChange={(e) => setLocalData({
                              ...localData,
                              resume: { ...localData.resume, title: e.target.value }
                            })}
                            className="w-full p-2 border border-border-theme/40 bg-surface-theme rounded-xl p-2.5 font-sans font-bold text-xs text-text-theme  rounded-xl"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block font-sans text-[10px] font-bold  text-text-theme">Email Address</label>
                          <input
                            type="email"
                            value={localData.resume?.email || ""}
                            onChange={(e) => setLocalData({
                              ...localData,
                              resume: { ...localData.resume, email: e.target.value }
                            })}
                            className="w-full p-2 border border-border-theme/40 bg-surface-theme rounded-xl p-2.5 font-sans text-xs text-text-theme rounded-xl"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block font-sans text-[10px] font-bold  text-text-theme">Phone Number</label>
                          <input
                            type="text"
                            value={localData.resume?.phone || ""}
                            onChange={(e) => setLocalData({
                              ...localData,
                              resume: { ...localData.resume, phone: e.target.value }
                            })}
                            className="w-full p-2 border border-border-theme/40 bg-surface-theme rounded-xl p-2.5 font-sans text-xs text-text-theme rounded-xl"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="block font-sans text-[10px] font-bold  text-text-theme">Location &amp; Work Preference</label>
                        <input
                          type="text"
                          value={localData.resume?.location || ""}
                          onChange={(e) => setLocalData({
                            ...localData,
                            resume: { ...localData.resume, location: e.target.value }
                          })}
                          className="w-full p-2 border border-border-theme/40 bg-surface-theme rounded-xl p-2.5 font-sans text-xs text-text-theme rounded-xl"
                          placeholder="e.g. San Francisco, CA (Open to Remote)"
                        />
                      </div>
                    </div>

                    {/* Profile statement */}
                    <div className="p-4 border border-border-theme/40 bg-surface-theme space-y-2 shadow-md ">
                      <h4 className="font-sans text-[11px] font-bold  tracking-wider text-secondary-theme">2. Professional Profile Paragraph</h4>
                      <textarea
                        value={localData.resume?.profile || ""}
                        onChange={(e) => setLocalData({
                          ...localData,
                          resume: { ...localData.resume, profile: e.target.value }
                        })}
                        className="w-full p-2.5 border border-border-theme/40 bg-surface-theme rounded-xl p-2.5 font-sans text-xs text-text-theme h-24 leading-relaxed rounded-xl"
                      />
                    </div>

                    {/* Work Experience Builder */}
                    <div className="p-4 border border-border-theme/40 bg-surface-theme space-y-4 shadow-md ">
                      <div className="flex justify-between items-center border-b border-text-theme pb-2 flex-wrap gap-2">
                        <h4 className="font-sans text-[11px] font-bold  tracking-wider text-secondary-theme">3. Work History Events ({localData.resume?.experience?.length || 0})</h4>
                        <button
                          onClick={handleAddNewResumeExp}
                          className="px-2.5 py-1 bg-primary-theme text-on-primary-theme rounded-full border border-border-theme/40 text-[10px] font-sans font-bold  flex items-center gap-1 hover:-translate-y-0.5 hover:-translate-y-0.5 transition-all cursor-pointer shadow-sm active:translate-y-0 active:translate-y-0 rounded-xl"
                        >
                          <Plus className="w-3 h-3" />
                          Add Work Event
                        </button>
                      </div>

                      {/* Selector list */}
                      <div className="flex flex-wrap gap-2 p-3 bg-surface-theme border border-border-theme/40">
                        {(localData.resume?.experience || []).map((exp) => (
                          <div
                            key={exp.id}
                            className={`flex items-center border border-border-theme/40 font-sans text-[11px] font-bold  overflow-hidden ${selectedResumeExpId === exp.id ? "bg-secondary-theme text-black" : "bg-bg-theme text-text-theme"
                              }`}
                          >
                            <button
                              onClick={() => setSelectedResumeExpId(exp.id)}
                              className="px-3 py-1.5 cursor-pointer"
                            >
                              {exp.company}
                            </button>
                            <button
                              onClick={() => handleDeleteResumeExp(exp.id)}
                              className="px-2 py-1.5 bg-red-500 hover:bg-red-600 border-l-2 border-text-theme text-white text-xs cursor-pointer flex items-center justify-center"
                              title="Delete Resume Experience"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>

                      {/* Selected experience fields */}
                      {currentResumeExp && (
                        <div className="p-3 border border-border-theme/40 bg-bg-theme space-y-3 animate-[fadeInUp_0.1s_ease_forwards]">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div className="space-y-1">
                              <label className="block font-sans text-[9px] font-bold  text-text-theme">Job Role Title</label>
                              <input
                                type="text"
                                value={currentResumeExp.title}
                                onChange={(e) => handleResumeExpChange("title", e.target.value)}
                                className="w-full p-2 border border-border-theme/40 bg-surface-theme rounded-xl p-2.5 font-sans font-bold  text-xs text-text-theme rounded-xl"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="block font-sans text-[9px] font-bold  text-text-theme">Company Name</label>
                              <input
                                type="text"
                                value={currentResumeExp.company}
                                onChange={(e) => handleResumeExpChange("company", e.target.value)}
                                className="w-full p-2 border border-border-theme/40 bg-surface-theme rounded-xl p-2.5 font-sans font-bold  text-xs text-text-theme rounded-xl"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="block font-sans text-[9px] font-bold  text-text-theme">Employment Period</label>
                              <input
                                type="text"
                                value={currentResumeExp.period}
                                onChange={(e) => handleResumeExpChange("period", e.target.value)}
                                className="w-full p-2 border border-border-theme/40 bg-surface-theme rounded-xl p-2.5 font-sans text-xs text-text-theme rounded-xl"
                              />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="block font-sans text-[9px] font-bold  text-text-theme">Key Contributions (One bullet point per line)</label>
                            <textarea
                              value={currentResumeExp.bullets.join("\n")}
                              onChange={(e) => handleResumeExpChange("bullets", e.target.value.split("\n").map(b => b.trim()).filter(Boolean))}
                              className="w-full p-2 border border-border-theme/40 bg-surface-theme rounded-xl p-2.5 font-sans text-xs text-text-theme h-24 rounded-xl"
                              placeholder="e.g. Developed high-performance modular React web app interface."
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Education Builder */}
                    <div className="p-4 border border-border-theme/40 bg-surface-theme space-y-4 shadow-md ">
                      <div className="flex justify-between items-center border-b border-text-theme pb-2 flex-wrap gap-2">
                        <h4 className="font-sans text-[11px] font-bold  tracking-wider text-secondary-theme">4. Education Certifications ({localData.resume?.education?.length || 0})</h4>
                        <button
                          onClick={handleAddNewResumeEdu}
                          className="px-2.5 py-1 bg-primary-theme text-on-primary-theme rounded-full border border-border-theme/40 text-[10px] font-sans font-bold  flex items-center gap-1 hover:-translate-y-0.5 hover:-translate-y-0.5 transition-all cursor-pointer shadow-sm active:translate-y-0 active:translate-y-0 rounded-xl"
                        >
                          <Plus className="w-3 h-3" />
                          Add Education
                        </button>
                      </div>

                      {/* Selector list */}
                      <div className="flex flex-wrap gap-2 p-3 bg-surface-theme border border-border-theme/40">
                        {(localData.resume?.education || []).map((edu) => (
                          <div
                            key={edu.id}
                            className={`flex items-center border border-border-theme/40 font-sans text-[11px] font-bold  overflow-hidden ${selectedResumeEduId === edu.id ? "bg-secondary-theme text-black" : "bg-bg-theme text-text-theme"
                              }`}
                          >
                            <button
                              onClick={() => setSelectedResumeEduId(edu.id)}
                              className="px-3 py-1.5 cursor-pointer"
                            >
                              {edu.school}
                            </button>
                            <button
                              onClick={() => handleDeleteResumeEdu(edu.id)}
                              className="px-2 py-1.5 bg-red-500 hover:bg-red-600 border-l-2 border-text-theme text-white text-xs cursor-pointer flex items-center justify-center"
                              title="Delete Resume Education"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>

                      {/* Selected education fields */}
                      {currentResumeEdu && (
                        <div className="p-3 border border-border-theme/40 bg-bg-theme space-y-3 animate-[fadeInUp_0.1s_ease_forwards]">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div className="space-y-1">
                              <label className="block font-sans text-[9px] font-bold  text-text-theme">Degree / Certification</label>
                              <input
                                type="text"
                                value={currentResumeEdu.degree}
                                onChange={(e) => handleResumeEduChange("degree", e.target.value)}
                                className="w-full p-2 border border-border-theme/40 bg-surface-theme rounded-xl p-2.5 font-sans font-bold  text-xs text-text-theme rounded-xl"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="block font-sans text-[9px] font-bold  text-text-theme">School / Institution</label>
                              <input
                                type="text"
                                value={currentResumeEdu.school}
                                onChange={(e) => handleResumeEduChange("school", e.target.value)}
                                className="w-full p-2 border border-border-theme/40 bg-surface-theme rounded-xl p-2.5 font-sans font-bold  text-xs text-text-theme rounded-xl"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="block font-sans text-[9px] font-bold  text-text-theme">Study Period</label>
                              <input
                                type="text"
                                value={currentResumeEdu.period}
                                onChange={(e) => handleResumeEduChange("period", e.target.value)}
                                className="w-full p-2 border border-border-theme/40 bg-surface-theme rounded-xl p-2.5 font-sans text-xs text-text-theme rounded-xl"
                              />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="block font-sans text-[9px] font-bold  text-text-theme">Honors &amp; Specific Details</label>
                            <textarea
                              value={currentResumeEdu.details}
                              onChange={(e) => handleResumeEduChange("details", e.target.value)}
                              className="w-full p-2 border border-border-theme/40 bg-surface-theme rounded-xl p-2.5 font-sans text-xs text-text-theme h-16 rounded-xl"
                              placeholder="e.g. Specialized in computer graphics, web frameworks. Graduated with Honors."
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Technical Skills Lists */}
                    <div className="p-4 border border-border-theme/40 bg-surface-theme space-y-4 shadow-md ">
                      <h4 className="font-sans text-[11px] font-bold  tracking-wider text-secondary-theme">5. Technical Skills &amp; Proficiencies</h4>

                      <div className="space-y-3">
                        <div className="space-y-1">
                          <label className="block font-sans text-[10px] font-bold  text-text-theme">Frontend Stack (Comma separated)</label>
                          <input
                            type="text"
                            value={localData.resume?.skills?.frontend || ""}
                            onChange={(e) => setLocalData({
                              ...localData,
                              resume: {
                                ...localData.resume,
                                skills: { ...localData.resume.skills, frontend: e.target.value }
                              }
                            })}
                            className="w-full p-2 border border-border-theme/40 bg-surface-theme rounded-xl p-2.5 font-sans text-xs text-text-theme rounded-xl"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block font-sans text-[10px] font-bold  text-text-theme">Backend &amp; Systems (Comma separated)</label>
                          <input
                            type="text"
                            value={localData.resume?.skills?.backend || ""}
                            onChange={(e) => setLocalData({
                              ...localData,
                              resume: {
                                ...localData.resume,
                                skills: { ...localData.resume.skills, backend: e.target.value }
                              }
                            })}
                            className="w-full p-2 border border-border-theme/40 bg-surface-theme rounded-xl p-2.5 font-sans text-xs text-text-theme rounded-xl"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block font-sans text-[10px] font-bold  text-text-theme">Tools &amp; Infrastructure (Comma separated)</label>
                          <input
                            type="text"
                            value={localData.resume?.skills?.tools || ""}
                            onChange={(e) => setLocalData({
                              ...localData,
                              resume: {
                                ...localData.resume,
                                skills: { ...localData.resume.skills, tools: e.target.value }
                              }
                            })}
                            className="w-full p-2 border border-border-theme/40 bg-surface-theme rounded-xl p-2.5 font-sans text-xs text-text-theme rounded-xl"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* PHOTOGRAPHY TAB */}
                {activeTab === "photography" && (
                  <div className="space-y-6 animate-[fadeInUp_0.2s_ease_forwards]">
                    <h3 className="text-xl font-bold tracking-tight text-text-theme flex items-center gap-2 border-b-2 border-text-theme pb-1">
                      Edit Photography Showcase
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="block font-sans text-xs font-bold text-text-theme">Section Title</label>
                        <input
                          type="text"
                          value={localData.photography?.title || ""}
                          onChange={(e) => setLocalData({
                            ...localData,
                            photography: { ...localData.photography, title: e.target.value }
                          })}
                          className="w-full p-2.5 border border-border-theme/40 bg-surface-theme font-sans font-medium text-sm text-text-theme"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block font-sans text-xs font-bold text-text-theme">Instagram URL</label>
                        <input
                          type="text"
                          value={localData.photography?.instagramUrl || ""}
                          onChange={(e) => setLocalData({
                            ...localData,
                            photography: { ...localData.photography, instagramUrl: e.target.value }
                          })}
                          className="w-full p-2.5 border border-border-theme/40 bg-surface-theme font-sans font-medium text-sm text-text-theme"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block font-sans text-xs font-bold text-text-theme">Description</label>
                      <textarea
                        value={localData.photography?.description || ""}
                        onChange={(e) => setLocalData({
                          ...localData,
                          photography: { ...localData.photography, description: e.target.value }
                        })}
                        className="w-full p-2.5 border border-border-theme/40 bg-surface-theme font-sans text-sm text-text-theme h-20"
                      />
                    </div>
                    
                    {/* Photo Manager */}
                    <div className="bg-surface-theme border border-border-theme p-4 space-y-4 rounded-xl">
                      <div className="flex justify-between items-center pb-2 border-b border-border-theme">
                        <h4 className="font-sans text-sm font-bold text-text-theme">Instagram Photos / Shots</h4>
                        <button
                          onClick={() => {
                            const newId = "photo-" + Date.now();
                            setLocalData(prev => ({
                              ...prev,
                              photography: {
                                ...prev.photography,
                                photos: [...(prev.photography?.photos || []), { id: newId, url: "", caption: "New Photo" }]
                              }
                            }));
                            setSelectedPhotoId(newId);
                          }}
                          className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-secondary-theme text-white px-2 py-1 rounded hover:bg-secondary-theme/80 transition-colors"
                        >
                          <Plus className="w-3 h-3" /> Add Photo
                        </button>
                      </div>
                      
                      <div className="flex flex-col md:flex-row gap-4 items-start">
                        {/* List */}
                        <div className="w-full md:w-1/3 flex flex-col gap-2 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
                          {localData.photography?.photos?.map(photo => (
                            <div 
                              key={photo.id}
                              className={`flex items-center justify-between p-2 rounded cursor-pointer transition-colors border ${selectedPhotoId === photo.id ? 'border-secondary-theme bg-secondary-theme/10' : 'border-border-theme/40 hover:border-secondary-theme/50'}`}
                              onClick={() => setSelectedPhotoId(photo.id)}
                            >
                              <span className="font-sans text-xs truncate max-w-[150px] font-medium text-text-theme">{photo.caption || "Untitled"}</span>
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setLocalData(prev => ({
                                    ...prev,
                                    photography: {
                                      ...prev.photography,
                                      photos: prev.photography.photos.filter(p => p.id !== photo.id)
                                    }
                                  }));
                                  if (selectedPhotoId === photo.id) setSelectedPhotoId("");
                                }}
                                className="text-text-variant hover:text-red-500 transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                        
                        {/* Editor */}
                        {selectedPhotoId && localData.photography?.photos?.find(p => p.id === selectedPhotoId) ? (
                          <div className="w-full md:w-2/3 space-y-3 bg-bg-theme p-4 border border-border-theme/40 rounded-lg">
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold uppercase tracking-wider text-text-variant">Image URL (Thumbnail Link)</label>
                              <input 
                                type="text"
                                value={localData.photography.photos.find(p => p.id === selectedPhotoId)?.url || ""}
                                onChange={(e) => {
                                  setLocalData(prev => ({
                                    ...prev,
                                    photography: {
                                      ...prev.photography,
                                      photos: prev.photography.photos.map(p => p.id === selectedPhotoId ? { ...p, url: e.target.value } : p)
                                    }
                                  }))
                                }}
                                className="w-full p-2 bg-surface-theme border border-border-theme/50 text-xs text-text-theme rounded"
                                placeholder="https://..."
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold uppercase tracking-wider text-text-variant">Redirection URL (Click Link)</label>
                              <input 
                                type="text"
                                value={localData.photography.photos.find(p => p.id === selectedPhotoId)?.linkUrl || ""}
                                onChange={(e) => {
                                  setLocalData(prev => ({
                                    ...prev,
                                    photography: {
                                      ...prev.photography,
                                      photos: prev.photography.photos.map(p => p.id === selectedPhotoId ? { ...p, linkUrl: e.target.value } : p)
                                    }
                                  }))
                                }}
                                className="w-full p-2 bg-surface-theme border border-border-theme/50 text-xs text-text-theme rounded"
                                placeholder="https://instagram.com/p/..."
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold uppercase tracking-wider text-text-variant">Caption</label>
                              <input 
                                type="text"
                                value={localData.photography.photos.find(p => p.id === selectedPhotoId)?.caption || ""}
                                onChange={(e) => {
                                  setLocalData(prev => ({
                                    ...prev,
                                    photography: {
                                      ...prev.photography,
                                      photos: prev.photography.photos.map(p => p.id === selectedPhotoId ? { ...p, caption: e.target.value } : p)
                                    }
                                  }))
                                }}
                                className="w-full p-2 bg-surface-theme border border-border-theme/50 text-xs text-text-theme rounded"
                              />
                            </div>
                            {/* Preview */}
                            {localData.photography.photos.find(p => p.id === selectedPhotoId)?.url && (
                                <div className="mt-2 aspect-square max-w-[150px] overflow-hidden border border-border-theme/50 rounded-md">
                                  <img 
                                    src={localData.photography.photos.find(p => p.id === selectedPhotoId)?.url} 
                                    alt="Preview" 
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                            )}
                          </div>
                        ) : (
                          <div className="w-full md:w-2/3 flex items-center justify-center p-8 border border-dashed border-border-theme/50 text-text-variant text-xs rounded-lg bg-surface-theme">
                            Select a photo from the list to edit its details.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* SYSTEM TEMPLATE IMPORT/EXPORT */}
                {activeTab === "system" && (
                  <div className="space-y-6 animate-[fadeInUp_0.2s_ease_forwards]">
                    <h3 className="text-xl font-bold  tracking-tight text-text-theme flex items-center gap-2 border-b-2 border-text-theme pb-1">
                      JSON Template Import &amp; Export Systems
                    </h3>

                    <p className="font-sans text-sm font-medium text-text-variant leading-relaxed">
                      Your portfolio acts as a fully dynamic digital canvas. You can edit individual sections in the tabs above, or you can serialize the entire site into a single backup JSON document. Use this to save different portfolio profiles or swap template designs instantly.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Export Box */}
                      <div className="p-6 border border-border-theme/40 bg-surface-theme flex flex-col justify-between gap-4 shadow-md ">
                        <div className="space-y-2">
                          <h4 className="font-sans text-sm font-bold  tracking-wider text-text-theme">
                            Export Current Template Configuration
                          </h4>
                          <p className="font-sans text-xs font-medium text-text-variant">
                            Export your customized titles, works, projects, skills, and logs as a template configuration file.
                          </p>
                        </div>
                        <button
                          onClick={handleExportJSON}
                          className="w-full py-3 bg-secondary-theme hover:bg-yellow-400 text-black border border-border-theme/40 text-xs font-sans font-bold  flex items-center justify-center gap-2 shadow-sm active:translate-y-0 active:translate-y-0 active:scale-98 transition-all cursor-pointer"
                        >
                          <Download className="w-4 h-4" />
                          Export portfolio-template.json
                        </button>
                      </div>

                      {/* Import Box */}
                      <div className="p-6 border border-border-theme/40 bg-surface-theme flex flex-col justify-between gap-4 shadow-md ">
                        <div className="space-y-2">
                          <h4 className="font-sans text-sm font-bold  tracking-wider text-text-theme">
                            Import Template Configuration File
                          </h4>
                          <p className="font-sans text-xs font-medium text-text-variant">
                            Load a previously exported portfolio template configurations JSON file. It will instantly recompile your homepage template layout.
                          </p>
                        </div>

                        <label className="w-full py-3 bg-primary-theme hover:bg-opacity-90 text-on-primary-theme border border-border-theme/40 text-xs font-sans font-bold  flex items-center justify-center gap-2 shadow-sm hover:-translate-y-0.5 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:translate-y-0 active:scale-98 transition-all cursor-pointer">
                          <Upload className="w-4 h-4" />
                          Upload template.json
                          <input
                            type="file"
                            accept=".json"
                            onChange={handleImportJSON}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>

                    <div className="p-4 border-2 border-yellow-500 bg-yellow-500/10 text-yellow-800 dark:text-yellow-400 text-xs flex items-start gap-2.5">
                      <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <div>
                        <h5 className="font-bold  mb-0.5">Template Architecture Notice</h5>
                        <p className="font-medium leading-relaxed">
                          All templates are cached locally in your sandbox sandbox browser memory (localStorage). If you clear your browser cookies or cache, your customizations may be reset to default hardcoded configurations. Export your JSON config file to save backups securely!
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* VISITOR STATISTICS ANALYTICS */}
                {activeTab === "stats" && (
                  <div className="space-y-6 animate-[fadeInUp_0.2s_ease_forwards]">
                    <h3 className="text-xl font-bold tracking-tight text-text-theme flex items-center gap-2 border-b border-border-theme/40 pb-1">
                      Visitor Traffic &amp; Action Analytics
                    </h3>

                    <p className="font-sans text-sm font-medium text-text-variant leading-relaxed">
                      Real-time local tracking metrics compiled from sandbox browser engagement. Use this to audit project visits, code checkouts, and resume downloads.
                    </p>

                    {/* Main Counters Panel */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Total Page Views */}
                      <div className="p-6 border border-border-theme/40 bg-surface-theme rounded-2xl flex flex-col justify-between shadow-sm relative overflow-hidden">
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-text-variant">Engagement Overview</span>
                          <h4 className="font-sans text-2xl font-bold text-text-theme">Portfolio Visits</h4>
                        </div>
                        <div className="text-4xl font-extrabold text-secondary-theme mt-6">
                          {localStorage.getItem("portfolio_visits") || "0"} <span className="text-xs font-semibold text-text-variant">views</span>
                        </div>
                      </div>

                      {/* Total Resume Downloads */}
                      <div className="p-6 border border-border-theme/40 bg-surface-theme rounded-2xl flex flex-col justify-between shadow-sm relative overflow-hidden">
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-text-variant">Credential Delivery</span>
                          <h4 className="font-sans text-2xl font-bold text-text-theme">Resume Downloads</h4>
                        </div>
                        <div className="text-4xl font-extrabold text-secondary-theme mt-6">
                          {localStorage.getItem("resume_downloads") || "0"} <span className="text-xs font-semibold text-text-variant">downloads</span>
                        </div>
                      </div>

                      {/* Total Project Clicks */}
                      <div className="p-6 border border-border-theme/40 bg-surface-theme rounded-2xl flex flex-col justify-between shadow-sm relative overflow-hidden">
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-text-variant">Launch Operations</span>
                          <h4 className="font-sans text-2xl font-bold text-text-theme">Launch Actions</h4>
                        </div>
                        <div className="text-4xl font-extrabold text-secondary-theme mt-6">
                          {Object.values(JSON.parse(localStorage.getItem("project_visits") || "{}")).reduce((a: any, b: any) => a + b, 0) as number} <span className="text-xs font-semibold text-text-variant">clicks</span>
                        </div>
                      </div>
                    </div>

                    {/* Tabulated breakdown details */}
                    <div className="border border-border-theme/40 bg-surface-theme rounded-2xl p-6 shadow-sm space-y-4">
                      <h4 className="font-sans text-sm font-bold tracking-tight text-text-theme flex items-center gap-1.5 border-b border-border-theme/40 pb-2">
                        <MousePointerClick className="w-4 h-4 text-secondary-theme" />
                        Selected Works Individual Analytics breakdown
                      </h4>

                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-xs">
                          <thead>
                            <tr className="border-b border-border-theme/40 font-bold text-text-theme">
                              <th className="py-2.5 px-1.5">Project Title</th>
                              <th className="py-2.5 px-1.5">Live Demo Visits</th>
                              <th className="py-2.5 px-1.5">Repo Inspect Clicks</th>
                              <th className="py-2.5 px-1.5">Total Interaction Rate</th>
                            </tr>
                          </thead>
                          <tbody>
                            {localData.projects.items.map((proj) => {
                              const demoVisits = JSON.parse(localStorage.getItem("project_visits") || "{}")[proj.id] || 0;
                              const repoInspects = JSON.parse(localStorage.getItem("repo_visits") || "{}")[proj.id] || 0;
                              return (
                                <tr key={proj.id} className="border-b border-border-theme/20 font-medium text-text-variant">
                                  <td className="py-3 px-1.5 font-semibold text-text-theme">{proj.title}</td>
                                  <td className="py-3 px-1.5">{demoVisits}</td>
                                  <td className="py-3 px-1.5">{repoInspects}</td>
                                  <td className="py-3 px-1.5 text-secondary-theme font-bold">{demoVisits + repoInspects}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="p-4 border border-border-theme/40 bg-surface-container-theme/30 text-xs flex items-start gap-2.5 rounded-xl">
                      <Info className="w-5 h-5 flex-shrink-0 mt-0.5 text-secondary-theme" />
                      <div>
                        <h5 className="font-bold mb-0.5 text-text-theme">LocalStorage Tracker Mode</h5>
                        <p className="font-medium leading-relaxed text-text-variant">
                          Since this is a client-side portfolio template, analytics counts are saved within browser LocalStorage. These metrics show interaction counts originating from the current client browser environment.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Portal Bottom Footer Actions */}
            <div className="bg-surface-theme border-t-4 border-text-theme p-4 flex justify-between items-center select-none flex-wrap gap-4">
              <div className="text-xs font-sans text-text-variant font-bold ">
                {toastMessage ? (
                  <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 animate-pulse">
                    <Check className="w-4 h-4 stroke-[3]" />
                    {toastMessage}
                  </span>
                ) : (
                  <span>Template editing draft active...</span>
                )}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-surface-theme border border-border-theme/40 font-sans text-xs font-bold  tracking-wider hover:bg-surface-container-theme transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-8 py-3 bg-primary-theme text-on-primary-theme rounded-full border border-border-theme/40 font-sans text-xs font-bold  tracking-widest flex items-center gap-2 shadow-md  hover:-translate-y-0.5 hover:-translate-y-0.5 hover:shadow-md dark:hover:shadow-[5px_5px_0px_0px_rgba(255,255,255,1)] active:translate-x-[2px] active:translate-y-[2px] active:scale-98 transition-all cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  Save &amp; Deploy Changes
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
