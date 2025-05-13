import React from 'react'

const ContactGetIntouch = () => {
  return (
    <>
      <div className="col-lg-6 p-0 gey_color">
        <div className="contact_form">
          <h3>Get in touch</h3>
          <div className="fm_gp">
            <input type="text" className="box" id="get_first_name" name="name" placeholder="First Name*" required />
          </div>
          <div className="fm_gp">
            <input type="email" className="box" id="get_user_email" name="email" placeholder="Email*" required />
          </div>
          <div className="fm_gp">
            <input type="text" className="box onlyInteger" maxLength={10} id="get_phone" name="phone" placeholder="Phone*" required />
          </div>
          <div className="fm_gp">
            <input name="get_subject" id="get_subject" type="text" className="box" placeholder="Subject" />
          </div>
          <div className="fm_gp">
            <textarea className="box2" id="get_message" name="message" placeholder="What’s on your mind?*" required defaultValue={""} />
          </div>
          <div className=" mt-3">
            <button className="action_btn">Submit</button> 
          </div>
        </div>
      </div>
    </>
  )
}

export default ContactGetIntouch