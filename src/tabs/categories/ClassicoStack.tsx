import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ScrollView } from "react-native";
import { Searchbar, Card } from "react-native-paper";
import { RestaurantCard } from "../../components/RestaurantCard";
import images from "../../assets/images";
import Ristorante from "../processing/Ristorante";
import Fasi from "../processing/phases/Fasi";
import { Riepilogo } from "../processing/Riepilogo";
import {
  GenericNavProps,
  GenericStackParamList,
} from "../../paramlists/GenericStackParamList";
import { firestore } from "../../auth/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { connect, useDispatch } from "react-redux";
import { addItemToCart } from "../../store/cartSlice";

interface ClassicoStackProps {}

const Stack = createStackNavigator<GenericStackParamList>();
const mapDispatch = { addItemToCart };

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
                const {imageName, name, address, hourtime, plates} = ristorante;
                return (
                  <Card key={index}>
                    <RestaurantCard
                      text={name}
                      indirizzo={address}
                      orario={hourtime}
                      btfn={() => {
                        navigation.navigate("Ristorante", {
                          restaurantName: name,
                          piatti: plates,
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
const ClassicoStack: React.FC<ClassicoStackProps> = ({}) => {
  return (
    <Stack.Navigator initialRouteName="Classico">
      <Stack.Screen name="Classico" options={{headerShown: false}} component={Classico} />
      <Stack.Screen name="Ristorante" options={{headerShown: false}}  component={Ristorante} />
      <Stack.Screen name="Fasi" options={{headerShown: false}}  component={Fasi} />
      <Stack.Screen name="Riepilogo" options={{headerShown: false}}  component={Riepilogo} />
    </Stack.Navigator>
  );
};

export default connect(null, mapDispatch)(ClassicoStack);