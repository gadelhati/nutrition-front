import { Role } from '../role/role.interface';

export interface User {
	id: string,
	username: string,
	email: string,
    // password: string,
	active: boolean,
	roles: string[]
	// roles: [
	// 	// {
	// 	// 	id: 7c12004d-e843-4e00-be40-01845ad75834,
	// 	// 	createdAt: 2023-03-02T17:27:02.541231,
	// 	// 	updatedAt: 2023-03-02T17:27:02.541231,
	// 	// 	createdBy: null,
	// 	// 	modifiedBy: null,
	// 	// 	name: ROLE_USER,
	// 	// 	privileges: []
	// 	// }
	// ]
}