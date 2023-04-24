import { Route, HashRouter, Routes, Navigate } from "react-router-dom";

import { RequireAuth } from "./RequireAuth";
import { isValidToken } from "./service/service.token"

import { UserSignin } from "./container/form/login";
import { SideContainer } from "./container/Sidebar";
import { FlexCointainer, SideItem } from "./container/template/Flex";
import { initialFood } from "./component/food/food.initial";
import { GenericForm } from "./container/form/generic.form";
import { initialUser } from "./component/user/user.initial";
import { initialRole } from "./component/role/role.initial";
import { NotAllowed } from "./container/not.allowed";
import { AuthProvider } from "./component/auth/AuthProvider";
import { initialFoodCategory } from "./component/foodCategory/food.category.initial";
import { initialPreparation } from "./component/preparation/preparation.initial";
import { RoleForm } from "./container/form/role.form";
import { UserForm } from "./container/form/user.form";
import { ProfileForm } from "./container/form/profile";

const ROLES = {
    'USER': "ROLE_USER",
    'ADMIN': "ROLE_ADMIN",
    'MODERATOR': "ROLE_MODERATOR"
}

export default function AppRoutes() {

    return (
        <HashRouter>
            <AuthProvider>
                <FlexCointainer element='all'>
                    {isValidToken() && <SideContainer />}
                    <FlexCointainer element='main'>
                        <Routes>
                            <Route path="*" element={<UserSignin />}></Route>
                            <Route path="/" element={<UserSignin />}></Route>
                            <Route path="/notAllowed" element={<NotAllowed />}></Route>
                            <Route path="/auth" element={<UserSignin />}></Route>
                            <Route path="/profile" element={<ProfileForm key='user' object={initialUser} url={'user'} />}></Route>
                            <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
                                <Route path="/user" element={<UserForm />}></Route>
                                <Route path="/role" element={<RoleForm />}></Route>
                            </Route>
                            <Route element={<RequireAuth allowedRoles={[ROLES.USER, ROLES.ADMIN, ROLES.MODERATOR]} />}>
                                <Route path="/food" element={<GenericForm key='food' object={initialFood} url={'food'} />}></Route>
                                <Route path="/preparation" element={<GenericForm key='preparation' object={initialPreparation} url={'preparation'} />}></Route>
                                <Route path="/food_category" element={<GenericForm key='food_category' object={initialFoodCategory} url={'food_category'} />}></Route>
                            </Route>
                        </Routes>
                    </FlexCointainer>
                </FlexCointainer>
            </AuthProvider>
        </HashRouter>
    )
}