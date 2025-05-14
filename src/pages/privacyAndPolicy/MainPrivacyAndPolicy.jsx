import React from "react";
import PrivacyAndPolicyBanner from "./PrivacyAndPolicyBanner";
import PrivacyAndPolicyContent from "./PrivacyAndPolicyContent";
import ExploreMoreProperties from "../../Custom_Components/ExploreMoreProperties";
import JoinUsNow from "../../Custom_Components/JoinUsNow";

function MainPrivacyAndPolicy() {
  return (
    <>
      <PrivacyAndPolicyBanner />
      <PrivacyAndPolicyContent />
      <ExploreMoreProperties />
      <JoinUsNow />
    </>
  );
}

export default MainPrivacyAndPolicy;
