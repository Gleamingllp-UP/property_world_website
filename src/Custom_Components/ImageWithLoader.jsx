import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { blog_image } from "../assets/images";

const ImageWithLoader = ({ src, alt, className }) => {
  const [loading, setLoading] = useState(true);

  const handleLoad = () => setLoading(false);
  const handleError = (e) => {
    e.target.onerror = null;
    e.target.src = blog_image;
    setLoading(false);
  };

  return (
    <div
      className="position-relative d-flex justify-content-center align-items-center"
      // style={{ height: "40px", width: "40px" }}
    >
      {loading && (
        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center">
          <Loader2
            className="spin text-secondary"
            style={{ width: "1rem", height: "1rem" }}
          />
        </div>
      )}
      <img
        src={src || blog_image}
        alt={alt}
        className={`img-fluid object-fit-cover transition-opacity ${
          loading ? "opacity-0" : "opacity-100"
        } ${className}`}
        onLoad={handleLoad}
        onError={handleError}
        style={{ transition: "opacity 0.3s ease-in-out" }}
      />
    </div>
  );
};

export default ImageWithLoader;
