import React, { useEffect, useState } from "react";
import AgentsListing from "./AgentsListing";
import AgentsBanner from "./AgentsBanner";


function MainAgents() {
  const [page, setPage] = useState(1);
  const limit = 8;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <AgentsBanner/>
      <AgentsListing page={page} limit={limit} setPage={setPage} />
    </>
  );
}

export default MainAgents;
