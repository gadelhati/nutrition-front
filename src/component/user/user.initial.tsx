import { number } from "prop-types";
import { initialRole } from "../role/role.initial";
import { User } from "./user.interface";

export const initialUser : User = {
    id: '',
    username: '',
    email: '',
    password: '',
    active: true,
    roles: [],
    testes: ['aa', 'ab', 'ac', 'ad'],
    date: new Date(),
    number: 0
}