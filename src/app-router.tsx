import { BrowserRouter, Route, Routes } from "react-router-dom";
import { appPaths } from "./utils/app-paths";
import PrivateRoute from "./common/router-helper/private-route";
import Layout from "./common/ui/layout";
import Dashboard from "./pages/dashbaord/dashboard";
import Login from "./pages/auth/login/login";
import DashboardOverview from "./pages/dashbaord/DashboardOverView";
import Configuration from "./pages/configuration/configuration";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={appPaths.login} element={<Login />} />
        {/* 
        <Route path={appPaths.register} element={<Registration />} />
        <Route path={appPaths.forgotPassword} element={<ResetPassword />} />
        <Route path={appPaths.verification} element={<Verification />} />
        <Route path={appPaths.verifyCode} element={<VerifyResetCode />} />
        <Route path={appPaths.newPassword} element={<NewPassword />} /> */}

        <Route
          path={appPaths.dashboard}
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route
            index
            path={"/"}
            element={
              <PrivateRoute>
                <DashboardOverview />
              </PrivateRoute>
            }
          />
          <Route path={appPaths.configuration} element={<Configuration />} />
        </Route>
        {/* <Route path={"/*"} element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
