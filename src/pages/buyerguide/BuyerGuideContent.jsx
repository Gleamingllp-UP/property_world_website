import React from "react";
import { new_buyer } from "../../assets/images";

function BuyerGuideContent({innerRef}) {
  return (
    <>
      <section className="content_area" ref={innerRef}>
        <div className="container">
          <div className="guide_mini2">
            <div className="row align-items-center">
              <div className="col-lg-12">
                <h3>
                  <b>
                    BUYER’S GUIDE TO PURCHASING <span>PROPERTY IN DUBAI</span>
                  </b>
                </h3>
                <hr />
                <div className="but_dd">
                  <p>
                    Buying property involves various processes that can differ
                    by location, making it quite complex. At Property Finders,
                    we’ve created simple steps to guide you through the process
                    and help you move comfortably into your new property.
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
                  <b>1.Set Your Budget</b>
                  <br />
                  Determine your budget before starting the buying process. If
                  you're paying in cash, make sure the funds are ready when
                  needed.{" "}
                </p>
                <p>
                  <b>2.Get Mortgage Approval</b> <br />
                  If you need a mortgage, get pre-approved to streamline the
                  buying process.{" "}
                </p>
                <p>
                  <b>3.Find a Trusted Real Estate Agent</b>
                  <br />
                  Work with a reliable and reputable real estate agent who can
                  guide you through the purchase like Property Finders, we will
                  help you along the way.{" "}
                </p>
                <p>
                  <b>4.Make an Offer</b> <br />
                  Once you find the right property, discuss it with your agent
                  at Property Finders. Have your mortgage pre-approval and a 10%
                  deposit ready. We will help you negotiate with the developers.{" "}
                </p>
                <p>
                  <b>5.Pay the Deposit</b>
                  <br />
                  When both parties agree on a price, sign a Memorandum of
                  Understanding (MOU) and pay a 10% deposit via a current-date
                  cheque.{" "}
                </p>
                <p>
                  <b>6.Obtain the No Objection Certificate (NOC)</b>
                  <br />
                  The seller must get an NOC from the property developer,
                  confirming there are no outstanding payments.{" "}
                </p>
                <p>
                  <b>7.Block the Property</b>
                  <br />
                  If there’s an existing mortgage, the seller will need a
                  liability letter from their bank. You’ll also need to block
                  the property at the land department with specific payments.{" "}
                </p>
                <p>
                  <b>8.Transfer Ownership </b>
                  <br />
                  On this big day, the transfer day, meet with our agent, and
                  the seller. Bring payment methods and transfer fees to
                  finalize everything and receive the title deed and keys.{" "}
                </p>
                <p>
                  <b>9.Congratulations on Your New Home!</b>
                  <br />
                  Congratulations! You’re now a property owner. Don’t forget to
                  register utilities like gas, electricity, and water in your
                  name.{" "}
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

export default BuyerGuideContent;
