import { Fragment, ReactNode } from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }: { children: ReactNode }) {
  //   const { isAuthenticated } = useUserSlice();
  const isAuthenticated = true;
  return <Fragment>{isAuthenticated ? children : <Navigate to="/login" />}</Fragment>;
}

export default PrivateRoute;
