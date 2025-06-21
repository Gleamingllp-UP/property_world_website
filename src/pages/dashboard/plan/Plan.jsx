import React from "react";
import "../../../assets/css/plan.css";
import AgentAgecyPlan from "./AgentAgecyPlan";
import IndivisualPlan from "./IndivisualPlan";
import { useSelector } from "react-redux";

const Plan = () => {
  const { userData } = useSelector((store) => store?.user);

  return (
    <>
      {["agent", "agency", "agencies"].includes(
        userData?.role?.toLowerCase()
      ) && <AgentAgecyPlan />}

      {userData?.role?.toLowerCase() === "individual" && <IndivisualPlan />}
    </>
  );
};

export default Plan;
