export interface Project {
  id: string;
  title: string;
  category: 'Full Stack' | 'AI' | 'Mobile' | 'Enterprise';
  subtitle: string;
  description: string;
  technologies: string[];
  metrics: string[];
  githubUrl?: string;
  liveUrl?: string;
  architectureDetails: {
    frontend?: string;
    backend?: string;
    database?: string;
    highlights: string[];
  };
  demoCodeSnippet?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  isCurrent?: boolean;
  bullets: string[];
  keyMetrics: string[];
  techStack: string[];
}

export interface SkillCategory {
  category: 'Frontend' | 'Backend' | 'Mobile' | 'Languages' | 'Databases' | 'DevOps & Tools' | 'Practices';
  iconName: string;
  skills: {
    name: string;
    level: number; // 0 - 100
    experienceYear: string;
    isPrimary?: boolean;
  }[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  year: string;
  skills: string[];
  verifyUrl?: string;
  credentialUrl?: string;
  badgeType: 'python' | 'pm' | 'ai' | 'meta' | 'data';
}

export interface Education {
  institution: string;
  degree: string;
  location: string;
  period: string;
}

export interface TerminalCommandResponse {
  type: 'text' | 'html' | 'error' | 'clear' | 'matrix';
  content: string;
}
