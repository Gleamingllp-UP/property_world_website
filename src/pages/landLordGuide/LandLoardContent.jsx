import React from "react";
import { new_buyer } from "../../assets/images";

function LandLoardContent({ innerRef }) {
  return (
    <>
      <section className="content_area" ref={innerRef}>
        <div className="container">
          <div className="guide_mini2">
            <div className="row align-items-center">
              <div className="col-lg-12">
                <h3>
                  <b>Landlord Guide</b>
                </h3>
                <hr />
                <div className="but_dd">
                  <p>
                    As a landlord in Dubai, it’s essential to be aware of the
                    guidelines established by the Real Estate Regulatory
                    Authority (RERA). RERA has specific laws that outline the
                    roles and responsibilities of both tenants and landlords.
                    For more information, you can refer to the RERA Tenancy
                    Guide
                    <a
                      href="https://dubailand.gov.ae/media/051bem5a/tenancyguideen.pdf"
                      target="_blank"
                    >
                      tenancyguideen.pdf
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="row justify-content-center align-items-center">
            <div className="col-lg-5">
              <img src={new_buyer} className="img-fluid border_round" />
            </div>
            <div className="col-lg-7">
              <div className="serb_box_data">
                <p>
                  Owning property in Dubai is a dream for many. As a landlord,
                  you have the flexibility to choose how to lease your
                  property—whether on a long-term or short-term basis. However,
                  you will also be responsible for maintenance, contract
                  renewals, and other related tasks.
                </p>
                <p>
                  To alleviate this burden, consider hiring a reliable property
                  management team. They can manage leasing and building
                  operations on your behalf, ensuring everything runs smoothly.
                </p>
                <p>
                  Selecting the right property management team is crucial, as
                  they will represent you and your interests. Their actions and
                  decisions will reflect on you, so it’s important to choose a
                  team you trust.{" "}
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

export default LandLoardContent;
