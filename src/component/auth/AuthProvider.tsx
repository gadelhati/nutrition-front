import { createContext, useEffect, useState } from "react";
import { getToken, getUserName, isValidToken } from "../../service/service.token";
import { initialAuth } from "./auth.initial";
import { Auth } from "./auth.interface";

export const AuthContext = createContext<Auth>({} as Auth);

export const AuthProvider = ({ children }: any) => {
    const [state, setState] = useState<Auth>(initialAuth)

    useEffect(() => {
        if (getToken() != null && isValidToken()) setState(getToken())
    }, []);
    return (
        <AuthContext.Provider value={state}>
            {children}
        </AuthContext.Provider>
    )
}