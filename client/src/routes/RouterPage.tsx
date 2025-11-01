import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/Auth/login/Login";
import Signup from "../pages/Auth/signup/Signup";
import PublicRoute from "./PrivateRoute";
import ProtectedRoute from "./PublicRoute";
import Home from "../pages/Home";
import ForgetPassword from "../pages/Auth/forget/ForgetPassword";
import ResetPassword from "../pages/Auth/reset/ResetPassword";

const RouterPage = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Navigate to={"/login"} replace />} />
        {/* Public Routes */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />
        <Route
          path="/forgetpassword"
          element={
            <PublicRoute>
              <ForgetPassword />
            </PublicRoute>
          }
        />
        <Route
          path="/resetpassword"
          element={
            <PublicRoute>
              <ResetPassword />
            </PublicRoute>
          }
        />

        {/* Private Routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default RouterPage;
