import { footer_line } from "@/assets/images";
import Copyright from "./Copyright";
import { Link } from "react-router-dom";
import { pageRoutes } from "../router/pageRoutes";

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
                  <Link to={pageRoutes.ABOUT_US}>About Us</Link>
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
                  <Link to={pageRoutes.CONTACT_US}>Contact Us</Link>
                </li>
              </ul>
            </div>

            <div className="col-md-2 col-sm-12 col-6">
              <h4 className="cs-footer-title">
                <span>Insights</span> <img src={footer_line} />
              </h4>
              <ul className="cs-footer-links">
                <li>
                  <Link to={pageRoutes.BUYER_GUIDE}>Buyer Guide</Link>
                </li>
                <li>
                  <Link to={pageRoutes.SELLER_GUIDE}>Seller Guide</Link>
                </li>
                <li>
                  <Link to={pageRoutes.TENANT_GUIDE}>Tenant Guide</Link>
                </li>
                <li>
                  <Link to={pageRoutes.LANDLORD_GUIDE}>Landlord Guide</Link>
                </li>

                <li>
                  <Link to={pageRoutes.BLOG}>Blogs</Link>
                </li>

                <li>
                  <Link to={pageRoutes.AGENTS}>Agents & Agencies</Link>
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
                  <Link to={pageRoutes.TERM_CONDITIONS}>
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link to={pageRoutes.COOKIES_POLICY}>Cookies Policy</Link>
                </li>
                <li>
                  <Link to={pageRoutes.PRIVACY_POLICY}>Privacy Policy</Link>
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
