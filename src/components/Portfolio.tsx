import React, { useEffect, useRef } from 'react';
import img1 from './video/1.png';
import img2 from './video/2.png';

// Inform TypeScript about the global Swiper & GSAP objects from CDN
declare var Swiper: any;
declare var gsap: any;
declare var ScrollTrigger: any;

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

const portfolioData: PortfolioItem[] = [
  {
    id: '1',
    title: 'High-Conversion Landing Page',
    description: 'A premium landing page designed for luxury brands like coffee roasteries or watch collections, featuring glassmorphism navigation, a dynamic typing hero section, scroll-based animations (AOS), a custom product slider with Swiper.js, and a real email capture system using EmailJS. Optimized with .webp assets for ultra-fast performance and maximum user conversion.',
    imageUrl: img1,
    link: 'https://dhivagar2007.github.io/Projects-/',
  },
  {
    id: '2',
    title: 'Digital Menu Web App',
    description: 'A modern digital menu solution for cafes and food businesses with real-time search filtering, multi-category selection, and an interactive frontend cart with local storage persistence. Built with a responsive grid system and integrated WhatsApp ordering for seamless customer experience.',
    imageUrl: img2,
    link: 'https://dhivagar2007.github.io/brewtopia/',
  }
];

// Duplicate data to ensure smooth infinite loop (Swiper needs enough slides)
const displayData = [...portfolioData, ...portfolioData].map((item, index) => ({
  ...item,
  uniqueId: `${item.id}-${index}` // Ensure unique keys for React
}));


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
          slideShadows: false,
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
            {displayData.map((item) => (
              <div className="swiper-slide" key={item.uniqueId}>
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="portfolio-item-card" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
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
                </a>
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