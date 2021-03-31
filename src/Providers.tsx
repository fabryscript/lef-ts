import React from "react";
import { Routes } from "./Routes";
import { UserProvider } from "./UserProvider";
import { Provider as ReduxProvider } from "react-redux";
import reducer from "./store/configureStore";
import { configureStore } from "@reduxjs/toolkit";
import Toast from "react-native-toast-message";

interface ProvidersProps {}

const store = configureStore({
  reducer,
});

export const Providers: React.FC<ProvidersProps> = ({}) => {
  return (
    <UserProvider>
      <ReduxProvider store={store}>
        <Routes />
        <Toast position="top" ref={(ref) => Toast.setRef(ref)} />
      </ReduxProvider>
    </UserProvider>
  );
};
