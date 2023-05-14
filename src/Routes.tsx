import { useRoutes } from "react-router-dom";
import { initialUser } from "./component/user/user.initial";
import { GenericForm } from "./container/form/generic.form";
import { LoginForm } from "./container/form/login.form";

export default function App() {
    const routes = useRoutes([
        {
            path: "*",
            element: <LoginForm />
        },
        {
            path: "/",
            element: <LoginForm />
        },
        {
            path: "/auth",
            element: <LoginForm />
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