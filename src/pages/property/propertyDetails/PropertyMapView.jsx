import React, { useEffect, useState } from "react";
import PropertiesOnMap from "./PropertiesOnMap";

import { useSelector } from "react-redux";
import loader from "../../dashboard/list/googleMapsLoader";

const geocodeProperties = async (properties) => {
  await loader.load();
  const geocoder = new window.google.maps.Geocoder();

  const geocodePromises = properties.map(
    (property) =>
      new Promise((resolve) => {
        if (property?.lat && property?.lng) {
          // Skip if already has coordinates
          // resolve(property);
          const productThumbnailImage = property?.images?.filter(
            (item) => item?.name === "Thumbnail Image"
          );
          resolve({
            image: productThumbnailImage?.[0]?.url,
            address: property?.building_name + " " + property?.address,
            title: property?.title,
            price: property?.price,
            location: {
              lat: Number(property?.lat),
              lng: Number(property?.lng),
            },
          });
        } else {
          geocoder.geocode(
            {
              address:
                String(property?.building_name) +
                " " +
                String(property?.address),
            },
            (results, status) => {
              if (status === "OK" && results[0]) {
                const loc = results[0].geometry.location;
                const productThumbnailImage = property?.images?.filter(
                  (item) => item?.name === "Thumbnail Image"
                );
                resolve({
                  image: productThumbnailImage?.[0]?.url,
                  address: property?.building_name + " " + property?.address,
                  title: property?.title,
                  price: property?.price,
                  location: {
                    lat: loc.lat(),
                    lng: loc.lng(),
                  },
                });
              } else {
                console.warn(`Geocode failed for ${property.address}`);
                resolve({ ...property, location: null });
              }
            }
          );
        }
      })
  );

  const results = await Promise.all(geocodePromises);
  return results.filter((prop) => prop.location);
};

function PropertyMapView() {
  const [propertiesWithLocation, setPropertiesWithLocation] = useState([]);

  const { propertyData } = useSelector((store) => store?.property);

  useEffect(() => {
    const loadCoordinates = async () => {
      const geocoded = await geocodeProperties(propertyData);
      setPropertiesWithLocation(geocoded);
    };

    loadCoordinates();
  }, [propertyData]);

  return (
    <div>
      <PropertiesOnMap
        properties={propertiesWithLocation}
        defaultCenter={{ lat: 25.2048, lng: 55.2708 }}
        zoom={10}
      />
    </div>
  );
}

export default React.memo(PropertyMapView);
