import React from 'react';
import ContactGetIntouch from './ContactGetIntouch';

const ContactMap = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          {/* Map Section */}
          <div className="col-lg-6 p-0">
            <div className="map_area">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.3979879896747!2d55.291205088855!3d25.257194000000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f436fc18e006b%3A0xaf8b1e801816ae32!2sProperty%20Finders!5e0!3m2!1sen!2sin!4v1745318226223!5m2!1sen!2sin"
                width="100%"
                height="620"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Map"
              ></iframe>
            </div>
          </div>

      
            <ContactGetIntouch />
        
        </div>
      </div>
    </>
  );
};

export default ContactMap;
