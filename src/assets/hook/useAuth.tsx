import { useContext } from "react";
import { AuthContext } from "../../component/auth/AuthProvider";

export const useAuth = () => {
    return useContext(AuthContext);
}