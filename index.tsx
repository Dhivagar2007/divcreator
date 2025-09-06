
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Process from './components/Process';
import Portfolio from './components/Portfolio'; // Added import
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTopButton from './components/BackToTopButton';

function App() {
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsHeaderScrolled(true);
      } else {
        setIsHeaderScrolled(false);
      }

      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Cleanup event listener on component unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to section
  useEffect(() => {
    const smoothScrollHandler = (event: MouseEvent) => {
      const target = event.target as HTMLAnchorElement;
      if (target.matches('a[href^="#"]') && target.hash !== "") {
        event.preventDefault();
        const elementId = target.hash.substring(1);
        const element = document.getElementById(elementId);
        if (element) {
          const headerOffset = 80; // Adjust based on your fixed header's height
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }
    };

    document.addEventListener('click', smoothScrollHandler);
    return () => {
      document.removeEventListener('click', smoothScrollHandler);
    };
  }, []);


  return (
    <>
      <Header isScrolled={isHeaderScrolled} />
      <main>
        <Hero />
        <About />
        <Services />
        <Process />
        <Portfolio /> {/* Added Portfolio section */}
        <Contact />
      </main>
      <Footer />
      <BackToTopButton isActive={showBackToTop} />
    </>
  );
}

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error('Failed to find the root element');
}