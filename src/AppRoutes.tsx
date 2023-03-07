import { Route, HashRouter, Routes, Navigate } from "react-router-dom";

// import { ProtectedRoute, ProtectedRouteProps } from "./ProtectedRoutes";
import { RequireAuth } from "./RequireAuth";
import { getRoles, getToken } from "./service/service.token"

import { UserSignin } from "./container/form/login";
import { SideContainer } from "./container/Sidebar";
import { FlexCointainer, SideItem } from "./container/template/Flex";
import { initialFood } from "./component/food/food.initial";
import { GenericForm } from "./container/form/generic.form";
import { initialUser } from "./component/user/user.initial";
import { initialRole } from "./component/role/role.initial";
import { NotAllowed } from "./container/not.allowed";
import { AuthProvider } from "./component/auth/AuthProvider";
// import { Header } from "./container/menus/header";
// import { Footer } from "./container/menus/footer";
// import { Profile } from "./component/user/profile";

const ROLES = {
    'USER': "ROLE_USER",
    'ADMIN': "ROLE_ADMIN",
    'MODERATOR': "ROLE_MODERATOR"
}

export default function AppRoutes() {
    
    return (
        <body>
            <HashRouter>
                <AuthProvider>
                <FlexCointainer element='all'>
                    {getToken() && <SideContainer />}
                    <FlexCointainer element='main'>
                        <FlexCointainer element='nav'>
                            <SideItem>Sistema1</SideItem>
                            {/* <FlexItem>2</FlexItem> */}
                            <SideItem>3</SideItem>
                        </FlexCointainer>
                        {/* <FlexCointainer element='content'> */}
                        <div>
                            {/* <Header /> */}
                            <Routes>
                                {/* <Route path="*" element={getToken() == null ? <UserSignin /> : <Navigate to="/observation" />}></Route>
                            <Route path="/" element={getToken() == null ? <UserSignin /> : <Navigate to="/observation" />}></Route>
                            <Route path="/signin" element={getToken() == null ? <UserSignin /> : <Navigate to="/observation" />}></Route> */}

                                <Route path="*" element={<UserSignin />}></Route>
                                <Route path="/" element={<UserSignin />}></Route>
                                <Route path="/notAllowed" element={<NotAllowed />}></Route>
                                <Route path="/auth" element={<UserSignin />}></Route>
                                <Route element={<RequireAuth allowedRoles={[ROLES.USER, ROLES.ADMIN, ROLES.MODERATOR]} />}>
                                    <Route path="/user" element={<GenericForm key='user' object={initialUser} url={'user'} />}></Route>
                                    <Route path="/role" element={<GenericForm key='role' object={initialRole} url={'role'} />}></Route>
                                </Route>
                                <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
                                    <Route path="/food" element={<GenericForm key='food' object={initialFood} url={'food'} />}></Route>
                                </Route>
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
                        {/* </FlexCointainer> */}
                        </div>
                    </FlexCointainer>
                </FlexCointainer>
                </AuthProvider>
            </HashRouter>
        </body>
    )
}