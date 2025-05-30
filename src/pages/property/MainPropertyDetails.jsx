import React, { useEffect } from "react";
import PropertyDetails from "./propertyDetails/PropertyDetails";
import PropertyAllInfo from "./propertyDetails/PropertyAllInfo";

function MainPropertyDetails() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <PropertyDetails />
      <PropertyAllInfo />
    </div>
  );
}

export default MainPropertyDetails;
