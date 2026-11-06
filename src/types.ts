export interface Project {
  id: string;
  artifactNumber: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  impact: string;
  techStack: string[];
  features: string[];
  architecture: string;
  imageUrl?: string;
  githubUrl?: string;
  liveDemoUrl?: string;
  accentColor: string;
  status: 'Production' | 'Active' | 'Completed';
}

export interface SkillCategory {
  id: string;
  title: string;
  color: string;
  description: string;
  skills: {
    name: string;
    level: number; // 1-100
    experience: string;
    description: string;
    tags: string[];
  }[];
}

export interface TimelineItem {
  period: string;
  role: string;
  organization: string;
  location: string;
  status: string;
  highlight: string;
  details: string[];
}

export interface TerminalLog {
  id: string;
  type: 'input' | 'output' | 'error' | 'system';
  content: string;
}
