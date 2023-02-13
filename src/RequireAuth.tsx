import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./assets/hook/useAuth";

const RequireAuth = ({ allowedRoles }: any) => {
    const { username, roles } = useAuth();
    const location = useLocation();

    return (
        roles?.find((role: any) => allowedRoles?.includes(role))
            ? <Outlet />
            : username
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/signin" state={{ from: location }} replace />
    );
}

export default RequireAuth;