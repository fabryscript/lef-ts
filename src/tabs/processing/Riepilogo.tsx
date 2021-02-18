import React, { useState } from "react";
import { ScrollView } from "react-native";
import {
  Card,
  Paragraph,
  Title,
  Text,
  Button,
  Banner,
  Appbar
} from "react-native-paper";
import { GenericNavProps } from "../../paramlists/GenericStackParamList";
import { addOrder, auth, timestamp } from "../../auth/firebase";
import { useSelector } from "react-redux";
import { getCurrentCartItems, getCurrentTotal } from "../../store/cartSlice";

export function Riepilogo({route, navigation}: GenericNavProps<"Riepilogo">) {
  const { restaurantName } = route.params;
  const [ showRecievedBadge, setShowRecievedBadge] = useState<boolean>(false);
  const [ showErrorBadge, setShowErrorBadge] = useState<boolean>(false);

  const cartItems = useSelector(getCurrentCartItems);
  const totale = useSelector(getCurrentTotal);
  const allIngredients = cartItems.map((item) => item);

  return (
    <ScrollView style={{ flex: 1, alignContent: "center" }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
      </Appbar.Header>
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
          <Card>
            {
              cartItems.map((item, id) => {
                const {name, amount} = item;
                return (
                  <React.Fragment key={id}>
                    <Text>{name}</Text>
                    <Text>€{amount}</Text>
                    <Text>Totale: €{totale}</Text>
                  </React.Fragment>
                )
              })
            }
          </Card>
          </Paragraph>
          <Title>Vuoi confermare l'ordine?</Title>
          <Button
            onPress={() => addOrder({
              restaurantName,
              allIngredients,
              totale,
              user: auth.currentUser?.email,
              paymentMethod: "Paypal *",
              createdAt: timestamp
            })
            .catch((error) => console.log(error))
            .then((res) => res === true ? setShowRecievedBadge(true) : setShowErrorBadge(true)
            )}
            mode="outlined"
          >Sì!</Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}
