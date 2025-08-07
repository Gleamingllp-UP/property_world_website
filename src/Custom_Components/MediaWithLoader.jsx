import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

const isVideo = (url) => {
  return url?.match(/\.(mp4|webm|ogg|mov|avi|mkv)$/i);
};

const MediaWithLoader = ({
  setIsImgLoaded = () => {},
  src,
  alt = "",
  className = "",
  height = 300,
  controls = true,
  muted = true,
  loop = true,
  autoPlay = true,
  fallbackText = "Media not available",
  ...props
}) => {
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!src) {
      setHasError(true);
      setLoading(false);
      setIsImgLoaded(false);
    } else {
      setHasError(false);
      setLoading(true);
    }
  }, [src]);

  const handleLoad = () => {
    setLoading(false);
    setIsImgLoaded(true);
  };

  const handleError = () => {
    setLoading(false);
    setHasError(true);
    setIsImgLoaded(false);
  };

  if (hasError) {
    return (
      <div
        className={`w-100 d-flex justify-content-center align-items-center bg-light border rounded text-center ${className}`}
        style={{ height }}
      >
        <p
          className="text-muted fw-medium small mb-0"
          style={{
            textTransform: "none",
          }}
        >
          {fallbackText}
        </p>
      </div>
    );
  }

  return (
    <div className={`position-relative ${className}`} style={{ height }}>
      {loading && (
        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-50 rounded">
          <span
            className="spinner-border text-white"
            style={{ width: "1.5rem", height: "1.5rem" }}
          ></span>
        </div>
      )}

      {isVideo(src) ? (
        <video
          src={src}
          height={height}
          width="100%"
          loop={loop}
          muted={muted}
          autoPlay={autoPlay}
          controls={controls}
          onCanPlay={handleLoad}
          onError={handleError}
          className={`w-100 h-100 object-fit-cover rounded transition-opacity ${
            loading ? "opacity-0" : "opacity-100"
          }`}
          {...props}
        />
      ) : (
        <img
          src={src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          className={`w-100 h-100 object-fit-cover rounded transition-opacity ${
            loading ? "opacity-0" : "opacity-100"
          }`}
          {...props}
        />
      )}
    </div>
  );
};

export default React.memo(MediaWithLoader);
