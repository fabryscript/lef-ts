import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import {
  Card,
  Title,
  Paragraph,
  FAB,
  Provider,
  Portal,
  Appbar,
} from "react-native-paper";
import { connect, useDispatch } from "react-redux";
import { GenericNavProps } from "../../paramlists/GenericStackParamList";
import { CombinedDarkTheme } from "../../Routes";
import { updateRestaurantName } from "../../store/cartSlice";
import { addIngredients } from "../../store/ingredientsSlice";

const mapDispatch = {addIngredients};

function Ristorante({ route, navigation }: GenericNavProps<"Ristorante">) {
 const [state, setState] = useState({ open: false });
 const onStateChange = ({ open }: { open: any; }) => setState({ open });
 const { open } = state;
 const { piatti, restaurantName } = route.params;

 const dispatch = useDispatch();

 const transitionToFasi = () => {
  dispatch(
    updateRestaurantName({
      restaurantName
    })
  )
  navigation.navigate("Fasi");
 }
  // Questo useEffect() serve per mettere nello store gli ingredienti del ristorante corrente
  // che sta venendo selezionato

  useEffect(() => {
    piatti?.forEach((ingredientName, _id) => {
      dispatch(
        addIngredients({
          ingredientName
        })
      );
    });
  }, [piatti]);

  return (
    <Provider theme={CombinedDarkTheme}>
      <ScrollView>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
        </Appbar.Header>
        <Card>
          <Card.Content>
            <Title>Nome Ristorante: {restaurantName}</Title>
            <Paragraph>Ingredienti Disponibili nel Menù:</Paragraph>
          </Card.Content>
        </Card>

        {
          piatti &&
            piatti.map((plate, id) => (
              <Card style={{marginTop: 10}} key={id}>
                <Card.Content>
                  <Title>{plate.name}</Title>
                  <Paragraph>€{plate.price}</Paragraph>
                </Card.Content>
              </Card>
            ))
        }

        <Portal>
          <FAB.Group
            visible={true}
            fabStyle={{backgroundColor: "#e3e5e3"}}
            color="#000000"
            open={open}
            icon={open ? "plus" : "plus"}
            actions={[
              {
                icon: "star",
                label: "Aggiungi ai Piatti Preferiti",
                onPress: () => console.log("Devi aggiungere nei preferiti"),
              },
              {
                icon: "plus",
                label: "Nuovo ordine da questo ristorante",
                onPress: () => transitionToFasi(),
              },
            ]}
            onStateChange={onStateChange} />
        </Portal>
      </ScrollView>
    </Provider>
  );
}

export default connect(null, mapDispatch)(Ristorante)