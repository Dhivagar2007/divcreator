import React, { useEffect } from 'react';
import { Service } from './Services';

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: Service;
}

const ServiceModal: React.FC<ServiceModalProps> = ({ isOpen, onClose, service }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  if (!service) return null;

  return (
    <div
      className={`service-modal-overlay ${isOpen ? 'active' : ''}`}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-modal-title"
    >
      <div className="service-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close dialog">
          &times;
        </button>
        <h3 id="service-modal-title">{service.title}</h3>
        <ul>
          {service.details.map((detail, index) => (
            <li key={index}>{detail}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ServiceModal;
