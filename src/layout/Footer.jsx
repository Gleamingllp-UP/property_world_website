import { footer_line } from "@/assets/images";
import Copyright from "./Copyright";

function Footer() {
  return (
    <>
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-md-4 col-sm-12">
              <h4 className="cs-footer-title">
                <span>Contacts</span> <img src={footer_line} />
              </h4>
              <div className="info">
                <p>
                  We are DED Licensed RERA certified, recognized as the most
                  trusted reliable name in the Real Estate sector in Dubai
                </p>

                <ul className="">
                  <li>
                    <i className="ri-map-pin-line"></i> Office 502, Al Khaleej
                    Center, Al Mankhool Rd., Bur Dubai - Dubai
                  </li>
                  <li>
                    {" "}
                    <a href="tel:+97143533229">
                      <i className="ri-phone-line"></i> tel:+971 43533229
                    </a>
                  </li>
                  <li>
                    {" "}
                    <a href="mailto:info@propertyworld.ae">
                      <i className="ri-mail-open-line"></i>{" "}
                      info@propertyworld.ae
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-md-2 col-sm-12 col-6">
              <h4 className="cs-footer-title">
                <span>Company</span>
                <img src={footer_line} />
              </h4>
              <ul className="cs-footer-links">
                <li>
                  <a href="index.php">Home</a>
                </li>
                <li>
                  <a href="about-us.php">About Us</a>
                </li>
                <li>
                  <a href="property-listing.php">Buy</a>
                </li>
                <li>
                  <a href="property-listing.php">Rent</a>
                </li>
                <li>
                  <a href="property-listing.php">Commercial</a>
                </li>
                <li>
                  <a data-bs-toggle="modal" data-bs-target="#login_form">
                    List Your Property
                  </a>
                </li>
                <li>
                  <a href="contact-us.php">Contact Us</a>
                </li>
              </ul>
            </div>

            <div className="col-md-2 col-sm-12 col-6">
              <h4 className="cs-footer-title">
                <span>Insights</span> <img src={footer_line} />
              </h4>
              <ul className="cs-footer-links">
                <li>
                  <a href="buyer-guide.php">Buyer Guide</a>
                </li>
                <li>
                  <a href="seller-guide.php">Seller Guide</a>
                </li>
                <li>
                  <a href="tenant-guide.php">Tenant Guide</a>
                </li>
                <li>
                  <a href="landlord-guide.php">Landlord Guide</a>
                </li>
                <li>
                  <a href="blogs.php">Blogs</a>
                </li>
                <li>
                  <a href="agents.php">Agents & Agencies</a>
                </li>
              </ul>
            </div>
            <div className="col-md-2 col-sm-12 col-6">
              <h4 className="cs-footer-title">
                <span>Location</span>
                <img src={footer_line} />
              </h4>
              <ul className="cs-footer-links">
                <li>
                  <a href="property-listing.php">Abu Dhabi</a>
                </li>
                <li>
                  <a href="property-listing.php">Dubai</a>
                </li>
                <li>
                  <a href="property-listing.php">Sharjah</a>
                </li>
                <li>
                  <a href="property-listing.php">Ajman</a>
                </li>
                <li>
                  <a href="property-listing.php">Umm Al Quwain</a>
                </li>
                <li>
                  <a href="property-listing.php">Ras Al Khaimah</a>
                </li>
                <li>
                  <a href="property-listing.php">Fujairah</a>
                </li>
              </ul>
            </div>
            <div className="col-md-2 col-sm-12 col-6">
              <h4 className="cs-footer-title">
                <span>Policy</span>
                <img src={footer_line} />
              </h4>
              <ul className="cs-footer-links">
                <li>
                  <a href="terms-and-conditions.php">Terms & Conditions</a>
                </li>
                <li>
                  <a href="cookies-policy.php">Cookies Policy</a>
                </li>
                <li>
                  <a href="privacy-policy.php">Privacy Policy</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
      <Copyright />
    </>

    //   {/* <footer className="w-full bg-gradient-to-r  from-blue-100/80 via-blue-60/70 to-white/50 backdrop-blur-md border-t border-white/40 px-6 py-4 text-center font-medium text-sm text-gray-600">
    //   © {new Date().getFullYear()} PropertyWorld. All rights reserved.
    // </footer> */}
  );
}

export default Footer;
