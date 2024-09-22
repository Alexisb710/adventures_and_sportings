import { useContext } from "react";
import { AppContext } from "../AppContext";
import { Navigate } from "react-router-dom";

// Route protection for Admin users
export function AdminRoute({ children }) {
  const { userCredentials } = useContext(AppContext);

  // If no user is logged in or the user is not an admin, redirect to home
  if (!userCredentials || userCredentials.role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
}

// Route protection for any authenticated user
export function AuthenticatedUserRoute({ children }) {
  const { userCredentials } = useContext(AppContext);

  // If no user is logged in, redirect to home
  if (!userCredentials) {
    return <Navigate to="/" />;
  }

  return children;
}

// Route protection for visitors (unauthenticated users)
export function VisitorRoute({ children }) {
  const { userCredentials } = useContext(AppContext);

  // If a user is logged in, redirect to home
  if (userCredentials) {
    return <Navigate to="/" />;
  }

  return children;
}
