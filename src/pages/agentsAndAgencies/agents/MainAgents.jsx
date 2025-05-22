import React, { useEffect } from "react";
import AgentsListing from "./AgentsListing";
import AgentsBanner from "./AgentsBanner";

function MainAgents() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <AgentsBanner />
      <AgentsListing />
    </>
  );
}

export default MainAgents;
