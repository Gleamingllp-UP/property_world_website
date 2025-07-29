import { useEffect } from "react";
import {  propbot } from "./assets/images";
import { closeBotPrompt, openBotPrompt } from "./features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

export default function BotButton() {
  const { botPromptOpen: show } = useSelector((state) => state?.user);
  const dispatch = useDispatch();

  const handleBotClicked = () => {
    if (show) {
      dispatch(closeBotPrompt());
    } else {
      dispatch(openBotPrompt());
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const tooltip = document.querySelector(".bot-tooltip-left");
      if (tooltip) {
        tooltip.classList.remove("show-initial");
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bot-button-wrapper">
      {/* Tooltip on the left */}

      <div className="bot-tooltip-left show-initial">
        <span>How can I help you?</span>
      </div>
      {/* Button with pulse animation */}

      <button
        className="rounded-circle p-0 "
        onClick={() => handleBotClicked()}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "60px",
          height: "60px",
          overflow: "hidden",
          animation: "pulse 2s infinite",
          transition: "all 0.3s ease",
        }}
      >
        <img
          src={propbot}
          alt="Bot"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `scale(1.2)`,
          }}
        />
      </button>
    </div>
  );
}
