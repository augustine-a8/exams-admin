import { useQuery } from "@apollo/client";
import { ClipLoader } from "react-spinners";
import { Navigate } from "react-router";
import { IS_LOGGED_IN } from "../api";
import type { PropsWithChildren } from "react";

const ProtectedPage = ({ children }: PropsWithChildren) => {
  const { data, loading } = useQuery(IS_LOGGED_IN);

  if (loading) {
    return (
      <div className="w-[100vw] h-[100vh] grid place-items-center">
        <ClipLoader size={24} color="black" />
      </div>
    );
  }

  if (data && data.isLoggedIn.loggedIn && data.isLoggedIn.user === "admin") {
    return children;
  }

  return <Navigate to="/login" replace />;
};

export default ProtectedPage;
