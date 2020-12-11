import React, { useContext, useEffect, useState } from "react";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import { ActivityIndicator, Button, Text } from "react-native-paper";
import { Center } from "./Center";
import { AuthNavProps, AuthParamList } from "./AuthParamList";
import AsyncStorage from "@react-native-community/async-storage";
import { AuthContext } from "./AuthProvider";
import { AppTabs } from "./AppTabs";

interface RoutesProps {}

const Stack = createStackNavigator<AuthParamList>();

function Login({ navigation, route }: AuthNavProps<"Login">) {
    const { login } = useContext(AuthContext)
    return (
    <Center>
      <Text>Io sono la Login</Text>
      <Button
        mode="contained"
        onPress={() => {
          navigation.navigate("Register");
        }}
      >
        Vai a Registrazione
      </Button>

      <Button
        mode="contained"
        onPress={() => {
            login();
        }}
      >
        Entra nell'app
      </Button>
    </Center>
  );
}

function Register({ navigation }: AuthNavProps<"Register">) {
  return (
    <Center>
      <Text>Io sono la pagina di Registrazione</Text>
    </Center>
  );
}

export const Routes: React.FC<RoutesProps> = ({}) => {
  const { user, login } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //controlla se l'utente è registrato oppure no
    AsyncStorage.getItem("user")
      .then((userString) => {
        if (userString) {
          login()
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
      {user ? (
        <AppTabs />
      ) : (
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};
