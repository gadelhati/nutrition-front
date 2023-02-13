import { OM } from "../om/om.interface";
import { Role } from "../role/role.interface";

export interface User {
    id: string,
    username: string,
    email: string,
    password: string,
    active?: boolean,
    OM?: OM,
    roles?: Role[],
}