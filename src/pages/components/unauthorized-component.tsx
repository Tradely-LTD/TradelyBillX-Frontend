import { Navigate } from "react-router-dom";
import { useUserSlice } from "../auth/authSlice";

export function Unauthorized() {
  const { isAuthenticated } = useUserSlice();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-[50vh] w-full flex flex-col items-center justify-center  px-4">
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-bold text-gray-900">401</h1>
        <p className="text-xl text-gray-600">Oops! Access Denied</p>
        <p className="text-2xl font-semibold text-red-600">
          You are not authorized to access this page
        </p>
        <p className="text-gray-500 max-w-md mx-auto">
          Please ensure you have the necessary permissions or contact your administrator for
          assistance.
        </p>
      </div>
    </div>
  );
}
