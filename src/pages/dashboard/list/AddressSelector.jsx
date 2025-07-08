// import React, { useEffect, useRef, useCallback } from "react";
// import { Loader } from "@googlemaps/js-api-loader";
// import { ErrorMessage } from "../../../Custom_Components/ErrorMessage";
// import loader from "./googleMapsLoader";

// function AddressSelector({
//   value,
//   onChange,
//   onBlur,
//   defaultCenter ,
//   error,
//   setLatLng,
// }) {

//   // console.log("objectdefaultCenter",defaultCenter)
//   const mapRef = useRef(null);
//   const inputRef = useRef(null);
//   const markerRef = useRef(null);
//   const mapInstance = useRef(null);
//   const autocompleteInstance = useRef(null);

//   const animateToLocation = useCallback((latLng, targetZoom = 15) => {
//     if (!mapInstance.current) return;
//     mapInstance.current.panTo(latLng);

//     let currentZoom = mapInstance.current.getZoom() || 14;
//     const zoomInterval = setInterval(() => {
//       if (currentZoom === targetZoom) {
//         clearInterval(zoomInterval);
//       } else {
//         currentZoom += currentZoom < targetZoom ? 1 : -1;
//         mapInstance.current.setZoom(currentZoom);
//       }
//     }, 100);
//   }, []);

//   const setMarker = useCallback((latLng, animateType = "DROP") => {
//     if (markerRef.current) {
//       markerRef.current.setPosition(latLng);
//       markerRef.current.setAnimation(
//         animateType === "BOUNCE"
//           ? window.google.maps.Animation.BOUNCE
//           : window.google.maps.Animation.DROP
//       );
//       if (animateType === "BOUNCE") {
//         setTimeout(() => markerRef.current?.setAnimation(null), 1500);
//       }
//     }
//   }, []);

//   const handleUpdate = useCallback(
//     (latLng, formattedAddress, animateType = "DROP") => {
//       animateToLocation(latLng);
//       setMarker(latLng, animateType);
//       onChange(formattedAddress);
//       setLatLng({
//         lat: latLng?.lat,
//         lng: latLng?.lng,
//       });
//     },
//     [animateToLocation, setMarker, onChange, setLatLng]
//   );

//   const reverseGeocode = useCallback(
//     (latLng, animateType = "DROP") => {
//       const geocoder = new window.google.maps.Geocoder();
//       geocoder.geocode({ location: latLng }, (results, status) => {
//         const foundAddress =
//           status === "OK" && results[0] ? results[0].formatted_address : "";
//         if (inputRef.current) inputRef.current.value = foundAddress;
//         handleUpdate(latLng, foundAddress, animateType);
//       });
//     },
//     [handleUpdate]
//   );

//   const initMap = useCallback(async () => {
//     await loader.load();

//     const map = new window.google.maps.Map(mapRef.current, {
//       center: defaultCenter,
//       zoom: 14,
//     });
//     mapInstance.current = map;

//     const marker = new window.google.maps.Marker({
//       map,
//       position: defaultCenter,
//       draggable: true,
//     });
//     markerRef.current = marker;

//     marker.addListener("dragend", (e) => {
//       reverseGeocode(
//         {
//           lat: e.latLng.lat(),
//           lng: e.latLng.lng(),
//         },
//         "DROP"
//       );
//     });

//     const autocomplete = new window.google.maps.places.Autocomplete(
//       inputRef.current,
//       {
//         fields: ["formatted_address", "geometry"],
//       }
//     );
//     autocompleteInstance.current = autocomplete;

//     autocomplete.addListener("place_changed", () => {
//       const place = autocomplete.getPlace();
//       if (!place.geometry) return;
//       handleUpdate(
//         {
//           lat: place.geometry.location.lat(),
//           lng: place.geometry.location.lng(),
//         },
//         place.formatted_address,
//         "DROP"
//       );
//     });

//     map.addListener("click", (e) => {
//       reverseGeocode(
//         {
//           lat: e.latLng.lat(),
//           lng: e.latLng.lng(),
//         },
//         "DROP"
//       );
//     });

