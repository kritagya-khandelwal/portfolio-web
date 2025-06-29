export const config = {
  // Backend API Configuration
  backendUrl: process.env.BACKEND_URL || 'http://localhost:8000',
  
  // Site Configuration
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  
  // Contact Information
  contactEmail: process.env.CONTACT_EMAIL || 'kritagya.0398@gmail.com',
  
  // Analytics (optional)
  googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID,
  
  // Feature Flags
  features: {
    chat: true,
    analytics: !!process.env.NEXT_PUBLIC_GA_ID,
  }
}; 