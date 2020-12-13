import { createStackNavigator } from "@react-navigation/stack";
import React, { useContext } from "react";
import { ScrollView, View } from "react-native";
import {
  Title,
  Button,
  Card,
  Paragraph,
} from "react-native-paper";
import { AuthContext } from "./AuthProvider";
import {
  ImpostazioniNavProps,
} from "./ImpostazioniStackParamList";

interface ImpostazioniStackProps {}

function Impostazioni({ navigation }: ImpostazioniNavProps<"Impostazioni">) {
  const { logout } = useContext(AuthContext);
  return (
    <View>
      <Title style={{ textAlign: "left" }}>Impostazioni</Title>
      <Button mode="outlined" onPress={() => logout()}>
        Esegui il Logout
      </Button>
      <Button mode="outlined" onPress={() => navigation.navigate("Info")}>
        Informazioni sull'Applicazione
      </Button>
    </View>
  );
}

function Info() {
  return (
    <ScrollView>
      <Card>
        <Card.Content>
          <Title>
            App fatta da: Fabrizio Piperno (@fabry-js), con lo splendido
            supporto di:
          </Title>
          <Paragraph>Marta Mantineo 💚</Paragraph>
          <Paragraph>Benedetta La Malfa 💙</Paragraph>
          <Paragraph>Desirèe Carbone 💛</Paragraph>
          <Paragraph>e Federica Tuttocuore 💜</Paragraph>
          <Paragraph style={{ fontStyle: "italic" }}>
            grazie di cuore ragazzi.
          </Paragraph>
          <Paragraph>
            Da sempre, con tanto Amore per quello che faccio 💓
          </Paragraph>
          <Paragraph>E sempre e fedelmente con JavaScript! 😉</Paragraph>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const Stack = createStackNavigator();

export const ImpostazioniStack: React.FC<ImpostazioniStackProps> = ({}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Impostazioni" component={Impostazioni} />
      <Stack.Screen name="Info" component={Info} />
    </Stack.Navigator>
  );
};
