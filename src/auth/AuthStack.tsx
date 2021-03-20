import { createStackNavigator } from "@react-navigation/stack";
import React, { useState } from "react";
import { ScrollView } from "react-native";
import { Banner, Button, Card, TextInput } from "react-native-paper";
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
    <ScrollView>
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
      <Card style={{marginTop: "10%"}}>
        <Card.Cover source={{uri: "https://firebasestorage.googleapis.com/v0/b/letsfitja-eatfit.appspot.com/o/logo%2Flogo.png?alt=media&token=9f165af0-1622-4308-8ed1-0a149195f4f5"}} />
        <Card.Content>
          <TextInput
            label="Email"
            autoFocus
            value={emailText}
            onChangeText={(text) => setEmailText(text)}
            style={{marginTop: "10%"}}
          />
          <TextInput
            label="Password"
            secureTextEntry
            value={passwordText}
            style={{marginTop: "3%"}}
            onChangeText={(text) => setPasswordText(text)}
          />
          <Button
            icon="arrow-collapse-right"
            mode="outlined"
            onPress={handleLogIn}
            style={{marginTop: "10%", borderRadius: 20}}
          >
            Log In
          </Button>
          <Button onPress={() => navigation.navigate("Registrazione")}>
            Non hai un account? Cliccami!
          </Button>
          <Button onPress={() => navigation.navigate("PasswordReset")}>
            Password Dimenticata? Cliccami!
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
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
