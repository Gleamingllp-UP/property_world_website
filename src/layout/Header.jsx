import { property_world_logo } from "@/assets/images";
import { Link, useNavigate } from "react-router-dom";
import { pageRoutes } from "../router/pageRoutes";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoginModal from "../pages/auth/login/LoginModal";
import { getAllActiveCategoryThunk } from "./../features/activeData/activeDataSlice";
import { getAllActiveLocationThunk } from "./../features/activeData/activeDataSlice";
function Header() {
  const { location } = useSelector((store) => store?.activeData);
  const [modalShow, setModalShow] = useState(false);
  const { categories } = useSelector((store) => store?.activeData);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getAllActiveCategoryThunk());
  }, []);

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
            <a className="brand" onClick={() => navigate(pageRoutes.HOME_PAGE)}>
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
                {categories?.map((item) => (
                  <li key={item?._id} className="menu-item">
                    <Link
                      to={
                        pageRoutes.PROPERTY_LISTING + `?category=${item?._id}`
                      }
                    >
                      {item?.name}
                    </Link>
                  </li>
                ))}

                <li className="menu-item">
                  <a data-bs-toggle="modal" data-bs-target="#login_form" onClick={() => setModalShow(true)}>
                    List
                  </a>
                </li>
                <li className="menu-item menu-item-has-children">
                  <a href="#" data-toggle="sub-menu">
                    Insights<i className="expand"></i>
                  </a>
                  <ul className="sub-menu">
                    <li className="menu-item">
                      <Link to={pageRoutes.BUYER_GUIDE}>
                        <i className="ri-arrow-right-up-long-line"></i> Buyer
                        Guide
                      </Link>
                    </li>
                    <li className="menu-item">
                      <Link to={pageRoutes.SELLER_GUIDE}>
                        <i className="ri-arrow-right-up-long-line"></i> Seller
                        Guide
                      </Link>
                    </li>
                    <li className="menu-item">
                      <Link to={pageRoutes.TENANT_GUIDE}>
                        <i className="ri-arrow-right-up-long-line"></i> Tenant
                        Guide
                      </Link>
                    </li>
                    <li className="menu-item">
                      <Link to={pageRoutes.LANDLORD_GUIDE}>
                        <i className="ri-arrow-right-up-long-line"></i> Landlord
                        Guide
                      </Link>
                    </li>
                    <li className="menu-item">
                      <Link to={pageRoutes.BLOG}>
                        <i className="ri-arrow-right-up-long-line"></i> Blogs
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="menu-item menu-item-has-children">
                  <a href="#" data-toggle="sub-menu">
                    Location <i className="expand"></i>
                  </a>
                  <ul className="sub-menu">
                     {location?.map((loca, index) => (
                    <li className="menu-item">
                       <Link
                      to={pageRoutes.PROPERTY_LISTING + `/?search=${loca?.name}`}
                    >
                        <i className="ri-arrow-right-up-long-line"></i> {loca?.name}
                       </Link>
                    </li>
                  ))}
                  </ul>
                </li>

                <li className="menu-item">
                  <Link to={pageRoutes.AGENTS}>Find an Agent</Link>
                </li>
                <li className="menu-item" onClick={() => setModalShow(true)}>
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

      <LoginModal show={modalShow} onHide={() => setModalShow(false)} />
    </header>
  );
}

export default Header;
