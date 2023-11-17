import {create} from 'zustand'

export interface UserInfo {
    name: string | null,
    email: string | null,
    token: string | null,
}

interface UserState {
  user : UserInfo,
  addUser: (user: UserInfo) => void
}

export const useAuthStore = create<UserState>((set) => ({
    user: {
        name: null,
        email: null,
        token: null,
    },
    addUser: (user) => {
        window.localStorage.setItem('user', JSON.stringify(user));
        return set((state) => ({user: user}))
    },
}))