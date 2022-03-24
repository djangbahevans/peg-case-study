import { Navigate } from "react-router-dom"
import { Loading } from "../components"
import { useAuth } from "../contexts"

interface IAdminRouteProps {
  children: JSX.Element
}

const AdminRoute = ({ children }: IAdminRouteProps) => {
  const { isAuthenticated, loading, user } = useAuth()

  if (loading)
    return <Loading />
  else if (isAuthenticated)
    return (user?.is_admin) ? children : <Navigate to="/" />
  else
    return <Navigate to="/login" />
}

export { AdminRoute }
