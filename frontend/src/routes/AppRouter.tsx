import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { AdminRoute, PrivateRoute, PublicRoute } from "."
import { PaymentsTable, ReservationsTable, UsersTable } from "../components"
import { LoginPage, SignupPage } from "../pages"
import { HomePage } from "../pages/HomePage"

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Routes>
        <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>}>
          <Route path="/" element={<ReservationsTable/>} />
          <Route path="/payments" element={<PaymentsTable />} />
          <Route path="/users" element={<AdminRoute><UsersTable /></AdminRoute>} />
        </Route>
        <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute><SignupPage /></PublicRoute>} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  </BrowserRouter>
)

export { AppRouter }
