import { useEffect, useRef } from "react";
import Banner from "./Banner";
import ContactInfo from "./ContactInfo";
import ContactMap from "./ContactMap";
import ExploreMoreProperties from "../../Custom_Components/ExploreMoreProperties";
import JoinUsNow from "./../../Custom_Components/JoinUsNow";
const ContactMain = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const innerRef = useRef(null);
  return (
    <>
      <Banner scrollRef={innerRef} />
      <ContactInfo innerRef={innerRef} />
      <ContactMap />
      <ExploreMoreProperties />
      <JoinUsNow />
    </>
  );
};

export default ContactMain;
