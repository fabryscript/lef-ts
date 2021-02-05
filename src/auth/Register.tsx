import React, { useState } from "react";
import { Alert, View } from "react-native";
import { Banner, Button, Card, TextInput } from "react-native-paper";
import { AuthNavProps } from "../paramlists/AuthParamList";
import { executeRegistration } from "./firebase";
import { validateEmail, validatePassword } from "./validation";

function Register({ navigation }: AuthNavProps<"Register">) {
  const [emailText, setEmailText] = useState<string | any>();
  const [passwordText, setPasswordText] = useState<string | any>();
  const [emailNotValidBannerVisible, setEmailNotValidBannerVisible] = useState<
    boolean | any
  >(false);
  const [
    passwordNotEmptyOrLengthLessThanFiveVisible,
    setPasswordNotEmptyOrLengthLessThanFiveVisible,
  ] = useState<boolean | any>(false);

  const handleRegister = async () => {
    const resultOfEmailValidation = validateEmail(emailText);
    const resultOfPasswordValidation = validatePassword(passwordText);
    if (resultOfEmailValidation) {
      if (resultOfPasswordValidation) {
        await executeRegistration(emailText, passwordText)
          .then((message) => {
            Alert.alert(
              "Quasi Fatto!",
              "Perfetto💪, Assicurati di verificare l'email di verifica che ti abbiamo appena mandato!",
              [
                {
                  text: "Okay! Ricevuto👍",
                },
              ],
              { cancelable: true }
            );
            if (message?.toString().includes("Nuovo"))
              navigation.navigate("InsertProcess");
          })
          .catch((error) => {
            Alert.alert(
              "Errore!",
              error,
              [
                {
                  text: "Capito.",
                },
              ],
              { cancelable: true }
            );
          });
      } else setPasswordNotEmptyOrLengthLessThanFiveVisible(true);
    } else {
      setEmailNotValidBannerVisible(true);
    }
  };

  return (
    <View>
      <Banner
        visible={emailNotValidBannerVisible}
        actions={[
          {
            label: "Va bene, ci riprovo!",
            onPress: () => setEmailNotValidBannerVisible(false),
          },
        ]}
        icon="cancel"
      >
        Oops! Assicurati di aver inserito una email valida!
      </Banner>
      <Banner
        visible={passwordNotEmptyOrLengthLessThanFiveVisible}
        actions={[
          {
            label: "Va bene, ci riprovo!",
            onPress: () =>
              setPasswordNotEmptyOrLengthLessThanFiveVisible(false),
          },
        ]}
        icon="cancel"
      >
        Ahh! La Password non deve essere vuota o contenente meno di 5 caratteri!
      </Banner>
      <Card>
        <Card.Content>
          <TextInput
            label="Email"
            value={emailText}
            onChangeText={(text) => setEmailText(text)}
          />
          <TextInput
            label="Password"
            secureTextEntry
            placeholder="Almeno 6 caratteri!"
            value={passwordText}
            onChangeText={(text) => setPasswordText(text)}
          />
          <Button
            icon="arrow-collapse-right"
            mode="outlined"
            onPress={handleRegister}
          >
            Registrati
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
}

export default Register;
