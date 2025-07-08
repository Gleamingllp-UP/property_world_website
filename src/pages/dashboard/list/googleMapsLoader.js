// src/utils/googleMapsLoader.js
import { Loader } from "@googlemaps/js-api-loader";

const loader = new Loader({
  apiKey: import.meta.env.VITE_GOOGLE_MAP_KEY,
  libraries: ["places"],
  language: "en",
  id: "__googleMapsScriptId", // prevents duplicate script
});

export default loader;
