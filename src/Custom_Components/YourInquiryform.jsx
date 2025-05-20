import React from "react";

const YourInquiryform = () => {
  return (
    <>
      <div className="serb_gude">
        <div className="home_form container">
          <h2>Submit Your Inquiry</h2>
          <hr />
          <div className="row align-items-center">
            <div className="col-lg-4">
              <div className="form-group">
                <input
                  type="text"
                  id="full_name"
                  name="full_name"
                  defaultValue=""
                  placeholder="Full Name"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  id="email"
                  name="email"
                  defaultValue=""
                  placeholder="Email"
                />
              </div>
            </div>
            <div className="col-lg-4">
              <div className="form-group">
                <input
                  type="text"
                  id="city"
                  name="city"
                  defaultValue=""
                  placeholder="City"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  id="post_code"
                  name="post_code"
                  defaultValue=""
                  placeholder="Post Code"
                />
              </div>
            </div>
            <div className="col-lg-4">
              <div className="form-group">
                <textarea
                  type="text"
                  id="message"
                  name="message"
                  value=""
                  placeholder="Write Your Message Here"
                  defaultValue={""}
                />
              </div>
            </div>
          </div>
          <div className="row align-items-center justify-content-center">
            <div className="col-lg-2">
              <div className="form_group1">
                <input
                  type="submit"
                  className="action_btn"
                  onclick="homepage_form()"
                  defaultValue="Submit"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default YourInquiryform;
