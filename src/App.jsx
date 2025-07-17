import ConnectionStatusPage from "./Custom_Components/ConnectionStatusPage";
import { useNetworkStatus } from "./helper/hook/useNetworkStatus";
// import Assistant from "./pages/home/homeAssistant/Assistant";
import Path from "./router/Path";
import { Toaster } from "react-hot-toast";
import "./i18n/i18n";
function App() {

 const { isOnline, isSlow, isBackendDown } = useNetworkStatus("/ping");

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
    </div>
  );
}

export default App;
