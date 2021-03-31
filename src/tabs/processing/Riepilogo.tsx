import React from "react";
import { ScrollView } from "react-native";
import { Card, Paragraph, Title, Button, Appbar } from "react-native-paper";
import { GenericNavProps } from "../../paramlists/GenericStackParamList";
import { addOrder, auth, timestamp } from "../../auth/firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentCartItems,
  getCurrentOrderRestaurantName,
  getCurrentTotal,
  resetCart,
} from "../../store/cartSlice";
import Toast from "react-native-toast-message";
import { removeAllIngredients } from "../../store/ingredientsSlice";

export function Riepilogo({ navigation }: GenericNavProps<"Riepilogo">) {
  const cartItems = useSelector(getCurrentCartItems);
  const totale = useSelector(getCurrentTotal);
  const restaurantName = useSelector(getCurrentOrderRestaurantName);
  const allIngredients = cartItems.map((item) => item);
  const dispatch = useDispatch();

  const showOrderForwardSuccessToast = () => {
    Toast.show({
      type: "success",
      text1: "Ordine inviato con successo!",
      text2: "...ora dobbiamo solo aspettare!",
      autoHide: true,
    });
  };
  const showOrderForwardErrorToast = () => {
    Toast.show({
      type: "error",
      text1: "Oh no, c'è stato un errore durante l'invio!",
      autoHide: true,
    });
  };
  return (
    <ScrollView style={{ flex: 1, alignContent: "center" }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
      </Appbar.Header>

      <Card>
        <Card.Content>
          <Paragraph>
            <Card>
              {cartItems.map((item, id) => {
                const { name, price } = item;
                return (
                  <React.Fragment key={id}>
                    <Card.Content>
                      <Title>
                        {name} | €{price}
                      </Title>
                    </Card.Content>
                  </React.Fragment>
                );
              })}
              <Card.Content>
                <Title>Totale €{totale}</Title>
              </Card.Content>
            </Card>
          </Paragraph>
          <Title>Vuoi confermare l'ordine?</Title>
          <Button
            onPress={() =>
              addOrder({
                restaurantName,
                allIngredients,
                totale,
                user: auth.currentUser?.email,
                paymentMethod: "Paypal *",
                createdAt: timestamp,
              })
                .catch((error) => console.log(error))
                .then((res) => {
                  res === true
                    ? showOrderForwardSuccessToast()
                    : showOrderForwardErrorToast();

                  dispatch(removeAllIngredients());
                  dispatch(resetCart());
                })
                .finally(() => navigation.navigate("Classico"))
            }
            mode="outlined"
          >
            Sì!
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}
