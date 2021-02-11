import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ScrollView, View } from "react-native";
import { Button, Card, Text, Title } from "react-native-paper";
import { CardHistory } from "../components/CardHistory";
import { auth, firestore } from "../auth/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { GenericNavProps } from "../paramlists/GenericStackParamList";
import OrderDetails from "./processing/OrderDetails";
interface OrdiniRecentiStackProps {}

function OrdiniRecenti({
  navigation,
  route,
}: GenericNavProps<"OrdiniRecenti">) {
  const ordersCollectionRef = firestore.collection("/orders");
  const query = ordersCollectionRef.orderBy("createdAt").limit(100);
  const [orders] = useCollectionData(query);

  return (
    <ScrollView style={{ width: "100%" }}>
      {orders &&
        orders.map((order: any, id: number) => {
          if (order.user === auth.currentUser?.email) {
            // id è + 1 poichè array index always starts at 0
            const { allPiatti, amount, paymentMethod, restaurantName } = order;
            return (
              <>
                <Card key={id}>
                  <Card.Content>
                    <Title>Ordine #{id + 1}</Title>
                    <Title>{restaurantName}</Title>
                  </Card.Content>
                  <Card.Actions>
                    <Button
                      onPress={() =>
                        navigation.navigate("OrderDetails", {
                          allPiatti,
                          amount,
                          method: paymentMethod,
                          orderID: `Ordine #${id + 1}`,
                          restaurantName,
                        })
                      }
                    >
                      Dettagli Ordine
                    </Button>
                  </Card.Actions>
                </Card>
              </>
            );
          } else {
            // ...
          }
        })}
    </ScrollView>
  );
}

const Stack = createStackNavigator();

export const OrdiniRecentiStack: React.FC<OrdiniRecentiStackProps> = ({}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="OrdiniRecenti"
        options={{ headerTitle: "Ordini Recenti" }}
        component={OrdiniRecenti}
      />
      <Stack.Screen
        name="OrderDetails"
        options={{ headerTitle: "Dettagli Ordine" }}
        component={OrderDetails}
      />
    </Stack.Navigator>
  );
};
