import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Homepage from "./components/Home";
import Login from "./components/auth/Login";
import UserRegister from "./components/auth/userRegister";
import MainLayout from "./components/MainLayout";
import { AuthProvider } from "./components/auth/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import BookOrder from "./components/order/BookOrder";
import UserHistory from "./components/order/UserHistory";
import VendorPendingOrders from "./components/vendor/VendorPendingOrders";
import VendorServicesManager from "./components/vendor/VendorServicesManager";
import AddNewVendorService from "./components/vendor/AddNewVendorService";
import VendorRegistrationView from "./components/admin/VendorRegistrationView";
import ProfilePage from "./components/accounts/Profile";
import VendorGrid from "./components/dashboardUtils/VendorGrid";
import { mockVendors } from "./components/data/duplicatedata";
import RoleProtectedRoute from "./components/auth/RoleProtectedRoute";
import RoleRedirect from "./components/auth/RoleRedirect";
import VendorDetail from "./components/dashboardUtils/vendordetail";
import ServiceManager from "./components/admin/SerivceManager";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Layout pages */}
          <Route
            path="/"
            element={
              <MainLayout>
                <Homepage />
              </MainLayout>
            }
          />
          <Route
            path="/login"
            element={
              <MainLayout>
                <Login />
              </MainLayout>
            }
          />
          <Route
            path="/register"
            element={
              <MainLayout>
                <UserRegister />
              </MainLayout>
            }
          />

          {/* Protected dashboard */}

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            {/* Default path — role-based redirect */}
            <Route path="" element={<RoleRedirect />} />

            {/* User role */}
            <Route
              path="book-order"
              element={
                <RoleProtectedRoute allowedRoles={["user"]}>
                  <BookOrder />
                </RoleProtectedRoute>
              }
            />
            <Route
              path="history"
              element={
                <RoleProtectedRoute allowedRoles={["user"]}>
                  <UserHistory />
                </RoleProtectedRoute>
              }
            />

            <Route
              path="home"
              element={
                <RoleProtectedRoute allowedRoles={["user"]}>
                  <VendorGrid />
                </RoleProtectedRoute>
              }
            />

            <Route
              path="detail/:id"
              element={
                <RoleProtectedRoute allowedRoles={["user"]}>
                  <VendorDetail />
                </RoleProtectedRoute>
              }
            />

            <Route
              path="profile"
              element={
                <RoleProtectedRoute allowedRoles={["user"]}>
                  <ProfilePage />
                </RoleProtectedRoute>
              }
            />



            {/* Vendor role */}
            <Route
              path="pending-orders"
              element={
                <RoleProtectedRoute allowedRoles={["vendor"]}>
                  <VendorPendingOrders />
                </RoleProtectedRoute>
              }
            />
            <Route
              path="services"
              element={
                <RoleProtectedRoute allowedRoles={["vendor"]}>
                  <VendorServicesManager />
                </RoleProtectedRoute>
              }
            />
            <Route
              path="add-service"
              element={
                <RoleProtectedRoute allowedRoles={["vendor"]}>
                  <AddNewVendorService />
                </RoleProtectedRoute>
              }
            />

            {/* Admin role */}
            <Route
              path="vendor-registrations"
              element={
                <RoleProtectedRoute allowedRoles={["admin"]}>
                  <VendorRegistrationView />
                </RoleProtectedRoute>
              }
            />
            <Route
              path="all-services"
              element={
                <RoleProtectedRoute allowedRoles={["admin"]}>
                  <ServiceManager />
                </RoleProtectedRoute>
              }
            />

            {/* Shared */}

          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
