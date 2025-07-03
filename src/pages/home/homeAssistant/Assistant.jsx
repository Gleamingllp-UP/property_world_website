import React, { useEffect } from "react";

const Assistant = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://cdn.jotfor.ms/agent/embedjs/0197cb10b06277f7b341f7951e515d0c3118/embed.js?skipWelcome=1&maximizable=1";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      // Optional: Clean up script when component unmounts
      document.body.removeChild(script);
    };
  }, []);

  return <div id="jotform-bot-container " className="jfAgentLauncher"></div>;
};

export default Assistant;
