import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    category: 'Web Design & Development',
    idea: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    
    // This is your live Formspree endpoint
    const FORM_ENDPOINT = 'https://formspree.io/f/mzzayzyg';

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('sent');
        setFormData({
          name: '',
          phone: '',
          email: '',
          category: 'Web Design & Development',
          idea: ''
        });
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <section className="contact" id="contact">
      <div className="container">
        <div className="section-header">
          <h2>Get In <span className="text-gradient">Touch</span></h2>
          <p>Have a project in mind or questions about our services? We'd love to hear from you. Fill out the form below and we'll get back to you.</p>
        </div>
        <div className="contact-container">
          <div className="contact-info">
            <h3>Contact Information</h3>
            <p>We'd love to hear from you! Please reach out to us directly using the phone number or email address listed below, or connect with us on Instagram or LinkedIn for any inquiries or project discussions.</p>
            <div className="contact-details">
              <div className="contact-item">
                <div className="contact-icon" aria-hidden="true">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div className="contact-text">
                  <h4>Location</h4>
                  <p> Mackkinaickenpatti (Post), Udumalai Road, Pollachi-642003, Coimbatore, Tamil Nadu</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon" aria-hidden="true">
                  <i className="fas fa-envelope"></i>
                </div>
                <div className="contact-text">
                  <h4>Email</h4>
                  <p><a href="mailto:divcreator31@gmail.com" style={{ color: 'var(--gray)', textDecoration: 'none' }}>divcreator31@gmail.com</a></p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon" aria-hidden="true">
                  <i className="fas fa-phone-alt"></i>
                </div>
                <div className="contact-text">
                  <h4>Phone</h4>
                  <p><a href="tel:+917548835268" style={{ color: 'var(--gray)', textDecoration: 'none' }}>+91 7548835268</a></p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon" aria-hidden="true">
                  <i className="fab fa-instagram"></i>
                </div>
                <div className="contact-text">
                  <h4>Instagram</h4>
                  <p><a href="https://www.instagram.com/div_creator?igsh=bnZ1bWVmcnF6dHRm" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gray)', textDecoration: 'none' }}>Follow us on Instagram</a></p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon" aria-hidden="true">
                  <i className="fab fa-linkedin-in"></i>
                </div>
                <div className="contact-text">
                  <h4>LinkedIn</h4>
                  <p><a href="https://www.linkedin.com/in/div-creator-b18a92382/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gray)', textDecoration: 'none' }}>Connect on LinkedIn</a></p>
                </div>
              </div>
            </div>
          </div>
          <div className="contact-form">
             <form onSubmit={handleSubmit} aria-labelledby="contact-form-heading">
                <h3 id="contact-form-heading" className="sr-only">Contact Form</h3>
                <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input type="text" id="name" name="name" className="form-control" placeholder="John Doe" required value={formData.name} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email" name="email" className="form-control" placeholder="you@example.com" required value={formData.email} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input type="tel" id="phone" name="phone" className="form-control" placeholder="+91 12345 67890" required value={formData.phone} onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="category">Which service are you interested in?</label>
                    <select id="category" name="category" className="form-control" required value={formData.category} onChange={handleChange}>
                        <option>Web Design & Development</option>
                        <option>Cybersecurity Services</option>
                        <option>Student Project Assistance</option>
                        <option>Video Editing & Photography</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="idea">Explain your ideas</label>
                    <textarea id="idea" name="idea" className="form-control" placeholder="Describe your project requirements or question here..." required value={formData.idea} onChange={handleChange}></textarea>
                </div>
                <button type="submit" className="btn" disabled={status === 'sending'}>
                  {status === 'sending' ? (
                    <>
                      <i className="fas fa-spinner fa-spin" aria-hidden="true"></i> Sending...
                    </>
                  ) : 'Send Message'}
                </button>
                 {status === 'sent' && (
                  <div className="form-success-message">
                    <p>
                      Thank you! Your message has been sent successfully. We will get back to you shortly.
                    </p>
                  </div>
                )}
                {status === 'error' && (
                    <div className="form-error-message">
                        <p>
                            Oops! Something went wrong. Please try again later or contact us directly via email.
                        </p>
                    </div>
                )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;