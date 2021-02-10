import { createStackNavigator } from "@react-navigation/stack";
import React, { useState } from "react";
import { View } from "react-native";
import { Searchbar, Card } from "react-native-paper";
import { RestaurantCard } from "../../components/RestaurantCard";
import {
  GenericNavProps,
  GenericStackParamList,
} from "../../paramlists/GenericStackParamList";
import images from "../../assets/images";
import { firestore } from "../../auth/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
interface VeganoStackProps {}

const Stack = createStackNavigator<GenericStackParamList>();

function Vegano({ navigation }: GenericNavProps<"Vegano">) {
  const [searchQuery, setSearchQuery] = useState("");

  const onChangeSearch = (query: React.SetStateAction<string>) =>
    setSearchQuery(query);

  const veganRestaurantsRef = firestore.collection("/vegan-restaurants");
  const [veganRestaurants] = useCollectionData(veganRestaurantsRef);
  return (
    <View>
      <Searchbar
        placeholder="Cerca ristorante vicino a te"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      {
        veganRestaurants &&
          veganRestaurants.map((ristoranti: any, _index: number) => {
            return ristoranti.restaurants.map(
              (ristorante: any, index: number) => {
                let imageName = ristorante.imageName;
                return (
                  <Card key={index}>
                    <RestaurantCard
                      text={ristorante.name}
                      indirizzo={ristorante.address}
                      orario={ristorante.hourtime}
                      btfn={() => {
                        navigation.navigate("Ristorante", {
                          restaurantName: ristorante.name,
                          piatti: ristorante.plates,
                        });
                      }}
                      btntext="esplora"
                      imageName={images[imageName]}
                    />
                  </Card>
                );
              }
            );
          })
      }
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
