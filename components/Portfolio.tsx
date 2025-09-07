import React, { useEffect, useRef } from 'react';

// Inform TypeScript about the global Swiper & GSAP objects from CDN
declare var Swiper: any;
declare var gsap: any;
declare var ScrollTrigger: any;

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

const portfolioData: PortfolioItem[] = [
  {
    id: '1',
    title: 'AI Nexus',
    description: 'An intelligent e-commerce interface that adapts to user behavior with AI-driven recommendations, dynamic product displays, and seamless mobile-first design.',
    imageUrl: '/divcreator/components/video/1.png',
  },
  {
    id: '2',
    title: 'Alex Carter CyberShield',
    description: 'An advanced cybersecurity dashboard for real-time threat analysis, penetration test reporting, and live vulnerability detection with an intuitive UI.',
    imageUrl: '/divcreator/components/video/2.png',
  },
  {
    id: '3',
    title: 'Decoding Human Physiology Through Data',
    description: 'A responsive web platform that visualizes complex human physiological data in real-time using interactive dashboards and modern frontend frameworks.',
    imageUrl: '/divcreator/components/video/3.png',
  }
];


const Portfolio: React.FC = () => {
  const swiperInstanceRef = useRef<any>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Scroll-triggered animation for the section
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

    // Swiper initialization
    if (typeof Swiper !== 'undefined') {
      swiperInstanceRef.current = new Swiper('.portfolio-swiper-container', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        loop: true,
        slidesPerView: 'auto',
        coverflowEffect: {
          rotate: 40,
          stretch: 0,
          depth: 150,
          modifier: 1,
          slideShadows: true,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
    } else {
      console.error('Swiper is not loaded. Ensure the Swiper JS and CSS files are included in your HTML.');
    }

    return () => {
      if (swiperInstanceRef.current && typeof swiperInstanceRef.current.destroy === 'function') {
        swiperInstanceRef.current.destroy(true, true);
        swiperInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="portfolio animate-on-scroll" id="portfolio">
      <div className="container">
        <div className="section-header">
          <h2>Our <span className="text-gradient">Portfolio</span></h2>
          <p>Explore a curated selection of our best work. Swipe through our project showcases to see the quality and creativity we bring to every solution.</p>
        </div>
        
        <div className="swiper-container portfolio-swiper-container">
          <div className="swiper-wrapper">
            {portfolioData.map((item) => (
              <div className="swiper-slide" key={item.id}>
                <div className="portfolio-item-card">
                  <div className="portfolio-media-wrapper">
                    <img
                      src={item.imageUrl}
                      alt={`${item.title} project showcase`}
                      loading="lazy"
                    />
                  </div>
                  <div className="portfolio-item-content">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="swiper-pagination"></div>
          
          <div className="swiper-button-prev" role="button" aria-label="Previous slide"></div>
          <div className="swiper-button-next" role="button" aria-label="Next slide"></div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;