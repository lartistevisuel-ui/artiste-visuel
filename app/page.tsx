import Hero from "./components/hero/Hero";
import Marquee from "./components/Marquee/Marquee";
import About from "./components/About/About";
import Portfolio from "./components/Portfolio/Portfolio";
import Tagline from "./components/Tagline/Tagline";
import Services from "./components/Services/Services";
import Process from "./components/Process/Process";
import Contact from "./components/Contact/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <Marquee />
      <About />
      <Portfolio />
      <Tagline />
      <Services />
      <Process />
      <Contact />
    </main>
  );
}
