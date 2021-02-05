import React, { useState } from "react";
import { Alert, View } from "react-native";
import { Button, Card, TextInput } from "react-native-paper";
import { auth } from "./firebase";

interface PasswordResetProps {}

const PasswordReset: React.FC<PasswordResetProps> = ({}) => {
  const [resetEmailText, setResetEmailText] = useState<string | any>();

  const handlePasswordReset = async () => {
    await auth
      .sendPasswordResetEmail(resetEmailText)
      .then(() => {
        Alert.alert(
          "Fatto!✅",
          "I Nostri simpatici Robots hanno inviato la email di reset password con successo!",
          [
            {
              text: "Yee! Che bello",
            },
          ],
          { cancelable: true }
        );
      })
      .catch((error) => {
        const _error = JSON.stringify(error);
        if (_error.includes("There is no user")) {
          Alert.alert(
            "Non ci voleva!❌",
            "I Nostri amici Robots non hanno trovato una email che corrisponda alla vostra password",
            [
              {
                text: "Capito!",
              },
            ],
            { cancelable: true }
          );
        }
      });
  };

  return (
    <View>
      <Card>
        <Card.Content>
          <TextInput
            label="E-Mail usata durante la registrazione"
            value={resetEmailText}
            onChangeText={(text) => setResetEmailText(text)}
          />
          <Button mode="contained" onPress={handlePasswordReset}>
            Invia
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
};

export default PasswordReset;
