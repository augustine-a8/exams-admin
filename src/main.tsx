import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";
import { Login } from "./pages";
import ApolloWrapper from "./utils/apolloWrapper";
import { AuthProvider } from "./context";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <ApolloWrapper>
        <RouterProvider router={router} />
      </ApolloWrapper>
    </AuthProvider>
  </StrictMode>
);
