import React, { useState } from "react";
import { ScrollView } from "react-native";
import {
  Card,
  Title,
  Paragraph,
  FAB,
  Provider,
  Portal,
} from "react-native-paper";
import { GenericNavProps } from "../../paramlists/GenericStackParamList";
import { CombinedDarkTheme } from "../../Routes";

export function Ristorante({ route, navigation }: GenericNavProps<"Ristorante">) {
  const [state, setState] = useState({ open: false });
  const onStateChange = ({ open }: { open: any; }) => setState({ open });
  const { open } = state;

  const { piatti, restaurantName } = route.params;

  return (
    <Provider theme={CombinedDarkTheme}>
      <ScrollView>
        <Card>
          <Card.Content>
            <Title>Nome Ristorante: {restaurantName}</Title>
            <Paragraph>Piatti Disponibili nel Menù:</Paragraph>
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
                onPress: () => navigation.navigate("Ordine", {
                  restaurantName: route.params.restaurantName,
                  allPiatti: route.params.piatti,
                }),
              },
            ]}
            onStateChange={onStateChange} />
        </Portal>
      </ScrollView>
    </Provider>
  );
}
