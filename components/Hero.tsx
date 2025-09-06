import React, { useState, useEffect, useRef } from 'react';

const slidesData = [
  { id: 1, className: 'slide-1' },
  { id: 2, className: 'slide-2' },
  { id: 3, className: 'slide-3' },
];

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const floatingElementsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slidesData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const container = floatingElementsRef.current;
    if (container) {
      // Clear previous elements if any (e.g., during hot module replacement)
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
      for (let i = 0; i < 15; i++) {
        const element = document.createElement('div');
        element.classList.add('floating-element');
        
        const size = Math.random() * 15 + 5;
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        element.style.left = `${Math.random() * 100}%`;
        element.style.top = `${Math.random() * 100}%`;
        element.style.animationDuration = `${Math.random() * 15 + 10}s`;
        element.style.animationDelay = `${Math.random() * 5}s`;
        
        container.appendChild(element);
      }
    }
  }, []);


  return (
    <section className="hero" id="home">
      <div className="hero-slider">
        {slidesData.map((slide, index) => (
          <div
            key={slide.id}
            className={`slide ${slide.className} ${index === currentSlide ? 'active' : ''}`}
            aria-hidden={index !== currentSlide}
          ></div>
        ))}
      </div>
      <div className="hero-overlay"></div>
      <div className="floating-elements" id="floatingElements" ref={floatingElementsRef}></div>
      <div className="container">
        <div className="hero-content">
          <h1>Div Creator: <span className="text-gradient">Tech Solutions</span> For The Future</h1>
          <p>We specialize in web development, cybersecurity, and student project assistance, delivering powerful results through cutting-edge technology, creative design, and affordable solutions tailored to your needs.
</p>
          <div className="hero-btns">
            <a href="#services" className="btn">Our Services</a>
            <a href="#contact" className="btn btn-outline">Get Started</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;