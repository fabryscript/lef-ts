import React from "react";
import { ScrollView } from "react-native";
import {
  Card,
  Paragraph,
  Title,
  Text
} from "react-native-paper";
import { GenericNavProps } from "../../paramlists/GenericStackParamList";
import OrdiniRecentiDB from "../../database/OrdiniRecentiDB.json"

export function OrderRecieved({route}: GenericNavProps<"Ricevuto">) {
  const { allPiatti, amount } = route.params;
  const _amount = amount!.toString()
  return (
    <ScrollView style={{ flex: 1, alignContent: "center" }}>
      <Card>
        <Card.Content>
          <Paragraph>
            {
              allPiatti?.map((piatto, index) => {
                OrdiniRecentiDB.push({
                  id: index,
                  paymentDetails: {
                    amount: _amount,
                    method: 'PayPal'
                  },
                   place: piatto.name,
                   where: 'Boh'
                })
                {/**Redux or Firebase Doc, gogo! */}
                return(
                  <Card key={index}>
                    <Text>{piatto.name}</Text>
                    <Text>{amount}</Text>
                  </Card>
                )
              })
            }
          </Paragraph>
          <Title>✔Il tuo ordine è stato ricevuto con successo! Grazie!💗</Title>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}
