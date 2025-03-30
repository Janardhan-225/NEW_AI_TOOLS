import React from 'react'
import 'animate.css';
import './About.css';

const About = () =>  {
    return (
      <div className='about-container'>
      <div className="about-container">
        <div className="about-grid">
          <div className="about-content animate__animated animate__fadeInLeft">
            <h2 className="about-title">
              About Our AI Tools Platform
            </h2>
            <p className="about-description">
              We're revolutionizing how people discover and integrate AI tools. Our platform automatically detects and catalogs new AI technologies as they emerge, ensuring you always have access to the latest innovations.
            </p>
            
            <div className="features-list">
              <FeatureItem 
                iconPath="M13 10V3L4 14h7v7l9-11h-7z"
                title="Automatic Detection"
                description="Our AI-powered system continuously scans and identifies new tools across the internet."
              />
              <FeatureItem 
                iconPath="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                title="Quality Verification"
                description="Each tool undergoes thorough verification to ensure reliability and usefulness."
              />
              <FeatureItem 
                iconPath="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                title="Smart Integration"
                description="Seamless integration with existing workflows and automated categorization."
              />
            </div>
          </div>
  
          <div className="stats-container animate__animated animate__fadeInRight">
            <div className="stats-box">
              <div className="stats-item">
                <div className="stats-number">500+</div>
                <p className="stats-label">AI Tools Listed</p>
              </div>
              
              <hr className="stats-divider"/>
              
              <div className="stats-item">
                <div className="stats-number">50k+</div>
                <p className="stats-label">Monthly Users</p>
              </div>
              
              <hr className="stats-divider"/>
              
              <div className="stats-item">
                <div className="stats-number">24/7</div>
                <p className="stats-label">Automatic Updates</p>
              </div>
  
              <div className="contact-button-container">
                <a href="#contact" className="contact-button">
                  Contact Us
                </a>
                
              </div>
            </div>
          </div>
          
        </div>
      </div>  
      </div>
      
    );
  };
  
  const FeatureItem = ({ iconPath, title, description }) => (
    <div className="feature-item">
      <div className="feature-icon-container">
        <svg className="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={iconPath} />
        </svg>
      </div>
      <div className="feature-text">
        <h3 className="feature-title">{title}</h3>
        <p className="feature-description">{description}</p>
      </div>
    </div>
  );

export default About;
  
