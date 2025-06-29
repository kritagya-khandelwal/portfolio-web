export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  image: string;
  video?: string;
  pdf?: string;
  github?: string;
  live?: string;
  demo?: string;
  category: string;
  featured?: boolean;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  highlight?: boolean;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  description: string;
  technologies: string[];
  link?: string;
  type: string;
}

export interface Blog {
  id: string;
  title: string;
  description: string;
  url: string;
  platform: string;
  publishedDate: string;
  readTime?: string;
  tags: string[];
  featured?: boolean;
}

export interface Skill {
  category: string;
  technologies: string[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  about: string;
  email: string;
  phone?: string;
  location?: string;
  experience: Experience[];
  skills: Skill[];
  social: SocialLink[];
}

export interface PortfolioData {
  personal: PersonalInfo;
  services: Service[];
  projects: Project[];
} 