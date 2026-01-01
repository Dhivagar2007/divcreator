import React, { useRef, useEffect } from 'react';

// Inform TypeScript about the global GSAP objects from the CDN
declare var gsap: any;
declare var ScrollTrigger: any;

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Ensure GSAP and ScrollTrigger are loaded before using them
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      
      if (sectionRef.current) {
        gsap.to(sectionRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%', // Animate when 85% of the element is in view
            toggleActions: 'play none none none',
          },
        });
      }
    }
  }, []);

  return (
    <section ref={sectionRef} className="about animate-on-scroll" id="about">
      <div className="container">
        <div className="about-container">
          <div className="about-img">
            <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" alt="A diverse team of young professionals collaborating around a table with laptops" />
          </div>
          <div className="about-content">
            <h2>About <span className="text-gradient">Us</span></h2>
            <p>Div Creator is a student-powered tech innovation agency offering web development, cybersecurity services, and academic project solutions — all at affordable, student-friendly pricing. We blend creative energy, technical expertise, and real-world problem-solving to build impactful digital experiences.</p>
            <p>Founded in 2025, Div Creator began as a collaboration among young technologists with a vision: to make high-quality digital services accessible to everyone — from startups to students. Today, we proudly operate as a full-service tech partner, delivering professional results without the premium price tag.</p>
            <div className="about-stats">
              <div className="stat-item">
                <div className="stat-number">100%</div>
                <div className="stat-label">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;