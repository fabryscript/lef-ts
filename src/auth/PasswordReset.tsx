import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { styles } from "./authStyles";
import { passwordReset } from "./firebase";

interface PasswordResetProps {}

const PasswordReset: React.FC<PasswordResetProps> = ({}) => {
  const [resetEmailText, setResetEmailText] = useState<string>();

  const handlePasswordReset = async () => {
    await passwordReset(resetEmailText!).then(() => {
      setResetEmailText("");
    });
  };

  return (
    <View style={styles.containerGeneric}>
      <View style={styles.fgPassContainer}>
        <TextInput
          value={resetEmailText}
          placeholder={`✉ E-Mail usata durante la registrazione`}
          keyboardType="email-address"
          autoCorrect={false}
          onChangeText={(text) => setResetEmailText(text)}
          style={styles.fgPassInput}
        />
        <TouchableOpacity
          style={styles.sumbitTouchableOpacity}
          onPress={handlePasswordReset}
        >
          <Text>Invia</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PasswordReset;
