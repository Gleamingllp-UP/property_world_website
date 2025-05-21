import React, { useEffect, useRef } from "react";
import LandLoardContent from "./LandLoardContent";
import LandLordBanner from "./LandLordBanner";
import YourInquiryform from "../../Custom_Components/YourInquiryform";
import JoinUsNow from "../../Custom_Components/JoinUsNow";

function LandLoardMain() {
  const innerRef = useRef(null);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <LandLordBanner scrollRef={innerRef} />
      <LandLoardContent innerRef={innerRef} />
      <YourInquiryform />
      <JoinUsNow />
    </>
  );
}

export default LandLoardMain;
