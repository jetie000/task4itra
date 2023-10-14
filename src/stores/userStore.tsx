import { variables } from '../Variables';
import { create } from 'zustand';
import { ITableUser, IUser } from '../types/user.interface';

interface UserState {
    user: IUser
    setUser: (data: IUser) => void
    logout: () => void
    loggedIn: () => boolean
    users: ITableUser[]
    getUsers: () => void
}

export const useUserStore = create<UserState>((set, get) => ({
    user: JSON.parse(localStorage.getItem(variables.$LOCAL_USER)!) || null,
    loggedIn: () => {
        const isLogin = JSON.parse(localStorage.getItem(variables.$LOCAL_USER)!) || false;
        if (isLogin) {
            if (isLogin.status == "Active")
                return true;
            else
                return false;
        }
        else
            return isLogin;
    },
    setUser: (data: IUser) => {
        if (typeof data == typeof get().user && data.status == 'Active') {
            set(
                { user: data }
            )
            if (data) {
                localStorage.setItem(variables.$LOCAL_USER, JSON.stringify(data));
            }
            fetch(variables.API_URL + '/user', {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "id": get().user.id,
                    "email": get().user.email,
                    "password": get().user.password,
                    "name": get().user.name,
                    "position": get().user.position,
                    "logInDate": new Date(Date.now() + variables.UTC3_MINSK),
                    "signUpDate": get().user.signUpDate,
                    "status": get().user.status
                })
            })
        }
    },
    logout: () => {
        localStorage.removeItem(variables.$LOCAL_USER);
        set({
            users: []
        })
    },
    users: [],
    getUsers: async () => {
        try {
            const response = await fetch(variables.API_URL + "/user/allusers");
            const data = await response.json();
            set({
                users: data
            })
        }
        catch (e) {
            alert(e as string);
        }
    }
}))