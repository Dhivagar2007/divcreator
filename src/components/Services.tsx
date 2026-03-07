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
    title: 'Web Design & Development',
    icon: 'fas fa-code',
    shortDescription: 'We build high-performance, scalable websites that drive business growth and user engagement.',
    details: [
      'Custom Responsive Website Design',
      'Full-Stack Web Application Development',
      'E-Commerce Solutions (Shopify, WooCommerce, Custom)',
      'CMS Integration (WordPress, Strapi, Contentful)',
      'UI/UX Design & Prototyping',
      'Website Maintenance & Performance Optimization'
    ]
  },
  {
    title: 'Offensive Security & VAPT',
    icon: 'fas fa-user-secret',
    shortDescription: 'Expert-led manual penetration testing and SOC support by eJPT-certified freelance specialists.',
    details: [
      'Manual Vulnerability Assessment & Penetration Testing (VAPT)',
      'Advanced Web & Mobile App Logic Flaw Exploitation',
      'On-Demand SOC Support & Real-time Threat Monitoring',
      'API Security Audits & Secure Architecture Reviews',
      'Manual Secure Code Review & Developer Remediation',
      'Compliance-Ready Reporting for Startups & B2B SaaS'
    ]
  },
  {
    title: 'Academic Project Guidance',
    icon: 'fas fa-graduation-cap',
    shortDescription: 'Expert mentorship for students to architect, build, and document successful technical projects.',
    details: [
      'End-to-End Project Development Support',
      'Code Logic Explanation & Mentorship',
      'Thesis & Technical Documentation Support',
      'Project Deployment & Presentation Coaching',
      'Viva Voce & Mock Assessment Preparation',
      'Technology Stack Consultation'
    ]
  },
  {
    title: 'Brand Identity & Social Media',
    icon: 'fas fa-camera-retro',
    shortDescription: 'Build a powerful online presence with our branding, photography, and full-service social media management.',
    details: [
      'Social Media Management (Instagram, Facebook)',
      'Creative Post Design & Content Strategy',
      'Corporate Event Photography & Videography',
      'Brand Identity, Logos & Visual Assets',
      'Product Showreels & Commercial Ads',
      'Professional Video Editing & Color Grading'
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
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(service); } }}
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
