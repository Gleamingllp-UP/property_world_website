import App from "./App";
import { useInitializeUser } from "./helper/hook/useInitializeUser";

export default function InitializeApp() {
  const isUserReady = useInitializeUser();

  if (!isUserReady) {
    return (
      <div className="loader-overlay">
        <span className="loader"></span>
      </div>
    );
  }

  return <App />;
}
