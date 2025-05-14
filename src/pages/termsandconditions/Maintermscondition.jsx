import { useEffect } from "react";
import TermBanner from "./TermBanner";
import TermHead from "./TermHead";
import ExploreMoreProperties from "../../Custom_Components/ExploreMoreProperties";
import JoinUsNow from "./../../Custom_Components/JoinUsNow";
const Maintermscondition = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <TermBanner />
      <TermHead />
      <ExploreMoreProperties />
      <JoinUsNow />
    </>
  );
};

export default Maintermscondition;
