import React, { useEffect, useRef } from "react";
import SellerGuideBanner from "./SellerGuideBanner";
import SellerGuideContent from "./SellerGuideContent";
import YourInquiryform from "../../Custom_Components/YourInquiryform";
import JoinUsNow from "../../Custom_Components/JoinUsNow";

function MainSellerGuide() {
  const innerRef = useRef(null);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <SellerGuideBanner scrollRef={innerRef} />
      <SellerGuideContent innerRef={innerRef} />
      <YourInquiryform />
      <JoinUsNow />
    </>
  );
}

export default MainSellerGuide;
