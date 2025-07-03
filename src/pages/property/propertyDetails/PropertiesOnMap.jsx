import React, { useEffect, useRef, useCallback } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { MarkerClusterer } from "@googlemaps/markerclusterer";

const loader = new Loader({
  apiKey: import.meta.env.VITE_GOOGLE_MAP_KEY,
  libraries: ["places"],
});

const groupProperties = (props) => {
  const grouped = {};

  props.forEach((property) => {
    const lat = property.location.lat.toFixed(4);
    const lng = property.location.lng.toFixed(4);
    const key = `${lat},${lng}`;

    if (!grouped[key]) {
      grouped[key] = {
        location: { lat: parseFloat(lat), lng: parseFloat(lng) },
        count: 0,
        properties: [],
      };
    }

    grouped[key].count += 1;
    grouped[key].properties.push(property);
  });

  return Object.values(grouped).map((group) => ({
    location: group.location,
    count: group.count,
    title: group.properties[0].title,
    price: group.properties[0].price,
    address: group.properties[0].address,
    image: group.properties[0].image,
  }));
};

const createMarkerIcon = (count = 1) => {
  const svg = `
    <svg width="90" height="50" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="90" height="40" rx="20" ry="20" fill="#a855f7"/>
      <path d="M12 3L2 12h3v8h5v-6h4v6h5v-8h3z" fill="#fff" transform="translate(20,8) scale(1)"/>
      <text x="60" y="27" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" fill="#fff" font-weight="bold">
        ${count}
      </text>
      <polygon points="45,40 55,40 50,50" fill="#a855f7" />
    </svg>
  `;
  return `data:image/svg+xml;base64,${window.btoa(svg)}`;
};

function renderMarkers(props, mapInstance, clustererRef, infoWindowRef) {
  clustererRef.current?.clearMarkers?.();

  const markers = props.map((property) => {
    const marker = new window.google.maps.Marker({
      position: property.location,
      title: property.title,
      icon: {
        url: createMarkerIcon(property.count || 1),
        scaledSize: new window.google.maps.Size(60, 40),
      },
    });

    const infoWindow = new window.google.maps.InfoWindow({
      content: `
      <div style="min-width:200px; font-family:sans-serif;">
        <h4 style="margin-bottom:4px;">${property.title || "Property"}</h4>
        ${
          property.price
            ? `<p style="margin:2px 0;">Price: ${property.price}</p>`
            : ""
        }
        ${
          property.address
            ? `<p style="margin:2px 0;">${property.address}</p>`
            : ""
        }
        ${
          property.image
            ? `<img src="${property.image}" alt="${property.title}" style="width:100%; height:auto; margin-top:6px; border-radius:4px;" />`
            : ""
        }
      </div>
    `,
    });

    marker.addListener("mouseover", () => {
      if (property.count === 1) {
        infoWindow.open(mapInstance.current, marker);
      }
    });

    marker.addListener("mouseout", () => {
      infoWindow.close();
    });

    marker.addListener("click", () => {
      if (property.count === 1) {
        infoWindowRef.current?.close();
        infoWindow.open(mapInstance.current, marker);
        infoWindowRef.current = infoWindow;
      }
    });

    return marker;
  });

  clustererRef.current = new MarkerClusterer({
    map: mapInstance.current,
    markers,
    renderer: {
      render: ({ count, position }) => {
        const svg = `
          <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg">
            <circle cx="25" cy="25" r="20" fill="#a855f7" />
            <text x="25" y="32" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" fill="#fff" font-weight="bold">${count}</text>
          </svg>
        `;

        return new window.google.maps.Marker({
          position,
          icon: {
            url: `data:image/svg+xml;base64,${window.btoa(svg)}`,
            scaledSize: new window.google.maps.Size(40, 40),
          },
          title: `${count} properties`,
        });
      },
    },
  });
}

const PropertiesOnMap = ({
  properties = [],
  defaultCenter = { lat: 25.276987, lng: 55.296249 },
  zoom = 10,
}) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const infoWindowRef = useRef(null);
  const clustererRef = useRef(null);

  useEffect(() => {
    const initMap = async () => {
      await loader.load();

      const map = new window.google.maps.Map(mapRef.current, {
        center: defaultCenter,
        zoom,
      });
      mapInstance.current = map;

      renderMarkers(
        groupProperties(properties),
        mapInstance,
        clustererRef,
        infoWindowRef
      );
      fitMapToProperties(properties);
    };

    initMap();
  }, [defaultCenter, properties, zoom]);

  useEffect(() => {
    if (mapInstance.current) {
      renderMarkers(
        groupProperties(properties),
        mapInstance,
        clustererRef,
        infoWindowRef
      );
      fitMapToProperties(properties);
    }
  }, [properties]);

  const fitMapToProperties = (props) => {
    if (!props.length) return;
    const bounds = new window.google.maps.LatLngBounds();
    props.forEach((p) => bounds.extend(p.location));
    mapInstance.current.fitBounds(bounds);
  };

  return (
    <div
      style={{
        height: "600px",
        width: "100%",
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      <div ref={mapRef} style={{ height: "100%", width: "100%" }} />
    </div>
  );
};

export default React.memo(PropertiesOnMap);
