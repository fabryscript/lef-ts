import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { ScrollView, View } from "react-native";
import { Title, Button, Card, Paragraph } from "react-native-paper";
import PersonalData from "../additionalData/PersonalData";
import Profilo from "../additionalData/Profilo";
import TOS from "../additionalData/TOS";
import { auth } from "../auth/firebase";
import { ImpostazioniNavProps } from "../paramlists/ImpostazioniStackParamList";

interface ImpostazioniStackProps {}

const handleSignOut = async () => {
  await auth.signOut();
};

function Impostazioni({ navigation }: ImpostazioniNavProps<"Impostazioni">) {
  return (
    <View>
      <Card>
        <Card.Content>
          <Title style={{ textAlign: "left" }}>Impostazioni</Title>
          <Button mode="outlined" onPress={handleSignOut}>
            Esegui il Logout
          </Button>
          <Button
            mode="outlined"
            onPress={() => navigation.navigate("Profilo")}
          >
            Profilo
          </Button>
          <Button
            mode="outlined"
            onPress={() => navigation.navigate("Preferenze")}
          >
            Preferenze Personali
          </Button>
          <Button mode="outlined" onPress={() => navigation.navigate("TOS")}>
            Informativa sulla Privacy
          </Button>
          <Button mode="outlined" onPress={() => navigation.navigate("Info")}>
            Informazioni sull'Applicazione
          </Button>
        </Card.Content>
      </Card>
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
      <Stack.Screen name="Profilo" component={Profilo} />
      <Stack.Screen name="Preferenze" component={PersonalData} />
      <Stack.Screen name="TOS" component={TOS} />
      <Stack.Screen name="Info" component={Info} />
    </Stack.Navigator>
  );
};
