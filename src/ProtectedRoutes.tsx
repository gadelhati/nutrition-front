import { Navigate } from "react-router-dom";
import { useAuth } from "./assets/hook/useAuth";

export type ProtectedRouteProps = {
    isAuthenticated: boolean;
    authenticationPath: string;
    outlet: JSX.Element;
    allowedRoles: string;
};

export const ProtectedRoute = ({ isAuthenticated, authenticationPath, outlet, allowedRoles }: ProtectedRouteProps) => {
    const { roles } = useAuth();
    
    if (isAuthenticated) {
        return outlet;
    } else {
        return <Navigate to={{ pathname: authenticationPath }} />;
    }
};