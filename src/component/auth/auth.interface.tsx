export interface Auth {
    id: string,
    token: string,
    tokenType: string,
    refreshToken: string,
    username: string,
    email: string,
    roles: [],
    accessToken: string,
    password: '',
}