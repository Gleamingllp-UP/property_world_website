import  { useEffect, useState } from "react";
import Banner from './banner';
import OurProfile from './OurProfile';
import Vision from "./Vision";
import Mission from "./Mission";
const AboutMain = () => {
     useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
 <Banner />
 <OurProfile />
 <Vision />
 <Mission />
    </>
  )
}

export default AboutMain