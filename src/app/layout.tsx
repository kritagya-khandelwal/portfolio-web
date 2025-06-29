import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Kritagya Khandelwal - Software Engineer",
  description: "Senior Software Engineer at Yubi. Experienced in Backend Development, AI, Frontend Development, Mobile Development, and 3D Game Development.",
  keywords: ["Software Engineer", "Backend Development", "AI", "React", "Java", "Python", "Portfolio"],
  authors: [{ name: "Kritagya Khandelwal" }],
  creator: "Kritagya Khandelwal",
  openGraph: {
    title: "Kritagya Khandelwal - Software Engineer",
    description: "Senior Software Engineer at Yubi. Experienced in Backend Development, AI, Frontend Development, Mobile Development, and 3D Game Development.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kritagya Khandelwal - Software Engineer",
    description: "Senior Software Engineer at Yubi. Experienced in Backend Development, AI, Frontend Development, Mobile Development, and 3D Game Development.",
  },
  robots: {
    index: true,
    follow: true,
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
        {children}
      </body>
    </html>
  );
}
