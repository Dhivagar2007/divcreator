
import React from 'react';

interface BackToTopButtonProps {
  isActive: boolean;
}

const BackToTopButton: React.FC<BackToTopButtonProps> = ({ isActive }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      className={`back-to-top ${isActive ? 'active' : ''}`}
      id="backToTop"
      onClick={scrollToTop}
      title="Back to Top"
      aria-label="Back to Top"
    >
      <i className="fas fa-arrow-up" aria-hidden="true"></i>
    </button>
  );
};

export default BackToTopButton;
