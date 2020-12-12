import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { View, StyleSheet } from "react-native";
import {
  Searchbar,
  Card,
  Title,
  Paragraph,
  Text,
  FAB,
  Provider,
  Portal,
} from "react-native-paper";
import { RestaurantCard } from "../components/RestaurantCard";
import { ClassicoNavProps, ClassicoParamList } from "./ClassicoStackParamList";

interface ClassicoStackProps {}

const Stack = createStackNavigator<ClassicoParamList>();

function Classico({ navigation }: ClassicoNavProps<"Classico">) {
  const [searchQuery, setSearchQuery] = useState("");

  const onChangeSearch = (query: React.SetStateAction<string>) =>
    setSearchQuery(query);

  return (
    <View style={{ flex: 1 }}>
      <Searchbar
        placeholder="Cerca ristorante vicino a te"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      <Card>
        <Card.Content>
          <Title>Risultati per: {searchQuery}</Title>
          <Paragraph>
            Oppure scegli da qui in base alla tua posizione attuale
          </Paragraph>
        </Card.Content>
      </Card>
      <RestaurantCard
        text="Dumbolone Pizzeria"
        indirizzo="Via Risorgimento, 150, 98057 Milazzo ME"
        orario="19:15-22:30"
        btntext="esplora"
        btfn={() =>
          navigation.navigate("Ristorante", {
            name: "Dumbolone Pizzeria",
            piatti: [
              "\n€6.50 Pizza Margherita\n",
              "€0.70 Caffè Espresso\n",
              "€5.40 Insalata Maxi\n",
            ],
          })
        }
      />
      <RestaurantCard
        text="MA sushi & locanda di mare Milazzo"
        indirizzo="Vico del Pittore, 32, 98057 Milazzo ME"
        orario="19:00-00:00"
        btntext="esplora"
        btfn={() =>
          navigation.navigate("Ristorante", {
            name: "MA sushi & locanda di mare Milazzo",
            piatti: [
              "\n€8.50 Onigiri Small 18pz\n",
              "€15.40 Sashimi 20pz\n",
              "€0.70 Caffè Espresso\n",
            ],
          })
        }
      />
    </View>
  );
}

function Ristorante({ route, navigation }: ClassicoNavProps<"Ristorante">) {
  const [state, setState] = useState({ open: false });
  const onStateChange = ({ open }: { open: any }) => setState({ open });

  const { open } = state;
  return (
    <Provider>
      <View>
        <Card>
          <Card.Content>
            <Title>Nome Ristorante: {route.params.name}</Title>
            <Paragraph>Piatti Disponibili nel Menù: {route.params.piatti}</Paragraph>
          </Card.Content>
        </Card>
        
        <Portal>
          <FAB.Group
            visible={true}
            open={open}
            icon={open ? "plus" : "plus"}
            actions={[
              {
                icon: "star",
                label: "Aggiungi ai Piatti Preferiti",
                onPress: () => console.log("Pressed notifications"),
              },
              {
                icon: "plus",
                label: "Nuovo ordine da questo ristorante",
                onPress: () => navigation.navigate('Ordine'),
              },
            ]}
            onStateChange={onStateChange}
            
          />
        </Portal>
      </View>
    </Provider>
  );
}

function Ordine(){
  return(
    <View>
      <Text>Ciao!</Text>
    </View>
  )
}

export const ClassicoStack: React.FC<ClassicoStackProps> = ({}) => {
  return (
    <Stack.Navigator initialRouteName="Classico">
      <Stack.Screen name="Classico" component={Classico} />
      <Stack.Screen name="Ristorante" component={Ristorante} />
      <Stack.Screen name="Ordine" component={Ordine} />
    </Stack.Navigator>
  );
};
