import React from 'react'
import TypeLogo from './TypeLogo.js'

import './styles/Footer.css'

import emailIcon from './images/email_icon.svg'
import facebookIcon from './images/facebook_icon.svg'
import instagramIcon from './images/instagram_icon.svg'
import twitterIcon from './images/twitter_icon.svg'

const Footer = () => (
  <div id="footer">
    <div className="footer-box" id="footer-about">
      <TypeLogo type="footer" />
      <p className="footer-text" id="footer-address">161 Erie St<br/>
      (Between 14th and Division) <br/>San Francisco, CA 94103</p>
    </div>
    <div className="footer-box" id="footer-nav">
      <h5 className="footer-title">Information</h5>
      <a className="footer-link" href="./connect">Connect</a>
      <br/>
      <a className="footer-link" href="./connect#faq">FAQ</a>
      <br/>
      <a className="footer-link" href="./connect#contact-form-section">Booking</a>
      <br/>
      <a className="footer-link" href="./specs">Specs</a>
    </div>
    <div className="footer-box" id="footer-socials">
      <h5 className="footer-title">Connect with us</h5>
      <div id="socials-flexbox">
        <a href="https://www.facebook.com/PublicWorksSF/">
          <img width="25px" className="social-icon" id="facebook-icon" src={facebookIcon} alt="facebook_icon.svg" />
        </a>
        <a href="https://twitter.com/publicworkssf?lang=en">
          <img width="25px" className="social-icon" id="twitter-icon" src={twitterIcon} alt="twitter_icon.svg" />
        </a>
        <a href="https://www.instagram.com/publicworkssf/?hl=en">
          <img width="25px" className="social-icon" id="instagram-icon" src={instagramIcon} alt="instagram_icon.svg" />
        </a>
        <a href="">
          <img width="25px" className="social-icon" id="email-icon" src={emailIcon} alt="email_icon.svg" />
        </a>

      </div>
    </div>
    <div id="footer-byline">
      <p id="copyright">PW &copy; 2018</p>
      <a className="by" href="http://rhomasormsby.com">Designed by Ryan Ormbsy</a><br/>
      <a className="by" href="https://jonathancrawford.us">Developed by Jonathan Crawford</a>
    </div>
  </div>
)

export default Footer
