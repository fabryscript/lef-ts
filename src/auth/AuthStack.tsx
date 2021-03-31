import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ScrollView, View, TouchableOpacity, TextInput } from "react-native";
import { Text, Title } from "react-native-paper";
import InsertProcess from "../additionalData/InsertProcess";
import { AuthParamList, AuthNavProps } from "../paramlists/AuthParamList";
import { logIn } from "./firebase";
import PasswordReset from "./PasswordReset";
import Register from "./Register";
import { styles } from "./authStyles";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface AuthStackProps {}

const Stack = createStackNavigator<AuthParamList>();

function Login({ navigation }: AuthNavProps<"Login">) {
  const [emailText, setEmailText] = useState<string>();
  const [passwordText, setPasswordText] = useState<string>();

  const handleLogIn = async () => {
    await logIn(emailText!, passwordText!).then(() => {
      setEmailText("");
      setPasswordText("");
    });
  };

  return (
    <ScrollView style={styles.containerGeneric}>
      <View style={styles.paddingTenAll}>
        <Title style={styles.headingGen}>
          Benvenuti in Eat & Fit👋, Fate qui il Login
        </Title>
        <View style={styles.mtSixteen}>
          <TextInput
            value={emailText}
            placeholder={`✉ E-Mail`}
            keyboardType="email-address"
            autoCorrect={false}
            onChangeText={(text) => setEmailText(text)}
            style={styles.genAuthInput}
          />
          <TextInput
            secureTextEntry
            placeholder={`🔑 Password`}
            keyboardType="visible-password"
            value={passwordText}
            onChangeText={(text) => setPasswordText(text)}
            style={styles.genAuthInput}
          />
          <TouchableOpacity
            style={styles.sumbitTouchableOpacity}
            onPress={handleLogIn}
          >
            <Text>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("PasswordReset")}
          >
            <Text style={styles.forgotPassword}>Password Dimenticata?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Registrazione")}
          >
            <Text style={styles.forgotPassword}>
              Nuovo utente? Cliccami per registrarti!
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

export const AuthStack: React.FC<AuthStackProps> = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Registrazione" component={Register} />
      <Stack.Screen name="InsertProcess" component={InsertProcess} />
      <Stack.Screen
        name="PasswordReset"
        options={{ headerTitle: "Reset della Password" }}
        component={PasswordReset}
      />
    </Stack.Navigator>
  );
};
