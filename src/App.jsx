import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Homepage from "./components/Home";
import Login from "./components/auth/Login";
import UserRegister from "./components/auth/userRegister";
import MainLayout from "./components/MainLayout";
import BookOrder from "./components/order/BookOrder";
import UserHistory from "./components/order/UserHistory";
import VendorPendingOrders from "./components/vendor/VendorPendingOrders";
import VendorServicesManager from "./components/vendor/VendorServicesManager";
import AddNewVendorService from "./components/vendor/AddNewVendorService";
import VendorRegistrationView from "./components/admin/VendorRegistrationView";
import VendorGrid from "./components/user/VendorGrid";
import VendorDetail from "./components/user/vendordetail";
import Cart from "./components/user/Cart";
import ServiceManager from "./components/admin/SerivceManager";
import AddNewAdmin from "./components/admin/AddAdmin";
import UserProfile from "./components/accounts/UserProfile";
import { AuthProvider } from "./components/security/AuthContext";
import ProtectedRoute from "./components/security/ProtectedRoute";
import RoleRedirect from "./components/security/RoleRedirect";
import RoleProtectedRoute from "./components/security/RoleProtectedRoute";
import VendorProfile from "./components/vendor/VendorProfile";
import { ThemeProvider } from "./components/ThemeContext";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
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
                path="cart"
                element={
                  <RoleProtectedRoute allowedRoles={["user"]}>
                    <Cart />
                  </RoleProtectedRoute>
                }
              />

              <Route
                path="profile"
                element={
                  <RoleProtectedRoute allowedRoles={["user"]}>
                    <UserProfile />
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
              <Route
                path="vendor-profile"
                element={
                  <RoleProtectedRoute allowedRoles={["vendor"]}>
                    <VendorProfile />
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
              <Route
                path="add-admin"
                element={
                  <RoleProtectedRoute allowedRoles={["admin"]}>
                    <AddNewAdmin />
                  </RoleProtectedRoute>
                }
              />
              {/* Shared */}
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
