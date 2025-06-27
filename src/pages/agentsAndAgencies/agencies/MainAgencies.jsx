import React, { useEffect, useState } from "react";
import AgenciesListing from "./AgenciesListing";
import AgenciesBanner from "./AgenciesBanner";

function MainAgencies() {
  const [page, setPage] = useState(1);
  const limit = 4;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <AgenciesBanner page={page} limit={limit} />
      <AgenciesListing page={page} limit={limit} setPage={setPage} />
    </>
  );
}

export default MainAgencies;
