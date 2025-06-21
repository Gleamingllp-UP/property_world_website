import { useEffect, useRef } from "react";
import Banner from "./Banner";
import AboutUsContent from "./AboutUsContent";
import ExploreMoreProperties from "../../Custom_Components/ExploreMoreProperties";
import JoinUsNow from "../../Custom_Components/JoinUsNow";

const AboutMain = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const innerRef = useRef(null);
  return (
    <>
    
      <Banner scrollRef={innerRef} />
      <AboutUsContent innerRef={innerRef} />
      <ExploreMoreProperties />
      <JoinUsNow />
    </>
  );
};

export default AboutMain;
