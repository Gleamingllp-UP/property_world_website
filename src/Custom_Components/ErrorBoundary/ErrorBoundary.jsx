import React, { Component } from "react";
// import { Button } from "@/components/ui/button";
import { bgErrorBoundary } from "@/assets/images";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="vh-100 d-flex align-items-center justify-content-center text-white"
          style={{
            backgroundImage: `url(${bgErrorBoundary})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="container px-4">
            <div
              className="mx-auto p-5 rounded-2 shadow-lg text-center"
              style={{
                maxWidth: "800px",
                backdropFilter: "blur(10px)",
              }}
            >
              <h1 className="display-1 fw-bold mb-3">Oops!</h1>
              <p className="fs-3 mb-3">Something went wrong</p>
              <p className="mb-4 fw-medium">
                We encountered an error, but don’t worry. We’re working on it.
              </p>
              <div className="d-flex justify-content-center gap-3 flex-wrap">
                <button
                  onClick={() => window.location.reload()}
                  className="btn btn-light px-4 py-2 shadow-sm"
                >
                  Reload Page
                </button>
                <button
                  onClick={() => window.history.back()}
                  className="btn btn-outline-light px-4 py-2"
                >
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
