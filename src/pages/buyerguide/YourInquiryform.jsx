import React from 'react'

const YourInquiryform = () => {
  return (
  <>
   <div className="col-lg-4">
        <div className="serb_gude">
          <div className="home_form">
            <h2>Submit Your Inquiry</h2>
            <hr />
            <div className="row">
              <div className="form-group">
                <input type="text" id="full_name" name="full_name"  placeholder="Full Name" />
              </div>
              <div className="form-group">
                <input type="text" id="email" name="email"  placeholder="Email" />
              </div>
              <div className="form-group">
                <input type="text" id="city" name="city"  placeholder="City" />
              </div>
              <div className="form-group">
                <input type="text" id="post_code" name="post_code"  placeholder="Post Code" />
              </div>
              <div className="form-group">
                <textarea type="text" id="message" name="message"  placeholder="Write Your Message Here"  />
              </div>
              <div className="form_group1">
                <input type="submit" className="action_btn" onclick="homepage_form()" defaultValue="Submit" />
              </div>
            </div>
          </div>
        </div>
      </div>
  </>
  )
}

export default YourInquiryform