import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

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
        url: '/img/my_ghibily_profile.png',
        width: 1200,
        height: 630,
        alt: 'Kritagya Khandelwal - Software Engineer Portfolio',
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
    images: ['/img/my_ghibily_profile.png'],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
