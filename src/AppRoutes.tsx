import { Route, HashRouter, Routes, Navigate } from "react-router-dom";

// import { ProtectedRoute, ProtectedRouteProps } from "./ProtectedRoutes";
// import { Profile } from "./component/user/profile";
// import { SideBar } from "./container/menus/sidebar/sidebar";
import { getRoles, getToken } from "./service/service.token"

// import { UserList } from "./component/user/user.list";
import { UserSignin } from "./component/user/user.signin";
import { SideContainer } from "./container/Sidebar";
import { FlexCointainer, SideItem } from "./container/template/Flex";
import { initialFood } from "./component/food/food.initial";
import { GenericForm } from "./container/generic.form";
import { initialUser } from "./component/user/user.initial";
// import { Header } from "./container/menus/header";
// import { Footer } from "./container/menus/footer";
// import { AuthProvider } from "./assets/context/AuthProvider";
// import RequireAuth from "./RequireAuth";
// import { useAuth } from "./assets/hook/useAuth";
// import { RoleList } from "./component/role/role.list";
// import { SigninContainer } from "./component/auth/signin";
// import { SideBar } from "./container/sidebar/sidebar";

const ROLES = {
    'User': "ROLE_USER",
    'Admin': "ROLE_ADMIN",
    'Moderador': "ROLE_MODERATOR"
}

export default function AppRoutes() {
    // const { roles } = useAuth();
    // const defaultProtectedRouteProps: Omit<ProtectedRouteProps, 'outlet'> = {
    //     isAuthenticated: getToken(),
    //     authenticationPath: '/signin',
    //     allowedRoles: "",
    //     // allowedRoles: getUser()?.roles.find((role: any) => role),
    // };
    return (
        <body>
            <HashRouter>
                {/* <AuthProvider> */}
                <FlexCointainer element='all'>
                    <SideContainer />
                    <FlexCointainer element='main'>
                        <FlexCointainer element='nav'>
                            <SideItem>Sistema1</SideItem>
                            {/* <FlexItem>2</FlexItem> */}
                            <SideItem>3</SideItem>
                        </FlexCointainer>
                        <FlexCointainer element='content'>
                            {/* <Header /> */}
                            <Routes>
                                {/* <Route path="*" element={getToken() == null ? <UserSignin /> : <Navigate to="/observation" />}></Route>
                            <Route path="/" element={getToken() == null ? <UserSignin /> : <Navigate to="/observation" />}></Route>
                            <Route path="/signin" element={getToken() == null ? <UserSignin /> : <Navigate to="/observation" />}></Route> */}

                                <Route path="*" element={<UserSignin />}></Route>
                                <Route path="/" element={<UserSignin />}></Route>
                                <Route path="/auth" element={<UserSignin />}></Route>
                                <Route path="/user" element={<GenericForm object={initialUser} url={'user'} />}></Route>
                                <Route path="/food" element={<GenericForm object={initialFood} url={'food'} />}></Route>
                                
                                {/* <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.User]} />}></Route> */}
                                {/* <Route path="/profile" element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<Profile />} />} /> */}
                                {/* <Route path="/researcher" element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<ResearcherList />} allowedRoles={"ROLE_ADMIN"} />} /> */}

                                {/* <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}> */}
                                {/* <Route path="/users" element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<UserList />} />} />
                                <Route path="/roles" element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<RoleList />} />} /> */}
                                {/* <Route path="/country" element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<CountryList />} />} />
                                <Route path="/institution" element={<InstitutionList />} /> */}
                                {/* </Route> */}

                                {/* <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Moderador]} />}>
                                <Route path="/om" element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<OMList />} />} /> </Route> */}
                            </Routes>
                            {/* <Footer /> */}
                        </FlexCointainer>
                    </FlexCointainer>
                </FlexCointainer>
                {/* </AuthProvider> */}
            </HashRouter>
        </body>
    )
}