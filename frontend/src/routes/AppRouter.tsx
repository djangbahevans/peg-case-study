import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { PrivateRoute, PublicRoute, AdminRoute } from "."
import { LoginPage, PaymentsPage, SignupPage, UsersPage } from "../pages"
import { HomePage } from "../pages/HomePage"

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Routes>
        <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute><SignupPage /></PublicRoute>} />
        <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
        <Route path="/payments" element={<PrivateRoute><PaymentsPage /></PrivateRoute>} />
        <Route path="/users" element={<AdminRoute><UsersPage /></AdminRoute>} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  </BrowserRouter>
)

export { AppRouter }

