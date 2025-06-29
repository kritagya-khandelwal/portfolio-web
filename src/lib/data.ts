import portfolioData from '@/data/portfolio.json';
import { PersonalInfo, Service, Project, Blog } from '@/types/portfolio';

export function getPersonalInfo(): PersonalInfo {
  return portfolioData.personal;
}

export function getServices(): Service[] {
  return portfolioData.services;
}

export function getProjects(): Project[] {
  return portfolioData.projects;
}

export function getBlogs(): Blog[] {
  return portfolioData.blogs;
}

export function getProjectById(id: string) {
  return getProjects().find(project => project.id === id);
}

export function getFeaturedProjects() {
  return getProjects().filter(project => project.featured);
}

export function getProjectsByCategory(category: string) {
  return getProjects().filter(project => project.category === category);
} 