//     animateToLocation(defaultCenter);
//     setMarker(defaultCenter, "DROP");
//   }, [
//     defaultCenter,
//     reverseGeocode,
//     handleUpdate,
//     animateToLocation,
//     setMarker,
//   ]);

//   const handleUseCurrentLocation = () => {
//     if (!navigator.geolocation) {
//       alert("Geolocation is not supported by your browser");
//       return;
//     }
//     navigator.geolocation.getCurrentPosition(
//       (pos) =>
//         reverseGeocode(
//           {
//             lat: pos.coords.latitude,
//             lng: pos.coords.longitude,
//           },
//           "DROP"
//         ),
//       (err) => {
//         console.error(err);
//         alert("Unable to retrieve your location");
//       }
//     );
//   };

//   const handleReset = () => {
//     inputRef.current.value = "";
//     animateToLocation(defaultCenter);
//     setMarker(defaultCenter, "BOUNCE");
//     onChange("");
//   };

//   useEffect(() => {
//     initMap();
//   }, []);

//   useEffect(() => {
//     if (inputRef.current && inputRef.current.value !== value) {
//       inputRef.current.value = value || "";
//     }
//   }, [value]);

//   const handleFocus = () => {
//     if (autocompleteInstance.current) {
//       const event = new Event("keydown", { bubbles: true });
//       inputRef.current.dispatchEvent(event);
//     }
//   };

//   return (
//     <div className="mb-3">
//       <div className="row g-2">
//         <div className="col">
//           <input
//             ref={inputRef}
//             type="text"
//             className="form-control"
//             placeholder="Search Address"
//             onFocus={handleFocus}
//             onBlur={onBlur}
//             defaultValue={value}
//           />
//         </div>
//         <div className="col-auto">
//           <button
//             onClick={handleUseCurrentLocation}
//             className="action_btn w-100 h-100"
//             type="button"
//           >
//             Use Current Location
//           </button>
//         </div>
//         <div className="col-auto">
//           <button
//             onClick={handleReset}
//             className="btn btn-secondary w-100 h-100 "
//             type="button"
//             style={{
//               borderRadius: "50px",
//             }}
//           >
//             Reset
//           </button>
//         </div>
//       </div>
//       {error && <ErrorMessage message={error} />}
//       <div
//         ref={mapRef}
//         className="mt-3 rounded"
//         style={{ height: "400px", width: "100%" }}
//       />
//     </div>
//   );
// }

// export default React.memo(AddressSelector);

import React, { useEffect, useRef, useCallback } from "react";
import loader from "./googleMapsLoader";
import { ErrorMessage } from "../../../Custom_Components/ErrorMessage";

