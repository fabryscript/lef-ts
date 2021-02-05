import React, { useState } from "react";
import { ScrollView } from "react-native";
import {
  Card,
  Title,
  Paragraph,
  Text,
  Provider,
  Portal,
  Switch,
  Button,
  Modal,
} from "react-native-paper";
import { plate } from "../../models/plate";
import { GenericNavProps } from "../../paramlists/GenericStackParamList";

const genericCardMargin = { marginTop: 10 };

export function Ordine({ route, navigation }: GenericNavProps<"Ordine">) {
  const allPiatti = route.params.allPiatti;
  const [shown, setShown] = useState(false);
  let plates: {} | null | undefined = [];
  const hideModal = () => setShown(false);

  if (allPiatti) {
    const [isSwitchOn, setIsSwitchOn] = useState<any[]>(
      allPiatti.map((piatto) => ({
        value: false,
        ...piatto,
      }))
    );

    const onToggleSwitch = (
      value: boolean,
      piatto: plate | undefined,
      index: number
    ) => {
      const temp = [...isSwitchOn];
      temp.splice(index, 1, {
        value,
        ...piatto,
      });
      setIsSwitchOn(temp);
    };

    const checkedPlatesObj = isSwitchOn.filter((el: any) => el.value);

    plates = allPiatti.map((element, index) => (
      <Card style={genericCardMargin} key={index}>
        <Card.Content>
          <Paragraph>
            <Switch
              color="green"
              value={isSwitchOn[index].value}
              onValueChange={(value) => onToggleSwitch(value, element, index)}
            />
            €{element.price} - {element.name}
            <Button
              onPress={() => setShown(true)}
              mode="outlined"
              color="green"
              disabled={checkedPlatesObj.length === 0}
            >
              Mostra Macronutrienti
            </Button>
          </Paragraph>
        </Card.Content>
      </Card>
    ));

    let totale = 0;

    const checkedPlates = checkedPlatesObj.map((el: any, index: number) => {
      totale += el.price;

      return (
        <Card style={genericCardMargin} key={index}>
          <Card.Content>
            <Text>{el.name}</Text>
          </Card.Content>
        </Card>
      );
    });

    let totaleCalorie = 0;
    let totaleProteine = 0;
    let totaleCarbodrati = 0;
    let totaleGrassi = 0;

    const modalForMacros = checkedPlatesObj.map((el: any, index: number) => {
      const { calorie, proteine, carboidrati, grassi } = el.macronut;

      totaleCalorie += calorie;
      totaleProteine += proteine;
      totaleCarbodrati += carboidrati;
      totaleGrassi += grassi;

      return (
        <Card key={index}>
          <Card.Content>
            <Title>Valori nutrizionali su 100g del prodotto: {el.name}</Title>
            <Paragraph>Calorie: {calorie} kCal</Paragraph>
            <Paragraph>Proteine: {proteine} g</Paragraph>
            <Paragraph>Carboidrati: {carboidrati} g</Paragraph>
            <Paragraph>Grassi: {grassi} g</Paragraph>
          </Card.Content>
        </Card>
      );
    });

    return (
      <ScrollView>
        <Card style={genericCardMargin}>
          <Card.Content>
            <Title>
              Piatti Disponibili per il ristorante: {route.params.name}
            </Title>
          </Card.Content>
        </Card>
        {plates}
        <Card style={genericCardMargin}>
          <Card.Content>
            <Title>Riepilogo Ordine:</Title>
          </Card.Content>
        </Card>
        {checkedPlates}
        <Card style={genericCardMargin}>
          <Card.Content>
            <Title>Totale: €{totale}</Title>
            <Title>
              Totale Calorie: {totaleCalorie} kCal su 2440 del tuo tetto
              giornaliero
            </Title>
            <Card.Content>
              <Text>Totale Proteine: {totaleProteine} g</Text>
              <Text>Totale Carboidrati: {totaleCarbodrati} g</Text>
              <Text>Totale Grassi: {totaleGrassi} g</Text>
            </Card.Content>
            <Button
              disabled={checkedPlates.length === 0}
              mode="outlined"
              color="green"
              onPress={() => navigation.navigate("Ricevuto", {
                amount: totale,
                allPiatti: checkedPlatesObj
              })}
            >
              Conferma Ordine
            </Button>
          </Card.Content>
        </Card>
        <Portal>
          <Modal visible={shown} onDismiss={hideModal}>
            {modalForMacros}
          </Modal>
        </Portal>
      </ScrollView>
    );
  }
  return (
    <Card>
      <Card.Content>Qui non c'è nulla :(</Card.Content>
    </Card>
  );
}
