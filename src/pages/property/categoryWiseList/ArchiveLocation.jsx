import React, { useState ,useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllActiveLocationThunk } from "../../../features/activeData/activeDataSlice";

const ArchiveLocation = () => {
  const { location } = useSelector((store) => store?.activeData);
  const [showAll, setShowAll] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllActiveLocationThunk());
  }, [dispatch]);

  const visibleLocations = showAll ? location : location?.slice(0, 5);
  return (
    <div className="all_location">
      <ul id="myList">
        {visibleLocations?.map((loca, index) => (
          <li key={index}>
            <a href="#">{loca.name}</a>
          </li>
        ))}
      </ul>
      {location?.length > 5 && (
        <button id="toggleLocationsBtn" onClick={() => setShowAll(!showAll)}>
          {showAll ? "Less locations" : "View all locations"}
        </button>
      )}
    </div>
  );
};

export default ArchiveLocation;
