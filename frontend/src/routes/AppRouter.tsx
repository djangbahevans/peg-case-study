import { DarkMode, LightMode } from "@mui/icons-material"
import { Fab } from "@mui/material"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { AdminRoute, PrivateRoute, PublicRoute } from "."
import { PaymentsTable, ReservationsTable, UsersTable } from "../components"
import { useTheme } from "../contexts"
import { Dashboard, LoginPage, SignupPage } from "../pages"


const AppRouter = () => {
  const { toggleTheme, mode } = useTheme()

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>}>
            <Route path="/" element={<ReservationsTable />} />
            <Route path="/payments" element={<PaymentsTable />} />
            <Route path="/users" element={<AdminRoute><UsersTable /></AdminRoute>} />
          </Route>
          <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
          <Route path="/signup" element={<PublicRoute><SignupPage /></PublicRoute>} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
        <Fab onClick={() => {
          toggleTheme()
        }} color="primary" sx={{ position: "absolute", right: 16, bottom: 16 }}>
          {mode === "light" ? <LightMode /> : <DarkMode />}
        </Fab>
      </div>
    </BrowserRouter>
  )
}

export { AppRouter }

