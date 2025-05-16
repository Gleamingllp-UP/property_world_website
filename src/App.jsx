import Path from "./router/Path";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-svh">
      <Path />
      <Toaster
         position="bottom-right"
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
