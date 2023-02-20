import { number } from "prop-types";
import { User } from "./user.interface";

export const initialUser : User = {
    id: '',
    username: '',
    email: '',
    password: '',
    active: true,
    roles: [],
    date: new Date(),
    number: 5
}