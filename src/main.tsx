import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";
import { Login, Signature } from "./pages";
import ApolloWrapper from "./utils/apolloWrapper";
import { AuthProvider } from "./context";
import App from "./App";
import { ProtectedPage } from "./components";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <ProtectedPage>
        <App />
      </ProtectedPage>
    ),
    children: [
      {
        path: "remuneration/signatures",
        element: <Signature />,
      },
    ],
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
