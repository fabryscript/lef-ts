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
interface VegetarianoStackProps {}

const Stack = createStackNavigator<GenericStackParamList>();

function Vegetariano({ navigation }: GenericNavProps<"Vegetariano">) {
  const [searchQuery, setSearchQuery] = useState("");

  const onChangeSearch = (query: React.SetStateAction<string>) =>
    setSearchQuery(query);

  const vegetarianRestaurantsRef = firestore.collection("/vegetarian-restaurants");
  const [vegetarianRestaurants] = useCollectionData(vegetarianRestaurantsRef);
  return (
    <View>
      <Searchbar
        placeholder="Cerca ristorante vicino a te"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      {
        vegetarianRestaurants &&
          vegetarianRestaurants.map((ristoranti: any, _index: number) => {
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

export const VegetarianoStack: React.FC<VegetarianoStackProps> = ({}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Vegetariano" component={Vegetariano} />
    </Stack.Navigator>
  );
};
