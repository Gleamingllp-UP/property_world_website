import { useEffect, useState } from "react";

export const useNetworkStatus = (backendUrl = "/ping", threshold = 3000) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isSlow, setIsSlow] = useState(false);
  const [isBackendDown, setIsBackendDown] = useState(false);

  useEffect(() => {
    const checkNetwork = () => setIsOnline(navigator.onLine);

    window.addEventListener("online", checkNetwork);
    window.addEventListener("offline", checkNetwork);

    const testBackend = async () => {
      if (!navigator.onLine) {
        setIsOnline(false);
        setIsBackendDown(false);
        setIsSlow(false);
        return;
      }

      const start = performance.now();
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), threshold + 2000);

        const res = await fetch(
          import.meta.env.VITE_BASE_API_URL + backendUrl,
          {
            method: "GET",
            cache: "no-store",
            signal: controller.signal,
          }
        );

        clearTimeout(timeout);

        if (!res.ok) {
          setIsBackendDown(true);
          return;
        }

        const duration = performance.now() - start;
        setIsOnline(true);
        setIsSlow(duration > threshold);
        setIsBackendDown(false);
      } catch (err) {
        setIsBackendDown(true);
      }
    };

    testBackend();
    const interval = setInterval(testBackend, 15000);

    return () => {
      window.removeEventListener("online", checkNetwork);
      window.removeEventListener("offline", checkNetwork);
      clearInterval(interval);
    };
  }, [backendUrl, threshold]);

  return { isOnline, isSlow, isBackendDown };
};
