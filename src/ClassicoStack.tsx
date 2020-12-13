import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { View } from "react-native";
import {useForm} from "react-hook-form";
import {
  Searchbar,
  Card,
  Title,
  Paragraph,
  Text,
  FAB,
  Provider,
  Portal,
  Checkbox,
  Switch,
} from "react-native-paper";
import { RestaurantCard } from "../components/RestaurantCard";
import { ClassicoNavProps, ClassicoParamList } from "./ClassicoStackParamList";
import { Value } from "react-native-reanimated";

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
              "\n\n€6.50 Pizza Capricciosa\n\n",
              "€9.50 Calzone Speck, Radicchio e Mozzarella di Bufala D.O.P\n\n",
              "€0.70 Caffè Espresso Borbone™\n\n",
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
              "\n\n€12.50 Onigiri 12pz\n\n",
              "€9.00 Osōmaki 10pz\n\n",
              "€13/L Sake Originale\n\n",
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
            <Paragraph>
              Piatti Disponibili nel Menù: {route.params.piatti}
            </Paragraph>
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
                onPress: () => console.log("Devi aggiungere nei preferiti"),
              },
              {
                icon: "plus",
                label: "Nuovo ordine da questo ristorante",
                onPress: () =>
                  navigation.navigate("Ordine", {
                    name: route.params.name,
                    allPiatti: route.params.piatti,
                  }),
              },
            ]}
            onStateChange={onStateChange}
          />
        </Portal>
      </View>
    </Provider>
  );
}

function Ordine({ route }: ClassicoNavProps<"Ordine">) {
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn)

  let plates = route.params.allPiatti?.map(element => (
    <Card>
      <Card.Content>
        <Paragraph>
          <Switch 
            value={isSwitchOn}
            onValueChange={onToggleSwitch}
          />
          {element}
        </Paragraph>
      </Card.Content>
    </Card>
  ));
  
  return (
    <View>
      <Card>
        <Card.Content>
          <Title>{route.params.name}</Title>
        </Card.Content>
      </Card>
      {plates} 
    </View>
  );
}
{/**bruh why this worked tho? map() magic? */
/**comunque, ogni switch deve avere il suo state e poi fare un submit di massa */
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