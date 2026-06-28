export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  year: string;
  imageUrl: string;
  tech: string[];
  liveUrl: string;
  githubUrl: string;
  highlights: string[];
  challenges: string;
}

export interface TimelineItem {
  id: string;
  period: string;
  title: string;
  subtitle: string;
  description: string;
  achievements: string[];
}

export interface SkillDetail {
  name: string;
  proficiency: number;
  description: string;
  badge: string;
  category: 'frontend' | 'backend' | 'tools';
}

export interface ResumeExperience {
  id: string;
  title: string;
  company: string;
  period: string;
  bullets: string[];
}

export interface ResumeEducation {
  id: string;
  degree: string;
  school: string;
  period: string;
  details: string;
}

export interface ResumeData {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  profile: string;
  experience: ResumeExperience[];
  education: ResumeEducation[];
  skills: {
    frontend: string;
    backend: string;
    tools: string;
  };
}

export interface PhotographyPhoto {
  id: string;
  url: string;
  caption: string;
}

export interface PhotographyData {
  title: string;
  description: string;
  instagramUrl: string;
  photos: PhotographyPhoto[];
}

export interface PortfolioData {
  hero: {
    logoName: string;
    headline: string;
    description: string;
    buttonText1: string;
    buttonText2: string;
  };
  about: {
    title: string;
    paragraph1: string;
    paragraph2: string;
    skills: SkillDetail[];
  };
  projects: {
    title: string;
    items: Project[];
  };
  timeline: {
    title: string;
    items: TimelineItem[];
  };
  resume: ResumeData;
  photography: PhotographyData;
}
