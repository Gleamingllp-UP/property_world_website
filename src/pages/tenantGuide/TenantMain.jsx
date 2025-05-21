import React, { useEffect, useRef } from "react";
import TenantBanner from "./TenantBanner";
import TenantContent from "./TenantContent";
import YourInquiryform from "../../Custom_Components/YourInquiryform";
import JoinUsNow from "../../Custom_Components/JoinUsNow";
function TenantMain() {
  const innerRef = useRef(null);
   useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  return (
    <>
      <TenantBanner scrollRef={innerRef} />
      <TenantContent innerRef={innerRef} />
      <YourInquiryform />
      <JoinUsNow />
    </>
  );
}

export default TenantMain;
