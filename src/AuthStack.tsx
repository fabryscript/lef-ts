import { createStackNavigator } from "@react-navigation/stack";
import React, { useContext } from "react";
import { Button, Text } from "react-native-paper";
import { AuthParamList, AuthNavProps } from "./AuthParamList";
import { AuthContext } from "./AuthProvider";
import { Center } from "./Center";

interface AuthStackProps {}

const Stack = createStackNavigator<AuthParamList>();

function Login({ navigation }: AuthNavProps<"Login">) {
  const { login } = useContext(AuthContext);
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

function Register({}: AuthNavProps<"Register">) {
  return (
    <Center>
      <Text>Io sono la pagina di Registrazione</Text>
    </Center>
  );
}

export const AuthStack: React.FC<AuthStackProps> = ({}) => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};
