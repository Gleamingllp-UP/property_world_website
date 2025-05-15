import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
// import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./assets/css/bootstrap.min.css";
import "./assets/css/slick-theme.min.css";
import "./assets/css/reset.min.css";
import "./assets/css/slick.css";
import "./assets/css/style.css";
import "./assets/css/custom.css";
import "./index.css";

import { Provider } from "react-redux";
import { store } from "./app/store";
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