function AddressSelector({
  value,
  onChange,
  onBlur,
  defaultCenter = { lat: 25.3463, lng: 55.4209 },
  error,
  setLatLng,
}) {
  const mapRef = useRef(null);
  const inputRef = useRef(null);
  const markerRef = useRef(null);
  const mapInstance = useRef(null);
  const autocompleteInstance = useRef(null);
  const initializedRef = useRef(false);

  const animateToLocation = useCallback((latLng, targetZoom = 15) => {
    if (!mapInstance.current) return;
    mapInstance.current.panTo(latLng);

    let currentZoom = mapInstance.current.getZoom() || 14;
    const zoomInterval = setInterval(() => {
      if (currentZoom === targetZoom) {
        clearInterval(zoomInterval);
      } else {
        currentZoom += currentZoom < targetZoom ? 1 : -1;
        mapInstance.current.setZoom(currentZoom);
      }
    }, 100);
  }, []);

  const setMarker = useCallback((latLng, animateType = "DROP") => {
    if (markerRef.current) {
      markerRef.current.setPosition(latLng);
      markerRef.current.setAnimation(
        animateType === "BOUNCE"
          ? window.google.maps.Animation.BOUNCE
          : window.google.maps.Animation.DROP
      );
      if (animateType === "BOUNCE") {
        setTimeout(() => markerRef.current?.setAnimation(null), 1500);
      }
    }
  }, []);

  const handleUpdate = useCallback(
    (latLng, formattedAddress, animateType = "DROP") => {
      animateToLocation(latLng);
      setMarker(latLng, animateType);
      onChange(formattedAddress);
      setLatLng({
        lat: latLng?.lat,
        lng: latLng?.lng,
      });
    },
    [animateToLocation, setMarker, onChange, setLatLng]
  );

  const reverseGeocode = useCallback(
    (latLng, animateType = "DROP") => {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: latLng }, (results, status) => {
        const foundAddress =
          status === "OK" && results[0] ? results[0].formatted_address : "";
        if (inputRef.current) inputRef.current.value = foundAddress;
        handleUpdate(latLng, foundAddress, animateType);
      });
    },
    [handleUpdate]
  );

  const initMap = useCallback(async () => {
    await loader.load();

    const map = new window.google.maps.Map(mapRef.current, {
      center: defaultCenter,
      zoom: 14,
    });
    mapInstance.current = map;

    const marker = new window.google.maps.Marker({
      map,
      position: defaultCenter,
      draggable: true,
    });
    markerRef.current = marker;

    marker.addListener("dragend", (e) => {
      reverseGeocode({ lat: e.latLng.lat(), lng: e.latLng.lng() }, "DROP");
    });

    const autocomplete = new window.google.maps.places.Autocomplete(
      inputRef.current,
      { fields: ["formatted_address", "geometry"] }
    );
    autocompleteInstance.current = autocomplete;

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (!place.geometry) return;
      handleUpdate(
        {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        },
        place.formatted_address,
        "DROP"
      );
    });

    map.addListener("click", (e) => {
      reverseGeocode({ lat: e.latLng.lat(), lng: e.latLng.lng() }, "DROP");
    });

    animateToLocation(defaultCenter);
    setMarker(defaultCenter, "DROP");

    initializedRef.current = true;
  }, [
    defaultCenter,
    reverseGeocode,
    handleUpdate,
    animateToLocation,
    setMarker,
  ]);

  useEffect(() => {
    if (!initializedRef.current) {
      initMap();
    }
  }, [initMap]);

  useEffect(() => {
    if (!initializedRef.current || !mapInstance.current || !markerRef.current)
      return;

    if (defaultCenter?.lat && defaultCenter?.lng) {
      animateToLocation(defaultCenter);
      setMarker(defaultCenter, "DROP");
      reverseGeocode(defaultCenter, "DROP");
    }
  }, [defaultCenter.lat, defaultCenter.lng]); // minimal dependency

  useEffect(() => {
    if (inputRef.current && inputRef.current.value !== value) {
      inputRef.current.value = value || "";
    }
  }, [value]);

  const handleUseCurrentLocation = useCallback(() => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        reverseGeocode(
          { lat: pos.coords.latitude, lng: pos.coords.longitude },
          "DROP"
        ),
      (err) => {
        console.error(err);
        alert("Unable to retrieve your location");
      }
    );
  }, [reverseGeocode]);

  const handleReset = useCallback(() => {
    inputRef.current.value = "";
    animateToLocation(defaultCenter);
    setMarker(defaultCenter, "BOUNCE");
    onChange("");
  }, [animateToLocation, defaultCenter, onChange, setMarker]);

  const handleFocus = useCallback(() => {
    if (autocompleteInstance.current) {
      const event = new Event("keydown", { bubbles: true });
      inputRef.current.dispatchEvent(event);
    }
  }, []);

  return (
    <div className="mb-3">
      <div className="row g-2">
        <div className="col">
          <input
            ref={inputRef}
            type="text"
            className="form-control"
            placeholder="Search Address"
            onFocus={handleFocus}
            onBlur={onBlur}
            defaultValue={value}
          />
        </div>
        <div className="col-auto">
          <button
            onClick={handleUseCurrentLocation}
            className="action_btn w-100 h-100"
            type="button"
          >
            Use Current Location
          </button>
        </div>
        <div className="col-auto">
          <button
            onClick={handleReset}
            className="btn btn-secondary w-100 h-100"
            type="button"
            style={{ borderRadius: "50px" }}
          >
            Reset
          </button>
        </div>
      </div>
      {error && <ErrorMessage message={error} />}
      <div
        ref={mapRef}
        className="mt-3 rounded"
        style={{ height: "400px", width: "100%" }}
      />
    </div>
  );
}

export default React.memo(AddressSelector);
