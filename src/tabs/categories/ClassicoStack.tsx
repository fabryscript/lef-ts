import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ScrollView } from "react-native";
import {
  Searchbar,
  Card,
} from "react-native-paper";
import { RestaurantCard } from "../../components/RestaurantCard";
import images from '../../assets/images'
import classicoDB from "../../database/ClassicoDB.json";
import { Ristorante } from "../processing/Ristorante";
import { Ordine } from "../processing/Ordine";
import { OrderRecieved } from "../processing/OrderRecieved";
import { GenericNavProps, GenericStackParamList } from "../../paramlists/GenericStackParamList";

interface ClassicoStackProps {}

const Stack = createStackNavigator<GenericStackParamList>();

function Classico({ navigation }: GenericNavProps<"Classico">) {
  const [searchQuery, setSearchQuery] = useState("");

  const onChangeSearch = (query: React.SetStateAction<string>) =>
    setSearchQuery(query);

  return (
    <ScrollView style={{ flex: 1 }}>
      <Searchbar
        placeholder="Cerca ristorante vicino a te"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      {
        classicoDB.restaurants.map((ristorante, index) => {
          const imgName = ristorante.imageName
          return (
            <Card key={index}>
              <RestaurantCard
                text={ristorante.name}
                indirizzo={ristorante.address}
                orario={ristorante.hourtime}
                btfn={() => {
                  navigation.navigate('Ristorante', {
                    restaurantName: ristorante.name,
                    piatti: ristorante.plates
                  })
                }}
                btntext="esplora"
                imageName={images[imgName]}
              />
            </Card>
          );
        })
        }
    </ScrollView>
  );
}

export const ClassicoStack: React.FC<ClassicoStackProps> = ({}) => {
  return (
    <Stack.Navigator initialRouteName="Classico">
      <Stack.Screen name="Classico" component={Classico} />
      <Stack.Screen name="Ristorante" component={Ristorante} />
      <Stack.Screen name="Ordine" component={Ordine} />
      <Stack.Screen name="Ricevuto" component={OrderRecieved} />
    </Stack.Navigator>
  );
};
