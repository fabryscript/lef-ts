import { createStackNavigator } from "@react-navigation/stack";
import React, { useState } from "react";
import { View } from "react-native";
import { Banner, Button, Card, TextInput, Title } from "react-native-paper";
import InsertProcess from "../additionalData/InsertProcess";
import { AuthParamList, AuthNavProps } from "../paramlists/AuthParamList";
import { auth } from "./firebase";
import PasswordReset from "./PasswordReset";
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

  const handleLogIn = async () => {
    await auth.signInWithEmailAndPassword(emailText, passwordText)
      .then(() => {})
      .catch((_error) => {
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
          <Button onPress={() => navigation.navigate("Registrazione")}>
            Non sei registrato? Cliccami!
          </Button>
          <Button onPress={() => navigation.navigate("PasswordReset")}>
            Password Dimenticata? Cliccami!
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
      <Stack.Screen name="Registrazione" component={Register} />
      <Stack.Screen name="InsertProcess" component={InsertProcess} />
      <Stack.Screen name="PasswordReset" options={{headerTitle: 'Reset della Password'}} component={PasswordReset} />
    </Stack.Navigator>
  );
};
