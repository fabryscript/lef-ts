import { createStackNavigator } from "@react-navigation/stack";
import React, { useState } from "react";
import { View } from "react-native";
import { Searchbar, Card, Title, Paragraph } from "react-native-paper";
import { Provider } from "react-native-paper";
import { RestaurantCard } from "../components/RestaurantCard";

interface VegetarianoStackProps {}

function Vegetariano() {
  const [searchQuery, setSearchQuery] = useState("");

  const onChangeSearch = (query: React.SetStateAction<string>) =>
    setSearchQuery(query);
  return (
    <Provider>
      <View>
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
          text="Degus Pizzeria Ristorante"
          indirizzo="Via Montecastro, 69, 98057 Milazzo ME"
          orario="16:15-19:30"
          btntext="esplora"
          btfn={() =>
            console.log("we bellissimo")
          } /**Ovviamente qui ci va la navigationxD */
        />
      </View>
    </Provider>
  );
}

const Stack = createStackNavigator();

export const VegetarianoStack: React.FC<VegetarianoStackProps> = ({}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Vegetariano" component={Vegetariano} />
    </Stack.Navigator>
  );
};
