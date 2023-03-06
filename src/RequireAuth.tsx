import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./component/auth/useAuth";

const RequireAuth = ({ allowedRoles }: any) => {
    const { username, roles } = useAuth();
    const location = useLocation();

    return (
        roles?.find((role: any) => allowedRoles?.includes(role))
            ? <Outlet />
            : username
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;