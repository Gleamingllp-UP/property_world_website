import { property_world_logo } from "@/assets/images";

function Header() {
  return (
    <header>
      <div className="container">
        <div className="top_hed">
          <div className="row">
            <div className="col-lg-6">
              <div className="email_us">
                <i className="ri-mail-open-line"></i> info@propertyworld.ae
              </div>
            </div>
            <div className="col-lg-6">
              <div className="call_us">
                <i className="ri-phone-line"></i> Call us:{" "}
                <a href="tel:+447717628097">+44 7717 628097</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="header">
        <div className="container">
          <section className="wrapper">
            <a href="index.php" className="brand">
              <img src={property_world_logo} className="img-fluid" />
            </a>
            <button type="button" className="opened-menu">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </button>
            <div className="overlay"></div>
            <nav className="navbar">
              <button type="button" className="closed-menu">
                <img
                  src="assets/images/closed.svg"
                  className="closed-icon"
                  alt="closed"
                />
              </button>
              <ul className="menu">
                <li className="menu-item">
                  <a href="property-listing.php">Buy</a>
                </li>
                <li className="menu-item">
                  <a href="property-listing.php">Rent</a>
                </li>
                <li className="menu-item">
                  <a href="property-listing.php">Commercial</a>
                </li>
                <li className="menu-item">
                  <a data-bs-toggle="modal" data-bs-target="#login_form">
                    List
                  </a>
                </li>
                <li className="menu-item menu-item-has-children">
                  <a href="#" data-toggle="sub-menu">
                    Insights<i className="expand"></i>
                  </a>
                  <ul className="sub-menu">
                    <li className="menu-item">
                      <a href="buyer-guide.php">
                        <i className="ri-arrow-right-up-long-line"></i> Buyer
                        Guide
                      </a>
                    </li>
                    <li className="menu-item">
                      <a href="seller-guide.php">
                        <i className="ri-arrow-right-up-long-line"></i> Seller
                        Guide
                      </a>
                    </li>
                    <li className="menu-item">
                      <a href="tenant-guide.php">
                        <i className="ri-arrow-right-up-long-line"></i> Tenant
                        Guide
                      </a>
                    </li>
                    <li className="menu-item">
                      <a href="landlord-guide.php">
                        <i className="ri-arrow-right-up-long-line"></i> Landlord
                        Guide
                      </a>
                    </li>
                    <li className="menu-item">
                      <a href="blogs.php">
                        <i className="ri-arrow-right-up-long-line"></i> Blogs
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="menu-item menu-item-has-children">
                  <a href="#" data-toggle="sub-menu">
                    Location <i className="expand"></i>
                  </a>
                  <ul className="sub-menu">
                    <li className="menu-item">
                      <a href="property-listing.php">
                        <i className="ri-arrow-right-up-long-line"></i> Abu
                        Dhabi
                      </a>
                    </li>
                    <li className="menu-item">
                      <a href="property-listing.php">
                        <i className="ri-arrow-right-up-long-line"></i> Dubai
                      </a>
                    </li>
                    <li className="menu-item">
                      <a href="property-listing.php">
                        <i className="ri-arrow-right-up-long-line"></i> Sharjah
                      </a>
                    </li>
                    <li className="menu-item">
                      <a href="property-listing.php">
                        <i className="ri-arrow-right-up-long-line"></i> Ajman
                      </a>
                    </li>
                    <li className="menu-item">
                      <a href="property-listing.php">
                        <i className="ri-arrow-right-up-long-line"></i> Umm Al
                        Quwain
                      </a>
                    </li>
                    <li className="menu-item">
                      <a href="property-listing.php">
                        <i className="ri-arrow-right-up-long-line"></i> Ras Al
                        Khaimah
                      </a>
                    </li>
                    <li className="menu-item">
                      <a href="property-listing.php">
                        <i className="ri-arrow-right-up-long-line"></i> Fujairah
                      </a>
                    </li>
                  </ul>
                </li>

                <li className="menu-item">
                  <a href="agents.php">Find an Agent</a>
                </li>

                <li className="menu-item">
                  <a
                    data-bs-toggle="modal"
                    data-bs-target="#login_form"
                    className="login_u"
                  >
                    <i className="ri-user-line"></i> Login
                  </a>
                </li>
              </ul>
            </nav>
          </section>
        </div>
      </div>
    </header>
  );
}

export default Header;
