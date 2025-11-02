import type { JSX } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  // If not logged in, redirect to admin login
  if (!isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  return children;
}
