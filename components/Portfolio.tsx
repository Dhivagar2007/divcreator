import React, { useEffect, useRef } from 'react';

// Inform TypeScript about the global Swiper & GSAP objects from CDN
declare var Swiper: any;
declare var gsap: any;
declare var ScrollTrigger: any;

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  posterUrl?: string;
}

const portfolioData: PortfolioItem[] = [
  {
    id: '1',
    title: 'Decoding Human Physiology Through Data',
    description: 'A responsive web platform that visualizes complex human physiological data in real-time using interactive dashboards and modern frontend frameworks.',
    videoUrl: 'components/video/static.mp4',
  },
  {
    id: '2',
    title: 'AI Nexus',
    description: 'An intelligent e-commerce interface that adapts to user behavior with AI-driven recommendations, dynamic product displays, and seamless mobile-first design.',
    videoUrl: 'components/video/ai.mp4',
  },
  {
    id: '3',
    title: 'Alex Carter CyberShield',
    description: 'An advanced cybersecurity dashboard for real-time threat analysis, penetration test reporting, and live vulnerability detection with an intuitive UI.',
    videoUrl: 'components/video/dyna2-vid.mp4',
  },
   {
    id: '4',
    title: 'DevPort',
    description: 'A progressive portfolio builder for developers and freelancers, featuring drag-and-drop customization, animated project showcases, and integrated resume tools.',
    videoUrl: 'components/video/dynamic-vid.mp4',
  },

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
          <p>Interactive Video Portfolio — A horizontal, swipe-enabled reel of our best work. Scroll through immersive previews with smooth animations.</p>
        </div>
        
        <div className="swiper-container portfolio-swiper-container">
          <div className="swiper-wrapper">
            {portfolioData.map((item) => (
              <div className="swiper-slide" key={item.id}>
                <div className="portfolio-item-card">
                  <div className="portfolio-video-wrapper">
                    <video 
                      src={item.videoUrl} 
                      controls 
                      poster={item.posterUrl}
                      width="100%"
                      aria-label={`${item.title} video preview`}
                      preload="metadata" 
                    >
                      Your browser does not support the video tag.
                    </video>
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