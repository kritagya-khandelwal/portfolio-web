import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Head from 'next/head';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

/**
 * SEO & Social Sharing Improvements
 * - Use absolute URLs for images
 * - Add og:image:width/height
 * - Ensure all OG/Twitter tags are present and correct
 * - Add themeColor and favicon meta tags
 */

export const metadata: Metadata = {
  title: "Kritagya Khandelwal - Software Engineer",
  description: "Senior Software Engineer at Yubi. Experienced in Backend Development, AI, Frontend Development, Mobile Development, and 3D Game Development. View my portfolio, projects, and technical expertise.",
  keywords: [
    "Software Engineer", 
    "Backend Development", 
    "AI", 
    "React", 
    "Java", 
    "Python", 
    "Portfolio",
    "Full Stack Developer",
    "Microservices",
    "GraphQL",
    "MongoDB",
    "Spring Boot",
    "FastAPI",
    "Machine Learning",
    "Neural Networks"
  ],
  authors: [{ name: "Kritagya Khandelwal" }],
  creator: "Kritagya Khandelwal",
  publisher: "Kritagya Khandelwal",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://kritagya.dev'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Kritagya Khandelwal - Software Engineer Portfolio",
    description: "Senior Software Engineer at Yubi. Experienced in Backend Development, AI, Frontend Development, Mobile Development, and 3D Game Development. View my portfolio, projects, and technical expertise.",
    url: 'https://kritagya.dev',
    siteName: 'Kritagya Khandelwal Portfolio',
    images: [
      {
        url: 'https://kritagya.dev/img/my_ghibily_profile.png',
        width: 1200,
        height: 630,
        alt: 'Kritagya Khandelwal - Software Engineer, Backend, AI, Portfolio',
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kritagya Khandelwal - Software Engineer Portfolio",
    description: "Senior Software Engineer at Yubi. Experienced in Backend Development, AI, Frontend Development, Mobile Development, and 3D Game Development.",
    creator: "@erraticwonderer",
    images: ['https://kritagya.dev/img/my_ghibily_profile.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  themeColor: '#f59e0b',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <Head>
        <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Kritagya Khandelwal',
          url: 'https://kritagya.dev',
          image: 'https://kritagya.dev/img/my_ghibily_profile.png',
          sameAs: [
            'https://www.linkedin.com/in/kritagyakhandelwal/',
            'https://github.com/erratic-wonderer',
            'https://twitter.com/erraticwonderer',
          ],
          jobTitle: 'Senior Software Engineer',
          worksFor: {
            '@type': 'Organization',
            name: 'Yubi',
          },
          description: 'Senior Software Engineer at Yubi. Experienced in Backend Development, AI, Frontend Development, Mobile Development, and 3D Game Development.'
        }) }} />
        <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          url: 'https://kritagya.dev',
          name: 'Kritagya Khandelwal Portfolio',
          description: 'Portfolio of Kritagya Khandelwal, Senior Software Engineer at Yubi, specializing in Backend, AI, and Full Stack Development.'
        }) }} />
      </Head>
      <body className="antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
