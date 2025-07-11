import { useContext } from "react";

import { AuthContext } from "../context";

export default function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth should be used in AuthProvider");
  }

  return context;
}
