import React from "react";
import { ScrollView } from "react-native";
import { Card, Paragraph, Title } from "react-native-paper";
import { GenericNavProps } from "../../paramlists/GenericStackParamList";

const OrderDetails = ({ route }: GenericNavProps<"OrderDetails">) => {
  const {orderID, restaurantName, method, price, allIngredients} = route.params;
  return (
    <ScrollView>
      <Card>
        <Card.Content>
          <Title>Dettagli dell'ordine: {orderID}</Title>
          <Paragraph>Ristorante: {restaurantName}</Paragraph>
          <Paragraph>Metodo di Pagamento: {method}</Paragraph>
          <Paragraph>Importo: €{price}</Paragraph>
          <Paragraph>Piatti ordinati:</Paragraph>
          {
            allIngredients?.map((ingredient, id) => {
              const { name, price } = ingredient;
              return (
                <Paragraph key={id}>
                  {name} - €{price}
                </Paragraph>
              );
            })
          }
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

export default OrderDetails;
