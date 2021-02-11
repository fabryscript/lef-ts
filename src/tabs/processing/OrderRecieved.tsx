import React, { useState } from "react";
import { ScrollView } from "react-native";
import {
  Card,
  Paragraph,
  Title,
  Text,
  Button,
  Banner
} from "react-native-paper";
import { GenericNavProps } from "../../paramlists/GenericStackParamList";
import { addOrder, auth, timestamp } from "../../auth/firebase";

export function OrderRecieved({route}: GenericNavProps<"Riepilogo">) {
  const { allPiatti, amount, restaurantName } = route.params;
  const [ showRecievedBadge, setShowRecievedBadge] = useState<boolean>(false)
  const [ showErrorBadge, setShowErrorBadge] = useState<boolean>(false)
  return (
    <ScrollView style={{ flex: 1, alignContent: "center" }}>
      <Banner
        visible={showRecievedBadge}
        actions={[
          {
            label: "Va bene!",
            onPress: () => setShowRecievedBadge(false),
          },
        ]}
        icon="check-bold"
      >
        Perfetto! Ordine ricevuto! Controlla la tua E-Mail per ulteriori informazioni.
      </Banner>
      <Banner
        visible={showErrorBadge}
        actions={[
          {
            label: "Capito.",
            onPress: () => setShowErrorBadge(false),
          },
        ]}
        icon="cancel"
      >
        Oh no! C'è stato un problema con l'inoltro del tuo ordine, potresti riprovare tra qualche minuto?
      </Banner>
      <Card>
        <Card.Content>
          <Paragraph>
            {
              allPiatti?.map((piatto, index) => {
                  return (
                    <Card key={index}>
                      <Text>{piatto.name}</Text>
                      <Text>€{amount}</Text>
                    </Card>
                  )
              })
            }
          </Paragraph>
          <Title>Vuoi confermare l'ordine?</Title>
          <Button onPress={() => addOrder({
            restaurantName,
            amount,
            allPiatti,
            user: auth.currentUser?.email,
            paymentMethod: "Paypal *",
            createdAt: timestamp
          }).then((res) => res === true ? setShowRecievedBadge(true) : setShowErrorBadge(true))} mode="outlined">Sì!</Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}
