import { createStackNavigator } from "@react-navigation/stack";
import React, { useState } from "react";
import { View } from "react-native";
import { Searchbar, Card, Title, Paragraph } from "react-native-paper";
import { Provider } from "react-native-paper";
import { RestaurantCard } from "../components/RestaurantCard";

interface VeganoStackProps {}

function Vegano() {
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
          text="Ngonia Bay Restaurant"
          indirizzo="Piazza Angonia, 98057 Milazzo ME"
          orario="19:30-23:00"
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

export const VeganoStack: React.FC<VeganoStackProps> = ({}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Vegano" component={Vegano} />
    </Stack.Navigator>
  );
};