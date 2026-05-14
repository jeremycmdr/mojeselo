import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer-top">
        <div className="footer-column">
          <h4>O NAMA</h4>
          <ul>
            <li><a href="#">misija</a></li>
            <li><a href="#">kontakt</a></li>
          </ul>
        </div>
        
        <div className="footer-column">
          <h4>USLUGE</h4>
          <ul>
            <li><a href="#">kupci</a></li>
            <li><a href="#">proizvođači</a></li>
            <li><a href="#">turizam</a></li>
          </ul>
        </div>
        
        <div className="footer-column">
          <h4>RESURSI</h4>
          <ul>
            <li><a href="#">blog</a></li>
            <li><a href="#">recepti</a></li>
            <li><a href="#">organski vodič</a></li>
          </ul>
        </div>
        
        <div className="footer-column">
          <h4>Pravna Pitanja</h4>
          <ul>
            <li><a href="#">uslovi</a></li>
            <li><a href="#">privatnost</a></li>
          </ul>
        </div>
        
        <div className="footer-newsletter">
          <h4>Prijavi se na newsletter</h4>
          <form className="newsletter-form">
            <input type="email" placeholder="Prijavi se na..." />
            <button type="submit" className="newsletter-btn">➤</button>
          </form>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="social-icons">
          <a href="#"><span>FB</span></a>
          <a href="#"><span>IG</span></a>
          <a href="#"><span>YT</span></a>
        </div>
        
        <div className="footer-links">
          <a href="#">Pomoć</a>
          <a href="#">Uslovi Prodavanja</a>
          <a href="#">Kontakt</a>
        </div>
        
        <div className="payment-icons">
          <span>VISA</span>
          <span>MASTERCARD</span>
        </div>
      </div>
      
      <div className="footer-copyright">
        SeloMoje.ba - Sva prava zadržana 2024
      </div>
    </footer>
  );
};

export default Footer;
