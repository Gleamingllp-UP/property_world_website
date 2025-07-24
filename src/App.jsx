import ConnectionStatusPage from "./Custom_Components/ConnectionStatusPage";
import { useNetworkStatus } from "./helper/hook/useNetworkStatus";
// import Assistant from "./pages/home/homeAssistant/Assistant";
import Path from "./router/Path";
import { Toaster } from "react-hot-toast";
import "./i18n/i18n";
import { useDispatch, useSelector } from "react-redux";
import { closeBotPrompt, openBotPrompt } from "./features/user/userSlice";
import { bot } from "./assets/images";
function App() {
  const { isOnline, isSlow, isBackendDown } = useNetworkStatus("/ping");

  const dispatch = useDispatch();
  const { botPromptOpen: show } = useSelector((state) => state?.user);

  const handleBotClicked = () => {
    if (show) {
      dispatch(closeBotPrompt());
    } else {
      dispatch(openBotPrompt());
    }
  };

  if (!isOnline) return <ConnectionStatusPage type="offline" />;
  if (isBackendDown) return <ConnectionStatusPage type="server" />;
  if (isSlow) return <ConnectionStatusPage type="slow" />;

  return (
    <div className="flex flex-col items-center justify-center min-h-svh">
      <Path />
      {/* <Assistant/> */}
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: "",
          duration: 5000,
          removeDelay: 1000,
          style: {
            background: "#fcfafa",
            color: "black",
          },

          success: {
            duration: 3000,
            iconTheme: {
              primary: "green",
              secondary: "white",
            },
          },
        }}
      />
      <button
        className="btn btn-primary rounded-circle shadow p-0" // p-0 removes padding
        onClick={() => handleBotClicked()}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "60px",
          height: "60px",
          overflow: "hidden", 
        }}
      >
        <img
          src={bot}
          alt="Bot"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover", 
          }}
        />
      </button>
    </div>
  );
}

export default App;
