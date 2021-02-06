import React from "react";
import { ScrollView } from "react-native";
import { Card, Paragraph, Title } from "react-native-paper";
import { GenericNavProps } from "../../paramlists/GenericStackParamList";

const OrderDetails = ({ route }: GenericNavProps<"OrderDetails">) => {
  return (
    <ScrollView>
      <Card>
        <Card.Content>
          <Title>Dettagli dell'ordine: {route.params.orderID}</Title>
          <Paragraph>Ristorante: {route.params.restaurantName}</Paragraph>
          <Paragraph>Metodo di Pagamento: {route.params.method}</Paragraph>
          <Paragraph>Importo: {route.params.amount}</Paragraph>
          <Paragraph>Piatti ordinati:</Paragraph>
          {route.params.allPiatti?.map((piatto, id) => {
            return (
              <Paragraph key={id}>
                {piatto.name} - €{piatto.price}
              </Paragraph>
            );
          })}
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

export default OrderDetails;
