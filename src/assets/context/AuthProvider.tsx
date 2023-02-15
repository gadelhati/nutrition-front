import { createContext, useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
import { initialAuth } from "../../component/auth/auth.initial";
import { Auth } from "../../component/auth/auth.interface";
import { getUser } from "../../service/service.token";

const AuthContext = createContext<Auth>({} as Auth);

export const AuthProvider = ({ children }: any) => {
    // const dispatch = useDispatch();
    const [state, setState] = useState<Auth>(initialAuth)

    // useEffect(() => {
    //     setState(getUser())
    //   }, [dispatch]);
    return (
        <AuthContext.Provider value={state}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;