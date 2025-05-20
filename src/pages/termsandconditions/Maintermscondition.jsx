import React, { useEffect, useRef } from "react";
import TermBanner from "./TermBanner";
import ExploreMoreProperties from "../../Custom_Components/ExploreMoreProperties";
import JoinUsNow from "./../../Custom_Components/JoinUsNow";
import TermContent from "./TermContent";
const Maintermscondition = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const innerRef = useRef(null);

  return (
    <>
      <TermBanner scrollRef={innerRef} />
      <TermContent innerRef={innerRef} />
      <ExploreMoreProperties />
      <JoinUsNow />
    </>
  );
};

export default React.memo(Maintermscondition);
