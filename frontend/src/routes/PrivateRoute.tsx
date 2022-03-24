import { Navigate } from "react-router-dom"
import { Loading } from "../components"
import { useAuth } from "../contexts"

interface IPrivateRouteProps {
  children: JSX.Element
}

const PrivateRoute = ({ children }: IPrivateRouteProps) => {
  const { isAuthenticated, loading } = useAuth()

  if (loading)
    return <Loading />
  else
    return (isAuthenticated) ? children :<Navigate to="/login" />
}

export { PrivateRoute }
