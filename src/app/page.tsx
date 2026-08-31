import { Navbar } from '@/components/ui/Navbar';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { ProductPreview } from '@/components/sections/ProductPreview';
import { WhyChooseUs } from '@/components/sections/WhyChooseUs';
import { Founders } from '@/components/sections/Founders';
import { EarlyAccess } from '@/components/sections/EarlyAccess';
import { FAQ } from '@/components/sections/FAQ';
import { Footer } from '@/components/sections/Footer';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#fffcf5]">
      <Navbar />
      <Hero />
      <About />
      <ProductPreview />
      <WhyChooseUs />
      <Founders />
      <EarlyAccess />
      <FAQ />
      <Footer />
    </main>
  );
}
