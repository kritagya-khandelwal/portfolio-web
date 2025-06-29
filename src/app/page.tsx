import Header from '@/components/layout/Header';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import About from '@/components/sections/About';
import Portfolio from '@/components/sections/Portfolio';
import Blogs from '@/components/sections/Blogs';
import Footer from '@/components/layout/Footer';
import ChatWidget from '@/components/features/ChatWidget';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Services />
      <About />
      <Portfolio />
      <Blogs />
      <Footer />
      <ChatWidget />
    </main>
  );
}
