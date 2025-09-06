import React, { useState, useRef, useEffect } from 'react';
import ServiceModal from './ServiceModal';

// Inform TypeScript about the global GSAP objects from the CDN
declare var gsap: any;
declare var ScrollTrigger: any;


export interface Service {
  title: string;
  icon: string;
  shortDescription: string;
  details: string[];
}

const servicesData: Service[] = [
  {
    title: 'WEB DESIGN & DEVELOPMENT',
    icon: 'fas fa-code',
    shortDescription: 'Beautiful, functional websites that drive results and engage your audience.',
    details: [
      'Static Websites & Landing Pages',
      'Dynamic Web Applications',
      'E-Commerce & Online Stores',
      'Custom UI/UX Design',
      'Responsive & Mobile-First Layouts',
      'Content Management Systems (CMS)'
    ]
  },
  {
    title: 'CYBERSECURITY SERVICES',
    icon: 'fas fa-shield-alt',
    shortDescription: 'Protect your digital assets with our comprehensive security solutions.',
    details: [
      'Web Application Penetration Testing',
      'Comprehensive Vulnerability Assessments',
      'Security Audits & Detailed Reports',
      'Incident Response Planning',
      'Security Hardening & Consulting'
    ]
  },
  {
    title: 'STUDENT PROJECT ASSISTANCE',
    icon: 'fas fa-graduation-cap',
    shortDescription: 'Affordable help for students to complete projects successfully.',
    details: [
      'End-to-End Project Completion Support',
      'Full Source Code Delivery & Explanation',
      'Technical Report & Documentation Writing',
      'Project Hosting & Deployment Guidance',
      'Viva Voce (Oral Exam) Preparation',
      'In-depth Concept Explanation'
    ]
  },
  {
    title: 'VIDEO EDITING & PHOTOGRAPHY',
    icon: 'fas fa-camera-retro',
    shortDescription: 'Capturing moments and telling stories through high-quality visuals.',
    details: [
      'Event Coverage (Weddings, Corporate)',
      'Product Photography & Videography',
      'Professional Video Editing & Post-Production',
      'Portrait & Professional Headshot Sessions',
      'Aerial/Drone Videography & Photography',
      'Advanced Photo Retouching & Color Grading'
    ]
  }
];

const Services: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
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


  const openModal = (service: Service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Delay clearing the selected service to allow for fade-out animation
    setTimeout(() => setSelectedService(null), 300);
  };

  return (
    <>
      <section ref={sectionRef} className="services animate-on-scroll" id="services">
        <div className="container">
          <div className="section-header">
            <h2>Our <span className="text-gradient">Services</span></h2>
            <p>We offer comprehensive tech solutions tailored to your specific needs. Click on a service to see what's included.</p>
          </div>
          <div className="services-layout-container">
            <div className="services-illustration-wrapper" aria-hidden="true">
               <img 
                  src="https://cdn3d.iconscout.com/3d/premium/thumb/businessman-pointing-right-with-both-index-finger-7468591-6084652.png" 
                  alt="3D character pointing towards the services"
                  className="service-illustration-img"
                />
            </div>
            <div className="services-grid-wrapper">
              <div className="services-grid">
                {servicesData.map((service) => (
                  <div
                    key={service.title}
                    className="service-card"
                    onClick={() => openModal(service)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter') openModal(service); }}
                    aria-label={`Learn more about ${service.title}`}
                  >
                    <div className="service-icon">
                      <i className={service.icon} aria-hidden="true"></i>
                    </div>
                    <div className="service-content">
                      <h3>{service.title}</h3>
                      <p>{service.shortDescription}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {selectedService && (
        <ServiceModal
          isOpen={isModalOpen}
          onClose={closeModal}
          service={selectedService}
        />
      )}
    </>
  );
};

export default Services;