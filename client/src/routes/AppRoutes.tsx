import { Routes, Route } from "react-router-dom";
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import ProtectedRoute from "./ProtectedRoutes";


// Import your protected pages here
const Dashboard = () => <div>Dashboard</div>; // Placeholder
const Profile = () => <div>Profile</div>; // Placeholder
const NotFound = () => <div>404 - Not Found</div>; // Placeholder
const Unauthorized = () => <div>401 - Unauthorized</div>; // Placeholder

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" Component={SignIn} />
      <Route path="/signup" Component={SignUp} />
      <Route path="/unauthorized" Component={Unauthorized} />

      {/* Protected Routes - All Users */}
      <Route element={<ProtectedRoute />}>
        <Route path="/profile" Component={Profile} />
      </Route>

      {/* Protected Routes - Guardian Only */}
      <Route element={<ProtectedRoute allowedRoles={['gurardian']} />}>
        <Route path="/dashboard" Component={Dashboard} />
      </Route>

      {/* Protected Routes - Admin Only */}
      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route 
          path="/admin/*" 
          Component={() => <div>Admin Panel</div>} 
        />
      </Route>

      {/* Not Found Route */}
      <Route path="*" Component={NotFound} />
    </Routes>
  );
};

export default AppRoutes;
