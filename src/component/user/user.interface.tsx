import { Role } from "../role/role.interface";

export interface User {
    id: string,
    username: string,
    email: string,
    password: string,
    active?: boolean,
    roles?: Role[],
    date: Date,
    number: number
}