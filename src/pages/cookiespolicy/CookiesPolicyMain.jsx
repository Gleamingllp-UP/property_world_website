import React, { useRef } from "react";
import CookiespolicyBanner from "./CookiespolicyBanner";
import CookiesPolicyContent from "./CookiesPolicyContent";
import ExploreMoreProperties from "../../Custom_Components/ExploreMoreProperties";
import JoinUsNow from "../../Custom_Components/JoinUsNow";

function CookiesPolicyMain() {
  const innerRef = useRef(null);
  return (
    <>
      <CookiespolicyBanner scrollRef={innerRef} />
      <CookiesPolicyContent innerRef={innerRef} />
      <ExploreMoreProperties />
      <JoinUsNow />
    </>
  );
}

export default CookiesPolicyMain;
