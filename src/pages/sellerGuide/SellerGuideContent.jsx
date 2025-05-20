import React from "react";
import { new_buyer } from "../../assets/images";

function SellerGuideContent({ innerRef }) {
  return (
    <>
      <section className="content_area" ref={innerRef}>
        <div className="container">
          <div className="guide_mini2">
            <div className="row align-items-center">
              <div className="col-lg-12">
                <h3>
                  <b>Seller’s Guide</b>
                </h3>
                <hr />
                <div className="but_dd">
                  <p>
                    Selling a property can be challenging, but this guide will
                    help you navigate the process smoothly in Dubai! Remember to
                    always follow the rules set by the Dubai Land Department.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="row justify-content-center ">
            <div className="col-lg-5">
              <img
                src={new_buyer}
                className="img-fluid border_round"
              />
            </div>
            <div className="col-lg-7">
              <div className="serb_box_data">
                <p>
                  <b>Prepare Your Documents</b>
                  <br />
                  Ensure that your title deed is readily available, as this is
                  essential for selling your property.
                </p>
                <p>
                  <b>Find a Reputable Brokerage Company</b> <br />
                  Choose a reliable real estate agency to handle the sale. They
                  have the resources to advertise your property across multiple
                  platforms, helping you sell it quickly. Verify their
                  legitimacy by requesting their trade license, ORN (Office
                  Registration Number), and BRN (Broker Registration Number).{" "}
                </p>
                <p>
                  <b>Draft a Clear Contract</b>
                  <br />
                  Whether you choose an exclusive or non-exclusive agreement,
                  ensure that your contract includes all necessary details,
                  particularly the commission structure. This clarity will help
                  avoid misunderstandings later on.
                </p>
                <p>
                  <b>Photoshoot and Property Viewing</b> <br />
                  Your real estate agent will likely arrange a professional
                  photoshoot for marketing purposes. Make sure your property is
                  in great condition and "Instagram-ready" for potential buyers
                  to view{" "}
                </p>
                <p>
                  <b>Trust Your Real Estate Agent</b>
                  <br />
                  Ultimately, it’s the real estate agent's expertise that will
                  help sell your property. Rely on their knowledge and
                  experience throughout the process.{" "}
                </p>
                <a href="#" className="action_btn">
                  Download Brochure
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SellerGuideContent;
