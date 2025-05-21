import React from "react";
import { new_buyer } from "../../assets/images";

function TenantContent({ innerRef }) {
  return (
    <>
      <section className="content_area" ref={innerRef}>
        <div className="container">
          <div className="guide_mini2">
            <div className="row align-items-center">
              <div className="col-lg-12">
                <h3>
                  <b>Tenant Guide</b>
                </h3>
                <hr />
                <div className="but_dd">
                  <p>
                    Dubai is home to many expats, and while some have the luxury
                    of purchasing property, most people opt to rent. This guide
                    will help you navigate the process of finding a rental
                    property in Dubai.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="row justify-content-center align-items-center">
            <div className="col-lg-5">
              <img
                src={new_buyer}
                className="img-fluid border_round"
              />
            </div>
            <div className="col-lg-7">
              <div className="serb_box_data">
                <p>
                  Dubai is home to many expats, and while some have the luxury
                  of purchasing property, most people opt to rent. This guide
                  will help you navigate the process of finding a rental
                  property in Dubai.{" "}
                </p>
                <p>
                  <b>Know Your Area</b>
                  <br />
                  Identify a target area based on proximity to your workplace,
                  your children’s school, or any other personal preferences.
                  Knowing where you want to live is crucial.{" "}
                </p>
                <p>
                  <b>Use Property Portals</b> <br />
                  Utilize property portals to quickly find available rentals.
                  These platforms allow you to compare rental rates across
                  different locations efficiently.{" "}
                </p>
                <p>
                  <b>Contact a Real Estate company</b>
                  <br />
                  Once you find a prospective unit, reach out to a real estate
                  agent. Calling or sending a WhatsApp message is usually more
                  effective than email communication.{" "}
                </p>
                <p>
                  <b>Schedule Viewing</b> <br />
                  Arrange a viewing of the property at a date and time that
                  suits you. This step is essential to assess the property in
                  person.{" "}
                </p>
                <p>
                  <b>Finalize the Lease</b>
                  <br />
                  If you like the property, prepare to submit your documents,
                  which typically include a copy of your passport and, if
                  available, your Emirates ID. In some cases, a bank statement
                  may also be requested. You’ll need to pay a security deposit
                  to secure the unit, usually between 5-10% of the annual rent,
                  depending on whether the property is furnished or unfurnished.
                  Lastly, don’t forget your Ejari.{" "}
                </p>
                <p>
                  <b>Move In</b>
                  <br />
                  Once the contract is signed and any necessary cheques are
                  submitted, you’re ready to move into your new home!{" "}
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

export default React.memo(TenantContent);
