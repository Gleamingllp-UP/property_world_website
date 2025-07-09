import React, { useEffect, useState, useCallback, useRef } from "react";
import { useSelector } from "react-redux";
import { PropertyMapSkeleton } from "../../../Custom_Components/Skeleton/PropertySkeleton";
import debounce from "lodash.debounce";
import loader from "../../dashboard/list/googleMapsLoader";

const Propertymap = ({ lat, lng, address }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [places, setPlaces] = useState([]);
  const { isLoading } = useSelector((store) => store?.property);

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

  const initMapAndPlaces = useCallback(async (center) => {
    await loader.load();

    // console.log('objectcenter',center)
    if (!mapRef.current) return;

    // Initialize map
    const map = new window.google.maps.Map(mapRef.current, {
      center,
      zoom: 15,
    });
    mapInstanceRef.current = map;

    // Add marker at center
    new window.google.maps.Marker({
      position: center,
      map,
      title: "Center Location",
    });

    // New Place Search API migration coming in future
    const service = new window.google.maps.places.PlacesService(map);
    const placeTypes = ["school", "hospital", "supermarket", "subway_station"];

    const nearbySearchPromises = placeTypes.map(
      (type) =>
        new Promise((resolve) => {
          service.nearbySearch(
            { location: center, radius: 2000, type },
            (results, status) => {
              if (
                status === window.google.maps.places.PlacesServiceStatus.OK &&
                results.length
              ) {
                resolve({
                  type,
                  name: results[0].name,
                  distance: calculateDistance(
                    center.lat,
                    center.lng,
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
  }, []);

  const loadMapData = useCallback(
    async (addressValue) => {
      console.log("Geocoding address:", addressValue);
      await loader.load();
      const geocoder = new window.google.maps.Geocoder();

      let finalCenter = { lat, lng };

      if (addressValue) {
        const location = await new Promise((resolve) => {
          geocoder.geocode({ address: addressValue }, (results, status) => {
            if (status === "OK" && results[0]) {
              resolve(results[0].geometry.location);
            } else {
              console.warn("Geocode failed:", status);
              resolve(null);
            }
          });
        });

        if (location) {
          finalCenter = {
            lat: location.lat(),
            lng: location.lng(),
          };
        }
      }

      initMapAndPlaces(finalCenter);
    },
    [initMapAndPlaces, lat, lng]
  );

  const debouncedLoadMapData = useCallback(
    debounce((addressValue) => {
      loadMapData(addressValue);
    }, 400),
    [loadMapData]
  );

  useEffect(() => {
    if (!address) {
      // console.log("No address provided, falling back to default lat/lng");
      debouncedLoadMapData("");
      return;
    }
    debouncedLoadMapData(address);

    return () => {
      debouncedLoadMapData.cancel();
    };
  }, [address, debouncedLoadMapData, loadMapData]);

  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="key_feature">
      <p>Map</p>
      {isLoading ? (
        <PropertyMapSkeleton />
      ) : (
        <>
          <div
            ref={mapRef}
            style={{ height: "350px", width: "100%", borderRadius: "10px" }}
          />
          <p className="mt-3">Nearby Places</p>
          {places.map((place) => (
            <div className="near_p" key={place.type}>
              <ul>
                <li>
                  <i className={getIconClass(place.type)} /> {place.name}:{" "}
                  {place.distance ? `${place.distance} km` : "N/A"}
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
