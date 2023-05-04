import { User } from "./user.interface";

export const initialUser : User = {
	id: '',
	username: '',
	email: '',
	// password: '',
	active: true,
	roles: ['ROLE_USER', 'ROLE_MODERATOR']
}