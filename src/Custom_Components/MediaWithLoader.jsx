import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { video2 } from "../assets/images";

const isVideo = (url) => {
  return url?.match(/\.(mp4|webm|ogg)$/i);
};

const MediaWithLoader = ({
  setIsImgLoaded,
  src,
  alt = "",
  className = "",
  height = 300,
  ...props
}) => {
  const [loading, setLoading] = useState(true);
  const [errorSrc, setErrorSrc] = useState(null);

  const handleLoad = () => setLoading(false);
  const handleError = () => {
    setLoading(false);
    setIsImgLoaded(false);
    setErrorSrc(isVideo(src) ? video2 : video2);
  };

  useEffect(() => {
    if (!src) {
      const fallback = isVideo(src) ? video2 : video2;
      setErrorSrc(fallback);
      setLoading(false);
      setIsImgLoaded?.(false);
    }
  }, [src, setIsImgLoaded]);
  const finalSrc = errorSrc || src;

  return (
    <>
      {loading && (
        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-50">
          <Loader2
            className="spin text-light"
            style={{ width: "2rem", height: "2rem" }}
          />
        </div>
      )}

      {isVideo(finalSrc) ? (
        <video
          width="100%"
          height={height}
          loop
          muted
          autoPlay
          className={`transition-opacity ${
            loading ? "opacity-0" : "opacity-100"
          } ${className}`}
          onCanPlayThrough={handleLoad}
          onError={handleError}
          style={{ transition: "opacity 0.3s ease-in-out" }}
          {...props}
        >
          <source src={finalSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <img
          src={finalSrc}
          alt={alt}
          className={`img-fluid object-fit-cover transition-opacity w-100 h-100 ${
            loading ? "opacity-0" : "opacity-100"
          } ${className}`}
          onLoad={handleLoad}
          onError={handleError}
          style={{ transition: "opacity 0.3s ease-in-out" }}
          {...props}
        />
      )}
    </>
  );
};

export default React.memo(MediaWithLoader);
