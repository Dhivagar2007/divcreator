import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Process from './components/Process';
import Portfolio from './components/Portfolio';
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
    const smoothScrollHandler = (event: Event) => {
      const target = event.target as HTMLAnchorElement;
      
      // Check if the click came from a touch event (mobile) or mouse event
      const isTouchEvent = event.type === 'touchstart';
      const clickedElement = isTouchEvent 
        ? document.elementFromPoint((event as TouchEvent).touches[0].clientX, (event as TouchEvent).touches[0].clientY)
        : target;
      
      if (clickedElement && clickedElement.matches('a[href^="#"]') && (clickedElement as HTMLAnchorElement).hash !== "") {
        event.preventDefault();
        const elementId = (clickedElement as HTMLAnchorElement).hash.substring(1);
        const element = document.getElementById(elementId);
        
        if (element) {
          // Adjust header offset for mobile screens
          const isMobile = window.innerWidth <= 768;
          const headerOffset = isMobile ? 60 : 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }
    };

    // Add both mouse and touch event listeners
    document.addEventListener('click', smoothScrollHandler);
    document.addEventListener('touchstart', smoothScrollHandler);
    
    return () => {
      document.removeEventListener('click', smoothScrollHandler);
      document.removeEventListener('touchstart', smoothScrollHandler);
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
        <Portfolio />
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