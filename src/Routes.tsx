import { useRoutes } from "react-router-dom";
import { initialUser } from "./component/user/user.initial";
import { GenericForm } from "./container/form/generic.form";
import { UserSignin } from "./container/form/login";

export default function App() {
    const routes = useRoutes([
        {
            path: "*",
            element: <UserSignin />
        },
        {
            path: "/",
            element: <UserSignin />
        },
        {
            path: "/auth",
            element: <UserSignin />
        },
        {
            path: "/user",
            element: <GenericForm key='user' object={initialUser} url={'user'} />
        },
        {
            path: "/role",
            element: <GenericForm key='role' object={initialUser} url={'role'} />
        },
        {
            path: "/food",
            element: <GenericForm key='food' object={initialUser} url={'food'} />
        },
    ]);
    return routes;
}

//https://blog.logrocket.com/complete-guide-authentication-with-react-router-v6/
//https://www.bezkoder.com/react-typescript-authentication-example/