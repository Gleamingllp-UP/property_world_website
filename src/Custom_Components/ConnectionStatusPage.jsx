import { useNavigate } from "react-router-dom";

function ConnectionStatusPage({ type }) {
  const navigate = useNavigate();

  const content = {
    offline: {
      icon: "📡",
      title: "No Internet Connection",
      message: "Please check your network and try again.",
    },
    slow: {
      icon: "🐢",
      title: "Slow Internet Connection",
      message: "Your connection is slow. Some features may not work smoothly.",
    },
    server: {
      icon: "🚧",
      title: "Backend Server Issue",
      message: "We’re having trouble connecting to the server. Please try later.",
    },
  };

  const { icon, title, message } = content[type] || {};

  return (
    <div className="vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="container px-4">
        <div
          className="mx-auto p-5 rounded-2 shadow-lg text-center"
          style={{ maxWidth: "800px", backdropFilter: "blur(5px)" }}
        >
          <h1 className="display-1 fw-bold mb-3">{icon}</h1>
          <p className="fs-3 mb-3">{title}</p>
          <p className="mb-4 fw-medium">{message}</p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <button
              onClick={() => window.location.reload()}
              className="btn btn-light px-4 py-2 shadow-sm"
            >
              Retry
            </button>
            <button
              onClick={() => navigate("/")}
              className="btn btn-light px-4 py-2 shadow-sm"
            >
              Go Back Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConnectionStatusPage