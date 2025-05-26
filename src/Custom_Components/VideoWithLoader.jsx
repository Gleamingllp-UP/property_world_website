import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { video2 } from "../assets/videos"; // fallback video

const VideoWithLoader = ({ src, className, ...props }) => {
  const [loading, setLoading] = useState(true);
  const [errorSrc, setErrorSrc] = useState(null);

  const handleCanPlayThrough = () => setLoading(false);
  const handleError = () => {
    setLoading(false);
    setErrorSrc(video2); // fallback video
  };

  return (
    <div className="position-relative d-flex justify-content-center align-items-center" style={{ height: 300 }}>
      {loading && (
        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-50">
          <Loader2
            className="spinner-border text-light"
            style={{ width: "2rem", height: "2rem" }}
          />
        </div>
      )}
      <video
        width="100%"
        height="100%"
        loop
        muted
        autoPlay
        className={`transition-opacity ${loading ? "opacity-0" : "opacity-100"} ${className}`}
        onCanPlayThrough={handleCanPlayThrough}
        onError={handleError}
        style={{ transition: "opacity 0.3s ease-in-out" }}
        {...props}
      >
        <source src={errorSrc || src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoWithLoader;
