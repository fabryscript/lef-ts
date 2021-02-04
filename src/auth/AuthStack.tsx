import { createStackNavigator } from "@react-navigation/stack";
import React, { useState } from "react";
import { View } from "react-native";
import { Banner, Button, Card, TextInput, Title } from "react-native-paper";
import { AuthParamList, AuthNavProps } from "../paramlists/AuthParamList";
import { auth, executeLogin } from "./firebase";
import Register from "./Register";

interface AuthStackProps {}

const Stack = createStackNavigator<AuthParamList>();

function Login({ navigation }: AuthNavProps<"Login">) {
  const [emailText, setEmailText] = useState<string | any>();
  const [passwordText, setPasswordText] = useState<string | any>();
  const [
    credentialsNotFoundBadgeVisible,
    setCredentialsNotFoundBadgeVisible,
  ] = useState<boolean | any>(false);

  const handleLogIn = () => {
    auth.signInWithEmailAndPassword(emailText, passwordText).catch((_error) => {
      setCredentialsNotFoundBadgeVisible(true);
    });
  };

  return (
    <View>
      <Banner
        visible={credentialsNotFoundBadgeVisible}
        actions={[
          {
            label: "Faccio Subito!",
            onPress: () => setCredentialsNotFoundBadgeVisible(false),
          },
        ]}
        icon="cancel"
      >
        Ahia! Non abbiamo trovato un account con quelle credenziali, ti spiace
        riprovare?
      </Banner>
      <Card>
        <Card.Content>
          <Title style={{fontSize: 12, fontStyle: 'italic'}}>Assicurati di aver verificato l'email!</Title>
          <TextInput
            label="Email"
            value={emailText}
            onChangeText={(text) => setEmailText(text)}
          />
          <TextInput
            label="Password"
            secureTextEntry
            value={passwordText}
            onChangeText={(text) => setPasswordText(text)}
          />
          <Button
            icon="arrow-collapse-right"
            mode="outlined"
            onPress={handleLogIn}
          >
            Log In
          </Button>
          <Button onPress={() => navigation.navigate("Register")}>
            Non sei registrato? Cliccami!
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
}

export const AuthStack: React.FC<AuthStackProps> = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};
