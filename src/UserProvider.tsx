import React, { createContext, useEffect, useState } from "react";
import { auth } from "./auth/firebase";

interface UserProviderProps {}

export const UserContext = createContext<any>(null);

export const UserProvider: React.FC<UserProviderProps> = ({children}) => {
  const [actualUser, setActualUser] = useState<any>(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setActualUser(user);
    });
  });
  return(
      <UserContext.Provider value={{actualUser}}>
          {children}
      </UserContext.Provider>
  )
};
