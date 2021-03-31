import React, { useState } from "react";
import { ScrollView, View, TextInput, TouchableOpacity, Text } from "react-native";
import { Title } from "react-native-paper";
import Toast from "react-native-toast-message";
import { AuthNavProps } from "../paramlists/AuthParamList";
import { styles } from "./authStyles";
import { executeRegistration } from "./firebase";
import { validateEmail, validatePassword } from "./validation";

function Register({ navigation }: AuthNavProps<"Registrazione">) {
  const [emailText, setEmailText] = useState<string>();
  const [passwordText, setPasswordText] = useState<string>();

  const handleRegister = async () => {
    const resultOfEmailValidation = validateEmail(emailText!.trim());
    const resultOfPasswordValidation = validatePassword(passwordText!.trim());
    if (resultOfEmailValidation) {
      if (resultOfPasswordValidation) {
        await executeRegistration(emailText!, passwordText!)
      } else {
        Toast.show({
          type: "error",
          text1: "Password del formato sbagliato",
          text2: "Deve essere maggiore di sei caratteri!",
          autoHide: true
        });
      }
    } else {
      Toast.show({
        type: "error",
        text1: "L'email non è del formato corretto!",
        text2: "Esempio: bob@letsfitja.com",
        autoHide: true
      });
    };
    setEmailText("");
    setPasswordText("");
  };

  return (
    <ScrollView style={styles.containerGeneric}>
      <View style={styles.paddingTenAll}>
        <Title style={styles.headingGen}>
          Salve! Questa è la registrazione!
        </Title>
        <View style={styles.mtSixteen}>
          <TextInput
            value={emailText}
            placeholder={`✉ E-Mail`}
            keyboardType="email-address"
            autoCorrect={false}
            onChangeText={(text) => setEmailText(text)}
            style={styles.fgPassInput}
          />
          <TextInput
            secureTextEntry
            placeholder={`🔑 Password`}
            keyboardType="visible-password"
            value={passwordText}
            onChangeText={(text) => setPasswordText(text)}
            style={styles.fgPassInput}
          />
          <TouchableOpacity
            style={styles.sumbitTouchableOpacity}
            onPress={handleRegister}
          >
            <Text>Registriamoci!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

export default Register;
