import React, { useEffect, useState } from "react";
import loader from "../../dashboard/list/googleMapsLoader";

const placeTypes = [
  { type: "school", label: "School" },
  { type: "hospital", label: "Hospital" },
  { type: "subway_station", label: "Metro Station" },
  { type: "supermarket", label: "Supermarket" },
];

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (val) => (val * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // distance in kilometers (raw)
};

const NearbyPlaces = ({ lat, lng, address, name }) => {
  const [distances, setDistances] = useState([]);
  const [coordinates, setCoordinates] = useState({ lat, lng });

  useEffect(() => {
    const geocodeAddress = async () => {
      await loader.load();
      if (!address) return setCoordinates({ lat, lng });

      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address }, (results, status) => {
        if (status === "OK" && results[0]) {
          const location = results[0].geometry.location;
          setCoordinates({
            lat: location.lat(),
            lng: location.lng(),
          });
        } else {
          setCoordinates({ lat, lng });
        }
      });
    };

    geocodeAddress();
  }, [address, lat, lng]);

  useEffect(() => {
    const fetchNearbyPlaces = async () => {
      await loader.load();

      const fakeDiv = document.createElement("div");
      const service = new window.google.maps.places.PlacesService(fakeDiv);

      const fetchByType = ({ type, label }) =>
        new Promise((resolve) => {
          service.nearbySearch(
            {
              location: coordinates,
              radius: 2000,
              type,
            },
            (results, status) => {
              if (
                status === window.google.maps.places.PlacesServiceStatus.OK &&
                results.length
              ) {
                const place = results[0];
                const distKm = calculateDistance(
                  coordinates.lat,
                  coordinates.lng,
                  place.geometry.location.lat(),
                  place.geometry.location.lng()
                );
                resolve({ label, distance: distKm });
              } else {
                resolve({ label, distance: null });
              }
            }
          );
        });

      const results = await Promise.all(placeTypes.map(fetchByType));
      setDistances(results);
    };

    if (coordinates.lat && coordinates.lng) {
      fetchNearbyPlaces();
    }
  }, [coordinates]);

  const formatDistance = (distKm) => {
    if (distKm === null) return "N/A";
    if (distKm < 1) return `${Math.round(distKm * 1000)} m`;
    return `${distKm.toFixed(1)} km`;
  };

  return (
    <div className="nearst_location">
      {name === "agent" ? (
        <p>
          <b>Nearest Location</b>
        </p>
      ) : (
        <p>Nearby Places</p>
      )}
      <ul>
        {distances &&
          distances?.map((place) => (
            <li key={place?.label}>
              {place?.label}: {formatDistance(place?.distance)}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default React.memo(NearbyPlaces);
