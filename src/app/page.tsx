import HeaderWrapper from '@/components/layout/HeaderWrapper';
import HeroWrapper from '@/components/sections/HeroWrapper';
import ServicesWrapper from '@/components/sections/ServicesWrapper';
import About from '@/components/sections/About';
import PortfolioWrapper from '@/components/sections/PortfolioWrapper';
import Certificates from '@/components/sections/Certificates';
import BlogsWrapper from '@/components/sections/BlogsWrapper';
import Footer from '@/components/layout/Footer';
import ChatWidget from '@/components/features/ChatWidget';
import FloatingSocialLinksWrapper from '@/components/ui/FloatingSocialLinksWrapper';
import dynamic from 'next/dynamic';

const DeveloperConsole = dynamic(() => import('@/components/ui/DeveloperConsole'), { ssr: false });

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <HeaderWrapper />
      <HeroWrapper />
      <ServicesWrapper />
      <About />
      <PortfolioWrapper />
      <Certificates />
      <BlogsWrapper />
      <Footer />
      <ChatWidget />
      <FloatingSocialLinksWrapper />
      <DeveloperConsole />
    </main>
  );
}
