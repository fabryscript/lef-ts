import React, { useContext, useEffect, useState } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { ActivityIndicator } from "react-native-paper";
import { Center } from "./Center";
import AsyncStorage from "@react-native-community/async-storage";
import { AuthContext } from "./AuthProvider";
import { AppTabs } from "./AppTabs";
import { AuthStack } from "./AuthStack";

interface RoutesProps {}

export const Routes: React.FC<RoutesProps> = ({}) => {
  const { user, login } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //controlla se l'utente è registrato oppure no
    AsyncStorage.getItem("user")
      .then((userString) => {
        if (userString) {
          login();
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (loading) {
    return (
      <Center>
        <ActivityIndicator animating={true} />
      </Center>
    );
  }

  return (
    <NavigationContainer>
      {user ? <AppTabs /> : <AuthStack />}
    </NavigationContainer>
  );
};
