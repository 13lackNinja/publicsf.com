// NewsletterSignUp
// Adds htmlForm submision to ticketfly email list.

import React from 'react'

import './styles/NewsletterSignUp.css'

const NewsletterSignUp = () => (
  <div id="newsletter-sign-up">
    <div id="mc_embed_signup">
      <form action="https://publicsf.us3.list-manage.com/subscribe/post?u=3b0bc3dbf838dd9d8ef88a9b3&amp;id=4361bb0396" method="post" id="mc-embedded-subscribe-htmlForm" name="mc-embedded-subscribe-htmlForm" className="validate" target="_blank" noValidate>
        <div id="mc_embed_signup_scroll">
	        <label htmlFor="mce-EMAIL">Join The Ranks</label>
          <h2>Stay in the loop with our weekly newsletter</h2>
	        <input type="email" name="EMAIL" className="email" id="mce-EMAIL" placeholder="email address" required/>
          <div style={{position: "absolute", left: "-5000px"}} aria-hidden="true">
            <input type="text" name="b_3b0bc3dbf838dd9d8ef88a9b3_4361bb0396" tabIndex="-1"/>
          </div>
          <div className="clear">
            <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" className="button"/>
          </div>
        </div>
      </form>
    </div>
  </div>
);

export default NewsletterSignUp
