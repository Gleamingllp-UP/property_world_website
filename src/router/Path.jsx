import React, { Suspense } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import Layout from "@/layout/index";
import PrivateRoute from "./PrivateRoute";
import Loader from "@/Custom_Components/Loader";
import PageNotFound from "@/Custom_Components/PageNotFound/PageNotFound";
import ErrorBoundary from "@/Custom_Components/ErrorBoundary/ErrorBoundary";
import Index from '../pages/dashboard/layout/Index';
function Path() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loader />}>
        <Router>
          <Routes>
            <Route path="*" element={<PageNotFound />} />
            {routes
              .filter((route) => !route.isPrivate )
              .map(({ id, path, Component }) => (
                <Route key={id} path={path} element={<Component />} />
              ))}

            <Route element={<Layout />}>
              {routes
                .filter((route) => route?.isPrivate && !route?.isDashboard)
                .map(({ id, path, Component }) => (
                  <Route
                    key={id}
                    path={path}
                    element={
                      <PrivateRoute>
                        <Component />
                      </PrivateRoute>
                    }
                  />
                ))}
            </Route>


         <Route element={<Index />}>
              {routes
                .filter((route) => route?.isPrivate && route?.isDashboard)
                .map(({ id, path, Component }) => (
                  <Route
                    key={id}
                    path={path}
                    element={
                      <PrivateRoute>
                        <Component />
                      </PrivateRoute>
                    }
                  />
                ))}
            </Route>

          </Routes>
        </Router>
      </Suspense>
    </ErrorBoundary>
  );
}

export default Path;
