import React, { useEffect, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

const loader = new Loader({
  apiKey: "AIzaSyDjNkeXpHwfGwnJXuzeb630oyNHpP9MjSo",
  libraries: ["places"],
});

const Propertymap = ({ lat = 25.3463, lng = 55.4209 }) => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const initMapAndPlaces = async () => {
      await loader.load();

      const mapDiv = document.getElementById("map");
      const map = new window.google.maps.Map(mapDiv, {
        center: { lat, lng },
        zoom: 15,
      });

      // Add marker at center
      new window.google.maps.Marker({
        position: { lat, lng },
        map,
        title: "Center Location",
      });

      const service = new window.google.maps.places.PlacesService(map);
      const placeTypes = [
        "school",
        "hospital",
        "supermarket",
        "subway_station",
      ];

      const nearbySearchPromises = placeTypes.map(
        (type) =>
          new Promise((resolve) => {
            service.nearbySearch(
              {
                location: { lat, lng },
                radius: 2000,
                type,
              },
              (results, status) => {
                if (
                  status === window.google.maps.places.PlacesServiceStatus.OK &&
                  results.length
                ) {
                  resolve({
                    type,
                    name: results[0].name,
                    distance: calculateDistance(
                      lat,
                      lng,
                      results[0].geometry.location.lat(),
                      results[0].geometry.location.lng()
                    ),
                  });
                } else {
                  resolve({ type, name: "Not found", distance: null });
                }
              }
            );
          })
      );

      const resolvedPlaces = await Promise.all(nearbySearchPromises);
      setPlaces(resolvedPlaces);
    };

    initMapAndPlaces();
  }, [lat, lng]);

  // Haversine formula to calculate distance in km
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (val) => (val * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(2);
  };

  const getIconClass = (type) => {
    switch (type) {
      case "school":
        return "ri-community-line";
      case "hospital":
        return "ri-hospital-line";
      case "subway_station":
        return "ri-train-line";
      case "supermarket":
        return "ri-shopping-cart-2-line";
      default:
        return "ri-map-pin-line"; // fallback icon
    }
  };

  return (
    <>
      <div className="key_feature">
        <p>Map </p>
        <div
          id="map"
          style={{ height: "350px", width: "100%", borderRadius: "10px" }}
        ></div>
    
        <p className="mt-3">Nearby Places</p>
        {places?.map((place) => (
          <div className="near_p" key={place?.type}>
            <ul>
              <li>
                <i className={getIconClass(place?.type)} /> {place?.name}:{" "}
                {place?.distance ? `${place?.distance} km` : "N/A"}
              </li>
            </ul>
          </div>
        ))}
      </div>
    </>
  );
};

export default React.memo(Propertymap);
