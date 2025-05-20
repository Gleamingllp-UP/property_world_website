import { useEffect, useRef } from "react";
import Banner from "./Banner";
import JoinUsNow from "./../../Custom_Components/JoinUsNow";
import BuyerGuideContent from "./BuyerGuideContent";
import YourInquiryform from "../../Custom_Components/YourInquiryform";
const BuyerMain = () => {
  const innerRef = useRef(null);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Banner scrollRef={innerRef} />
      <BuyerGuideContent innerRef={innerRef} />
      <YourInquiryform />
      <JoinUsNow />
    </>
  );
};

export default BuyerMain;
