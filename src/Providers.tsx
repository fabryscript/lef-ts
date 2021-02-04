import React from "react";
import { Routes } from "./Routes";
import { UserProvider } from "./UserProvider";

interface ProvidersProps {}

export const Providers: React.FC<ProvidersProps> = ({}) => {
  return(
    <UserProvider>
      <Routes />
    </UserProvider>
  );
};
