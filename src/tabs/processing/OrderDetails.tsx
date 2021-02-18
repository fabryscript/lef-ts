import React from "react";
import { ScrollView } from "react-native";
import { Card, Paragraph, Title } from "react-native-paper";
import { GenericNavProps } from "../../paramlists/GenericStackParamList";

const OrderDetails = ({ route }: GenericNavProps<"OrderDetails">) => {
  const {orderID, restaurantName, method, amount, allIngredients} = route.params;
  return (
    <ScrollView>
      <Card>
        <Card.Content>
          <Title>Dettagli dell'ordine: {orderID}</Title>
          <Paragraph>Ristorante: {restaurantName}</Paragraph>
          <Paragraph>Metodo di Pagamento: {method}</Paragraph>
          <Paragraph>Importo: €{amount}</Paragraph>
          <Paragraph>Piatti ordinati:</Paragraph>
          {
            allIngredients?.map((piatto, id) => {
              return (
                <Paragraph key={id}>
                  {piatto.name} - €{piatto.amount}
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
