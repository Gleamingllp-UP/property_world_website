import React, { useRef } from "react";
import PrivacyAndPolicyBanner from "./PrivacyAndPolicyBanner";
import PrivacyAndPolicyContent from "./PrivacyAndPolicyContent";
import ExploreMoreProperties from "../../Custom_Components/ExploreMoreProperties";
import JoinUsNow from "../../Custom_Components/JoinUsNow";

function MainPrivacyAndPolicy() {
  const innerRef=useRef(null)

  return (
    <>
      <PrivacyAndPolicyBanner scrollRef={innerRef}/>
      <PrivacyAndPolicyContent innerRef={innerRef}/>
      <ExploreMoreProperties />
      <JoinUsNow />
    </>
  );
}

export default MainPrivacyAndPolicy;
