import React, { useEffect, useState } from "react";
import AgentsListing from "./AgentsListing";
import AgentsBanner from "./AgentsBanner";

function MainAgents() {
  const [page, setPage] = useState(1);
  const limit = 4;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <AgentsBanner page={page} limit={limit} />
      <AgentsListing page={page} limit={limit} setPage={setPage} />
    </>
  );
}

export default MainAgents;
