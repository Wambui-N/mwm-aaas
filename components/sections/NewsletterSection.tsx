"use client";

import React, { useEffect } from "react";

const mailerLiteCSS = `@import url('https://assets.mlcdn.com/fonts.css?version=1753253');
#mlb2-27423332.ml-form-embedContainer {
  background: transparent;
  border-radius: 0;
  box-shadow: none;
  padding: 0;
  max-width: 100%;
  margin: 0 auto;
}
#mlb2-27423332 .ml-form-embedWrapper {
  background: transparent;
  border: none;
  box-shadow: none;
}
#mlb2-27423332 h4 {
  font-size: 2.25rem;
  font-weight: 700;
  color: #000000;
  margin-bottom: 0.5rem;
  text-align: center;
  line-height: 1.1;
}
@media (max-width: 640px) {
  #mlb2-27423332 h4 {
    font-size: 1.5rem;
  }
}
#mlb2-27423332 p {
  color: #4b5563;
  font-size: 1rem;
  text-align: center;
}
#mlb2-27423332 .ml-form-formContent.horozintalForm {
  display: flex !important;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}
#mlb2-27423332 .ml-form-horizontalRow {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
}
#mlb2-27423332 .ml-input-horizontal {
  flex: 1 1 0%;
}
#mlb2-27423332 input[type="email"] {
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box;
}
#mlb2-27423332 .ml-button-horizontal.primary {
  flex-shrink: 0;
  display: flex;
  align-items: center;
}
#mlb2-27423332 button.primary {
  background: #000000;
  color: #fff;
  border-radius: 0.5rem;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  transition: background 0.2s;
  white-space: nowrap;
}
#mlb2-27423332 button.primary:hover {
  background: #1f2937;
}
@media (max-width: 640px) {
  #mlb2-27423332 .ml-form-formContent.horozintalForm, #mlb2-27423332 .ml-form-horizontalRow {
    flex-direction: column;
    gap: 0.5rem;
    align-items: stretch;
  }
  #mlb2-27423332 .ml-button-horizontal.primary {
    width: 100%;
    justify-content: center;
  }
}
`;

const mailerLiteHTML = `
<div id="mlb2-27423332" class="ml-form-embedContainer ml-subscribe-form ml-subscribe-form-27423332">
  <div class="ml-form-align-center ">
    <div class="ml-form-embedWrapper embedForm">
      <div class="ml-form-embedBody ml-form-embedBodyHorizontal row-form">
        <div class="ml-form-embedContent" style=" ">
          <h4 class= "text-3xl md:text-4xl font-display font-semibold text-black mb-6">Making It Make Sense Newsletter</h4>
          <p>Because you didn’t build a business just to become its busiest employee.<br></p>
          <p>Weekly automations, systems, and AI tips, for founders who value time, clarity, and momentum.</p>
        </div>
        <form class="ml-block-form" action="https://assets.mailerlite.com/jsonp/1316698/forms/157651152273409090/subscribe" data-code="" method="post" target="_blank">
          <div class="ml-form-formContent horozintalForm">
            <div class="ml-form-horizontalRow my-6">
              <div class="ml-input-horizontal">
                <div style="width: 100%;" class="horizontal-fields">
                  <div class="ml-field-group ml-field-email ml-validate-email ml-validate-required">
                    <input type="email" class="form-control" data-inputmask="" name="fields[email]" placeholder="Email" autocomplete="email" />
                  </div>
                </div>
              </div>
              <div class="ml-button-horizontal primary ">
                <button type="submit" class="primary">Subscribe</button>
                <button disabled="disabled" style="display: none;" type="button" class="loading">
                  <div class="ml-form-embedSubmitLoad"></div>
                  <span class="sr-only">Loading...</span>
                </button>
              </div>
            </div>
          </div>
          <input type="hidden" name="ml-submit" value="1" />
          <div class="ml-mobileButton-horizontal">
            
          </div>
          <input type="hidden" name="anticsrf" value="true" />
        </form>
      </div>
      <div class="ml-form-successBody row-success" style="display: none">
        <div class="ml-form-successContent">
          <h4>Thank you!</h4>
          <p>You have successfully joined our subscriber list.</p>
        </div>
      </div>
    </div>
  </div>
</div>
`;

export default function NewsletterSection() {
  useEffect(() => {
    // Inject MailerLite script
    if (!document.getElementById("ml-webforms-script")) {
      const script = document.createElement("script");
      script.id = "ml-webforms-script";
      script.src = "https://groot.mailerlite.com/js/w/webforms.min.js?v176e10baa5e7ed80d35ae235be3d5024";
      script.async = true;
      document.body.appendChild(script);
    }
    fetch("https://assets.mailerlite.com/jsonp/1316698/forms/157651152273409090/takel");
  }, []);

  return (
    <section id="newsletter" className="py-24 bg-gray-50">
      <style dangerouslySetInnerHTML={{ __html: mailerLiteCSS }} />
      <div dangerouslySetInnerHTML={{ __html: mailerLiteHTML }} />
    </section>
  );
}
