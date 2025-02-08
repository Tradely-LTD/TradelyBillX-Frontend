import { BrowserRouter, Route, Routes } from "react-router-dom";
import { appPaths } from "./utils/app-paths";
import PrivateRoute from "./common/router-helper/private-route";
import Layout from "./common/ui/layout";
import Login from "./pages/auth/login/login";
import DashboardOverview from "./pages/dashbaord/DashboardOverView";
import Configuration from "./pages/configuration/configuration";
import UserManagement from "./pages/users/user-management";
import UserForm from "./pages/users/components/user-form";
import LocationManagement from "./pages/location/location-management";
import LocationForm from "./pages/location/components/location-form";

import Waybill from "./pages/waybill/Waybill";
import Register from "./pages/auth/register/register";
import TransactionHistory from "./pages/transaction/transaction-history";
import Transaction from "./pages/transaction/transaction";
import Incidents from "./pages/incident/incidents";
import IncidentForm from "./pages/incident/components/incident-form";
import IncidentPreview from "./pages/incident/components/incident-preview";
import ActivityLogs from "./pages/ActivityLogs/activity-logs";
import CommisionTracker from "./pages/commission/commission";
function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={appPaths.login} element={<Login />} />
        <Route path={appPaths.register} element={<Register />} />
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
          <Route path={appPaths.location} element={<LocationManagement />} />
          <Route path={`${appPaths.location}/:id`} element={<LocationForm mode="create" />} />
          <Route path={appPaths.users} element={<UserManagement />} />
          <Route path={`${appPaths.users}/add`} element={<UserForm mode="create" />} />
          <Route path={`${appPaths.users}/:id`} element={<UserForm mode="update" />} />
          <Route path={appPaths.waybil} element={<Waybill />} />
          <Route path={`${appPaths.user}/:id`} element={<UserForm mode="update" />} />
          <Route path={appPaths.transaction} element={<TransactionHistory />} />
          <Route path={`${appPaths.transaction}/:id`} element={<Transaction />} />
          <Route path={appPaths.incident} element={<Incidents />} />
          <Route path={`${appPaths.incident}/new`} element={<IncidentForm />} />
          <Route path={`${appPaths.incident}/preview`} element={<IncidentPreview />} />
          <Route path={`${appPaths.activity}`} element={<ActivityLogs />} />
          <Route path={`${appPaths.commission}`} element={<CommisionTracker />} />
        </Route>
        {/* <Route path={"/*"} element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
