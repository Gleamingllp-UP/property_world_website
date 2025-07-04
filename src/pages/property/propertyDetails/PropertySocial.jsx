import React, { useCallback, useState } from "react";
import { email, facebook, g_email, twitter } from "../../../assets/images";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "../../../utils/toast/toast";
import {
  addOrRemoveFavouritePropertyThunk,
  getPropertyDetailsThunk,
} from "../../../features/property/propertySlice";
import { throttle } from "lodash";
import { openLoginPrompt } from "../../../features/user/userSlice";

const PropertySocial = () => {
  const [showSocials, setShowSocials] = useState(false);

  const { userData } = useSelector((store) => store?.user);
  const { propertyDetails } = useSelector((store) => store?.property);

  const handleShareClick = () => {
    setShowSocials(!showSocials);
  };

  const shareUrl = encodeURIComponent(window.location.href);
  const shareText = encodeURIComponent("Check out this amazing property!");

  const dispatch = useDispatch();

  const handleLikeToggle = async (id) => {
    try {
      if (userData?.role === "guest") {
        dispatch(openLoginPrompt());
        return;
      }
      showToast("Wait", "loading");
      const resultAction = await dispatch(
        addOrRemoveFavouritePropertyThunk(id)
      );
      if (addOrRemoveFavouritePropertyThunk.fulfilled.match(resultAction)) {
        showToast(resultAction?.payload?.message, "success");
        dispatch(getPropertyDetailsThunk({ id }));
      } else {
        throw new Error(resultAction?.error?.message);
      }
    } catch (error) {
      showToast(error?.message || "Failed to create property.", "error");
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const throttledToggleLike = useCallback(
    throttle((propertyId) => {
      handleLikeToggle(propertyId);
    }, 2000),
    []
  );

  return (
    <div className="col-lg-3">
      <div className="share_post">
        <button>
          <i
            className={
              propertyDetails?.is_liked
                ? "ri-heart-fill text-white"
                : "ri-heart-line"
            }
            onClick={() => throttledToggleLike(propertyDetails?._id)}
            style={{
              cursor: "pointer",
              fontSize: "20px",
            }}
          ></i>
        </button>

        <button className="toggle" onClick={handleShareClick}>
          <i className="ri-share-line" /> Share
        </button>
        <div
          id="target"
          style={{ display: showSocials ? "block" : "none", marginTop: "10px" }}
        >
          <ul>
            <li>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={facebook} alt="Facebook" /> Facebook
              </a>
            </li>
            <li>
              <a
                href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={twitter} alt="Twitter" /> Twitter
              </a>
            </li>
            <li>
              <a
                href={`https://wa.me/?text=${shareText}%20${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={facebook} alt="Whatsapp" /> Whatsapp
              </a>
            </li>
            <li>
              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=&su=${shareText}&body=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={g_email} alt="Gmail" /> Send via Gmail
              </a>
            </li>
            <li>
              <a href={`mailto:?subject=${shareText}&body=${shareUrl}`}>
                <img src={email} alt="Email" /> Send via Email
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PropertySocial;
