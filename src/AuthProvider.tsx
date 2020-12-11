import AsyncStorage from '@react-native-community/async-storage';
import React, { createContext, useState } from 'react';

type User = null | { username: string }

export const AuthContext = createContext<{
    user: User,
    login: () => void,
    logout: () => void
}>({
    user: null,
    login: () => {},
    logout: () => {}
});

interface AuthProviderProps {}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) =>{
    const [user, setUser] = useState<User>(null);
    return <AuthContext.Provider value={{
        user,
        login: () =>{
            const fakeUser = {username: "Fabrizio"}
            setUser(fakeUser);
            AsyncStorage.setItem("user", JSON.stringify(fakeUser))
        },
        logout: () => {
            setUser(null);
            AsyncStorage.removeItem("user")
        }
    }}>{children}</AuthContext.Provider>;
}