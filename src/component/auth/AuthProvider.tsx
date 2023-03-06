import { createContext, useEffect, useState } from "react";
import { getToken, getUserName } from "../../service/service.token";
import { initialAuth } from "./auth.initial";
import { Auth } from "./auth.interface";

const AuthContext = createContext<Auth>({} as Auth);

export const AuthProvider = ({ children }: any) => {
    const [state, setState] = useState<Auth>(initialAuth)

    useEffect(() => {
        setState(getToken())
    }, []);
    return (
        <AuthContext.Provider value={state}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;