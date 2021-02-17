import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ScrollView } from "react-native";
import { Searchbar, Card } from "react-native-paper";
import { RestaurantCard } from "../../components/RestaurantCard";
import images from "../../assets/images";
import { Ristorante } from "../processing/Ristorante";
import Ordine from "../processing/Ordine";
import { OrderRecieved } from "../processing/OrderRecieved";
import {
  GenericNavProps,
  GenericStackParamList,
} from "../../paramlists/GenericStackParamList";
import { firestore } from "../../auth/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";

interface ClassicoStackProps {}

const Stack = createStackNavigator<GenericStackParamList>();

function Classico({ navigation }: GenericNavProps<"Classico">) {
  const [searchQuery, setSearchQuery] = useState<string | any>();

  const onChangeSearch = (query: React.SetStateAction<string| undefined>) =>
    setSearchQuery(query);

  const classicoRestaurantsRef = firestore.collection("/classico-restaurants");
  const [classicoRestaurants] = useCollectionData(classicoRestaurantsRef);

  return (
    <ScrollView style={{ flex: 1 }}>
      <Searchbar
        placeholder="Cerca ristorante vicino a te"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      {
        classicoRestaurants &&
          classicoRestaurants.map((ristoranti: any, _index: number) => {
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
    </ScrollView>
  );
}
export const ClassicoStack: React.FC<ClassicoStackProps> = ({}) => {
  return (
    <Stack.Navigator initialRouteName="Classico">
      <Stack.Screen name="Classico" options={{headerShown: false}} component={Classico} />
      <Stack.Screen name="Ristorante" options={{headerShown: false}}  component={Ristorante} />
      <Stack.Screen name="Ordine" options={{headerShown: false}}  component={Ordine} />
      <Stack.Screen name="Riepilogo" options={{headerShown: false}}  component={OrderRecieved} />
    </Stack.Navigator>
  );
};
