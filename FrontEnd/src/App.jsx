import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import HomePage from "./pages/home/HomePage";
import CourseSearchPage from "./pages/home/CourseSearchPage";
import LoginPage from "./pages/auth/LoginPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import VerifyEmailPage from "./pages/auth/VerifyEmailPage";
import RegisterPage from "./pages/auth/RegisterPage";
import DashboardPage from "./pages/customer/DashboardPage";
import InstructorDashboardPage from "./pages/provider/InstructorDashboardPage";
import InstructorProfilePage from "./pages/provider/InstructorProfilePage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminUsersPage from "./pages/admin/AdminUsersPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./layouts/AdminLayout";
import CustomerLayout from "./layouts/CustomerLayout";
import CustomerDashboardLayout from "./layouts/CustomerDashboardLayout";
import ChangePasswordPage from "./pages/customer/ChangePasswordPage";
import AccountSettingPage from "./pages/customer/AccountSettingPage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Customer layout */}
            <Route path="/" element={<CustomerLayout />}>
              <Route index element={<HomePage />} />

              <Route path="all-courses" element={<CourseSearchPage />} />
              <Route path="development" element={<Navigate to="courses/search" replace />} />

              <Route path="courses-provider" element={<InstructorProfilePage />} />
            </Route>

          {/* Customer dashboard */}
            <Route path="/user" element={<CustomerDashboardLayout />}>
    
              <Route
                path="dashboard"
                element={
                  <ProtectedRoute roles={["customer"]}>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="change-password"
                element={
                  <ProtectedRoute roles={["customer"]}>
                    <ChangePasswordPage />
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="account-settings"
                element={
                  <ProtectedRoute roles={["customer"]}>
                    <AccountSettingPage />
                  </ProtectedRoute>   
                }
              />
            </Route>

          {/* Provider / Instructor */}
          <Route
            path="/instructor/dashboard"
            element={
              <ProtectedRoute roles={["provider"]}>
                <InstructorDashboardPage />
              </ProtectedRoute>
            }
          />

          {/* Admin */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute roles={["admin"]}>
                <AdminDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute roles={["admin"]}>
                <AdminLayout title="Users">
                  <AdminUsersPage />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          {/* Auth */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
