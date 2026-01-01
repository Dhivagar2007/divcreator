
import React, { useRef, useEffect } from 'react';

// Inform TypeScript about the global GSAP objects from the CDN
declare var gsap: any;
declare var ScrollTrigger: any;

const Process: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
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
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      }
    }
  }, []);


  return (
    <section ref={sectionRef} className="process animate-on-scroll" id="process">
      <div className="container">
        <div className="section-header">
          <h2>Our <span className="text-gradient">Process</span></h2>
          <p>We follow a structured approach to ensure quality and efficiency in every project we undertake.</p>
        </div>
        <div className="process-steps">
          <div className="step">
            <div className="step-number" aria-label="Step 1">1</div>
            <div className="step-content">
              <h4>Requirement Collection</h4>
              <p>We begin by listening. Through deep discovery calls or in-person meetings, we gather complete information about your business goals, target audience, project requirements, and vision. This helps us tailor a solution that aligns with your objectives.

</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number" aria-label="Step 2">2</div>
            <div className="step-content">
              <h4>Wireframe & Design</h4>
              <p>Before writing any code, we sketch wireframes and build interactive prototypes. These help visualize layout, user journeys, and core functionalities. After your approval, we craft pixel-perfect UI designs with modern UX practices that ensure intuitive user experiences.</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number" aria-label="Step 3">3</div>
            <div className="step-content">
              <h4>Development & Testing</h4>
              <p>Our development team brings the designs to life with clean, scalable code. We follow agile methodology, delivering in iterations with regular reviews. Each phase includes unit testing, integration testing, and responsive performance testing across devices and browsers.

</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number" aria-label="Step 4">4</div>
            <div className="step-content">
              <h4>Deployment & Delivery</h4>
              <p>After successful QA and final client approval, we deploy the website/app to production environments. We also offer training (if needed), handover complete documentation/source code, and provide optional ongoing maintenance & support.

</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;