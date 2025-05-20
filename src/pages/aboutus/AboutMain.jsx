import { useEffect, useRef } from "react";
import Banner from "./Banner";
import AboutUsContent from "./AboutUsContent";
const AboutMain = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
const innerRef=useRef(null)
  return (
    <>
      <Banner scrollRef={innerRef}/>
      <AboutUsContent innerRef={innerRef}/>
    </>
  );
};

export default AboutMain;
