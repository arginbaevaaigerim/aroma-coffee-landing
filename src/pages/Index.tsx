import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Menu } from "@/components/Menu";
import { Gallery } from "@/components/Gallery";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { MenuChatbot } from "@/components/MenuChatbot";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Menu />
        <Gallery />
        <Contact />
      </main>
      <Footer />
      <MenuChatbot />
    </div>
  );
};

export default Index;
