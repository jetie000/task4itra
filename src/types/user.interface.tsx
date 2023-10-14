export interface IUser{
    id: number
    email: string
    password: string
    name: string
    position: string
    logInDate: string
    signUpDate: string
    status: string
}

export interface ITableUser {
    id: number
    name: string
    position: string
    email: string
    logInDate: string
    status: string
}