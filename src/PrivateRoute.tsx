import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

interface PrivateRouteProps {
  element: JSX.Element; // Expecting an element prop (the component to render)
  // path: string;          // Path for the route
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, ...rest }) => {
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated
  );

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
