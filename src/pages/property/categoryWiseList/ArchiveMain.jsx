import { useEffect, useState } from "react";
import Archive from "./Archive";
import ArchiveSide from "./ArchiveSide";
import { useSearchParams } from "react-router-dom";
const ArchiveMain = () => {
  const [queryParams] = useSearchParams();
  const map_view = queryParams.get("map_view");

  const [isMapView, setIsMapView] = useState(map_view || false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="container">
        <div className="row">
          <Archive isMapView={isMapView} setIsMapView={setIsMapView} />
          {!isMapView && <ArchiveSide />}
        </div>
      </div>
    </>
  );
};

export default ArchiveMain;
