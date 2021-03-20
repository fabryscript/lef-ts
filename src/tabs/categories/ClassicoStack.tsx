import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ScrollView } from "react-native";
import { Card } from "react-native-paper";
import { RestaurantCard } from "../../components/RestaurantCard";
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
import { removeAllIngredients } from "../../store/ingredientsSlice";

interface ClassicoStackProps {}

const Stack = createStackNavigator<GenericStackParamList>();
const mapDispatch = { addItemToCart };

function Classico({ navigation }: GenericNavProps<"Classico">) {

  const classicoRestaurantsRef = firestore.collection("/classico-restaurants");
  const [classicoRestaurants] = useCollectionData(classicoRestaurantsRef);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(removeAllIngredients());
  });

  return (
    <ScrollView style={{ flex: 1 }}>
      {
        classicoRestaurants &&
          classicoRestaurants.map((ristoranti: any, _index: number) => {
            return ristoranti.restaurants.map(
              (ristorante: any, index: number) => {
                const {imageURI, name, address, hourtime, plates, } = ristorante;
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
                      imageURI={imageURI}
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