import { About } from "@/components/About";
import { Academic } from "@/components/Academic";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { TopBar } from "@/components/TopBar";
import { Projects } from "@/components/Projects";
import { Research } from "@/components/Research";
import { Skills } from "@/components/Skills";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <div className="noise" aria-hidden="true" />
      <TopBar />
      <Navbar />
      <Hero />
      <About />
      <Academic />
      <Research />
      <Experience />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
    </main>
  );
}
