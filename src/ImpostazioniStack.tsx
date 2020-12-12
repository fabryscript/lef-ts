import { createStackNavigator } from "@react-navigation/stack";
import React, { useContext } from "react";
import { View } from "react-native";
import { Title, Button } from "react-native-paper";
import { AuthContext } from "./AuthProvider";

interface ImpostazioniStackProps {}

function Impostazioni() {
  const { logout } = useContext(AuthContext);
  return (
    <View>
      <Title style={{ textAlign: "left" }}>Impostazioni</Title>
      <Button mode="outlined" onPress={() => logout()}>
        Esegui il Logout
      </Button>
    </View>
  );
}

const Stack = createStackNavigator();

export const ImpostazioniStack: React.FC<ImpostazioniStackProps> = ({}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Impostazioni" component={Impostazioni} />
    </Stack.Navigator>
  );
};
