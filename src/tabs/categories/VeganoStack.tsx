import { createStackNavigator } from "@react-navigation/stack";
import React, { useState } from "react";
import { View } from "react-native";
import { Searchbar, Card } from "react-native-paper";
import { RestaurantCard } from "../../components/RestaurantCard";
import {
  GenericNavProps,
  GenericStackParamList,
} from "../../paramlists/GenericStackParamList";
import VeganoDB from "../../database/VeganoDB.json";
import images from "../../assets/images";
interface VeganoStackProps {}

const Stack = createStackNavigator<GenericStackParamList>();

function Vegano({ navigation }: GenericNavProps<"Vegano">) {
  const [searchQuery, setSearchQuery] = useState("");

  const onChangeSearch = (query: React.SetStateAction<string>) =>
    setSearchQuery(query);

  return (
    <View>
      <Searchbar
        placeholder="Cerca ristorante vicino a te"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      {VeganoDB.restaurants.map((ristorante, index) => {
        const imgName = ristorante.imageName;
        return (
          <Card key={index}>
            <RestaurantCard
              text={ristorante.name}
              indirizzo={ristorante.address}
              orario={ristorante.hourtime}
              btfn={() => {
                navigation.navigate("Ristorante", {
                  name: ristorante.name,
                  piatti: ristorante.plates,
                });
              }}
              btntext="esplora"
              imageName={images[imgName]}
            />
          </Card>
        );
      })}
    </View>
  );
}

export const VeganoStack: React.FC<VeganoStackProps> = ({}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Vegano" component={Vegano} />
    </Stack.Navigator>
  );
};
