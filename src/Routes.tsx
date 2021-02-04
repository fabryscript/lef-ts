import React, { useContext } from "react";
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import { AppTabs } from "./AppTabs";
import { AuthStack } from "./auth/AuthStack";
import { UserContext } from "./UserProvider";
import merge from "deepmerge";

interface RoutesProps {}

// const CombinedDefaultTheme = merge(PaperDefaultTheme, NavigationDefaultTheme);
const CombinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);

export const Routes: React.FC<RoutesProps> = () => {
  const { actualUser } = useContext(UserContext);

  return (
    <PaperProvider theme={CombinedDarkTheme}>
      <NavigationContainer theme={CombinedDarkTheme}>
        { actualUser && actualUser.emailVerified === true ? <AppTabs /> : <AuthStack /> }
      </NavigationContainer>
    </PaperProvider>
  );
};
