import React, { useEffect } from "react";
import AgenciesListing from "./AgenciesListing";
import AgenciesBanner from "./AgenciesBanner";

function MainAgencies() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <AgenciesBanner />
      <AgenciesListing />
    </>
  );
}

export default MainAgencies;
