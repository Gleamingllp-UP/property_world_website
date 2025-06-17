import React, { useEffect, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { useSelector } from "react-redux";
import { PropertyMapSkeleton } from "../../../Custom_Components/Skeleton/PropertySkeleton";

const loader = new Loader({
  apiKey: "AIzaSyDjNkeXpHwfGwnJXuzeb630oyNHpP9MjSo",
  libraries: ["places"],
});

const Propertymap = ({ lat = 25.3463, lng = 55.4209, address }) => {
  const [places, setPlaces] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat, lng });

  useEffect(() => {
    const loadMapData = async () => {
      await loader.load();

      const geocoder = new window.google.maps.Geocoder();

      if (address) {
        geocoder.geocode({ address }, (results, status) => {
          if (status === "OK" && results[0]) {
            const location = results[0].geometry.location;
            setMapCenter({
              lat: location.lat(),
              lng: location.lng(),
            });
          } else {
            console.warn("Geocode failed or no result, falling back to default lat/lng");
            setMapCenter({ lat, lng }); // fallback
          }
        });
      } else {
        setMapCenter({ lat, lng }); // if no address
      }
    };

    loadMapData();
  }, [address, lat, lng]);

  useEffect(() => {
    const initMapAndPlaces = async () => {
      await loader.load();

      const mapDiv = document.getElementById("map");
      const map = new window.google.maps.Map(mapDiv, {
        center: mapCenter,
        zoom: 15,
      });

      new window.google.maps.Marker({
        position: mapCenter,
        map,
        title: "Center Location",
      });

      const service = new window.google.maps.places.PlacesService(map);
      const placeTypes = ["school", "hospital", "supermarket", "subway_station"];

      const nearbySearchPromises = placeTypes.map(
        (type) =>
          new Promise((resolve) => {
            service.nearbySearch(
              {
                location: mapCenter,
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
                      mapCenter.lat,
                      mapCenter.lng,
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

    if (mapCenter.lat && mapCenter.lng) {
      initMapAndPlaces();
    }
  }, [mapCenter]);

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
        return "ri-map-pin-line";
    }
  };

  const { isLoading } = useSelector((store) => store?.property);

  return (
    <div className="key_feature">
      <p>Map</p>
      {isLoading ? (
        <PropertyMapSkeleton />
      ) : (
        <>
          <div
            id="map"
            style={{ height: "350px", width: "100%", borderRadius: "10px" }}
          ></div>

          <p className="mt-3">Nearby Places</p>
          {places &&
            places.map((place) => (
              <div className="near_p" key={place?.type}>
                <ul>
                  <li>
                    <i className={getIconClass(place?.type)} /> {place?.name}:{" "}
                    {place?.distance ? `${place?.distance} km` : "N/A"}
                  </li>
                </ul>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default React.memo(Propertymap);
