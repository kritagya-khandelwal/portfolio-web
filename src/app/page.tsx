import Header from '@/components/layout/Header';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import About from '@/components/sections/About';
import Portfolio from '@/components/sections/Portfolio';
import Certificates from '@/components/sections/Certificates';
import Blogs from '@/components/sections/Blogs';
import Footer from '@/components/layout/Footer';
import ChatWidget from '@/components/features/ChatWidget';
import FloatingSocialLinks from '@/components/ui/FloatingSocialLinks';

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Header />
      <Hero />
      <Services />
      <About />
      <Portfolio />
      <Certificates />
      <Blogs />
      <Footer />
      <ChatWidget />
      <FloatingSocialLinks />
    </main>
  );
}
