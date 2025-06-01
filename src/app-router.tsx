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
import Waybill from "./pages/waybill/components/Waybill";
import Register from "./pages/auth/register/register";
import TransactionHistory from "./pages/transaction/transaction-history";
import Transaction from "./pages/transaction/transaction";
import Incidents from "./pages/incident/incidents";
import IncidentForm from "./pages/incident/components/incident-form";
import IncidentPreview from "./pages/incident/components/incident-preview";
import ActivityLogs from "./pages/ActivityLogs/activity-logs";
import CommisionTracker from "./pages/commission/commission";
import WaybillsList from "./pages/waybill/waybills-list";
import WaybillReceipt from "./pages/components/waybill-receipt";
import WaybillPreview from "./pages/waybill/waybill-preview";
import withRoleAccess from "./common/router-helper/withRole";
import { Unauthorized } from "./pages/components/unauthorized-component";
import UnionManagement from "./pages/union/union-management";
import UnionForm from "./pages/union/components/union-form";
import LandingPage from "./pages/landing";

// Apply role-based access control
const WaybillComponent = withRoleAccess(["agent"])(Waybill);
const UserManagementComponent = withRoleAccess(["superadmin", "admin"])(UserManagement);
const UserFormComponent = withRoleAccess(["superadmin", "admin"])(UserForm);
const LocationManagementComponent = withRoleAccess(["superadmin"])(LocationManagement);
const LocationFormComponent = withRoleAccess(["superadmin"])(LocationForm);
const UnionManagementComponent = withRoleAccess(["superadmin"])(UnionManagement);
const UnionFormComponent = withRoleAccess(["superadmin"])(UnionForm);
const CommisionTrackerComponent = withRoleAccess(["superadmin"])(CommisionTracker);

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={appPaths.login} element={<Login />} />
        <Route path={`${appPaths.receipt}/:id`} element={<WaybillReceipt />} />
        <Route path={appPaths.register} element={<Register />} />
        <Route path={"/"} element={<LandingPage />} />

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
            path={"/dashboard"}
            element={
              <PrivateRoute>
                <DashboardOverview />
              </PrivateRoute>
            }
          />
          <Route path={appPaths.configuration} element={<Configuration />} />
          <Route path={appPaths.location} element={<LocationManagementComponent />} />
          <Route path={appPaths.union} element={<UnionManagementComponent />} />
          <Route path={`${appPaths.union}/add`} element={<UnionFormComponent />} />
          <Route path={`${appPaths.location}/add`} element={<LocationFormComponent />} />
          <Route path={appPaths.users} element={<UserManagementComponent />} />
          <Route path={`${appPaths.users}/add`} element={<UserFormComponent mode="create" />} />
          <Route path={`${appPaths.users}/:id`} element={<UserFormComponent mode="update" />} />
          <Route path={appPaths.waybil} element={<WaybillComponent />} />
          <Route path={`${appPaths.waybil}/list`} element={<WaybillsList />} />
          <Route path={`${appPaths.waybil}/:id`} element={<WaybillPreview />} />
          <Route path={`${appPaths.user}/:id`} element={<UserFormComponent mode="update" />} />
          <Route path={appPaths.transaction} element={<TransactionHistory />} />
          <Route path={`${appPaths.transaction}/:id`} element={<Transaction />} />
          <Route path={appPaths.incident} element={<Incidents />} />
          <Route path={`${appPaths.incident}/new`} element={<IncidentForm />} />
          <Route path={`${appPaths.incident}/:id`} element={<IncidentPreview />} />
          <Route path={`${appPaths.receipt}/:id`} element={<WaybillReceipt />} />
          <Route path={`${appPaths.activity}`} element={<ActivityLogs />} />
          <Route path={`${appPaths.commission}`} element={<CommisionTrackerComponent />} />
          <Route path={`${appPaths.unauthorized}`} element={<Unauthorized />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
