"use client";

import Loader from "./components/loader/loader";
import ScrollVideo from "./components/ScrollVideo/ScrollVideo";
import CursorGlow from "./components/cursorglow/cursorglow";
import Cursor from "./components/cursor/cursor";

import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/hero/Hero";
import About from "./components/About/About";
import Portfolio from "./components/Portfolio/Portfolio";
import Services from "./components/Services/Services";
import Contact from "./components/Contact/Contact";

export default function Home() {
  return (
    <>
      {/* Loader */}
      <Loader />

      {/* Vidéo de fond */}
      <ScrollVideo />

      {/* Effets visuels */}
      <CursorGlow />
      <Cursor />

      {/* Navigation */}
      <Navbar />

      {/* Contenu */}
      <main>
        <Hero />
        <About />
        <Portfolio />
        <Services />
        <Contact />
      </main>
    </>
  );
}