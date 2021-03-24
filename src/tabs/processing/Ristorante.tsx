import React, { useState } from "react";
import { ScrollView } from "react-native";
import {
  Card,
  Title,
  Paragraph,
  FAB,
  Provider,
  Portal,
  Appbar,
  Chip,
} from "react-native-paper";
import { connect, useDispatch } from "react-redux";
import { GenericNavProps } from "../../paramlists/GenericStackParamList";
import { CombinedDefaultTheme } from "../../Routes";
import { updateRestaurantName } from "../../store/cartSlice";
import { addIngredients } from "../../store/ingredientsSlice";

const mapDispatch = { addIngredients };

function Ristorante({ route, navigation }: GenericNavProps<"Ristorante">) {
  const [state, setState] = useState({ open: false });
  const onStateChange = ({ open }: { open: any }) => setState({ open });
  const { open } = state;
  const { piatti, restaurantName } = route.params;

  const dispatch = useDispatch();

  const transitionToFasi = () => {
    piatti?.forEach((ingredient: any, _id) => {
      const {
        name,
        price,
        vegan,
        vegetarian,
        imageURI,
        phase,
        macronut,
      } = ingredient;
      dispatch(
        addIngredients({
          name,
          price,
          vegan,
          vegetarian,
          imageURI,
          phase,
          macronut,
        })
      );
    });
    dispatch(
      updateRestaurantName({
        restaurantName,
      })
    );
    navigation.navigate("Fasi", {});
  };

  return (
    <Provider theme={CombinedDefaultTheme}>
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

        {piatti &&
          piatti.map((plate: any, id) => {
            const { name, imageURI, price, vegan, vegetarian } = plate;
            return (
              <Card style={{ marginTop: 10 }} key={id}>
                <Card.Cover source={{ uri: imageURI }} />
                <Card.Content>
                  <Title>{name}</Title>
                  <Paragraph>€{price} </Paragraph>
                </Card.Content>
                <Card.Actions>
                  {vegetarian && <Chip mode="outlined">Vegetariano</Chip>}
                  {vegan && <Chip mode="outlined">Vegan</Chip>}
                </Card.Actions>
              </Card>
            );
          })}

        <Portal>
          <FAB.Group
            visible={true}
            fabStyle={{ backgroundColor: "#e3e5e3" }}
            color="#000000"
            open={open}
            icon={open ? "plus" : "plus"}
            actions={[
              {
                icon: "plus",
                label: "Nuovo ordine da questo ristorante",
                onPress: () => transitionToFasi(),
              },
            ]}
            onStateChange={onStateChange}
          />
        </Portal>
      </ScrollView>
    </Provider>
  );
}

export default connect(null, mapDispatch)(Ristorante);
