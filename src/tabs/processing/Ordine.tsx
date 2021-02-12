import React, { useState } from "react";
import { ScrollView } from "react-native";
import {
  Card,
  Title,
  Paragraph,
  Text,
  Portal,
  Switch,
  Button,
  Modal,
  List,
  Appbar,
} from "react-native-paper";
import { useDispatch, connect } from "react-redux";
import { plate } from "../../models/plate";
import { GenericNavProps } from "../../paramlists/GenericStackParamList";
import { addItemToCart, updateTotal } from "../../store/cartSlice";
import PlateInfosCard from "./plate-infos/PlateInfosCard";
import PlateNameCard from "./plate-infos/PlateNameCard";
import TotalMacronutsDetailsCard from "./plate-infos/TotalMacronutsDetailsCard";

const genericCardMargin = { marginTop: 10 };
const mapDispatch = { addItemToCart }

function Ordine({ route, navigation }: GenericNavProps<"Ordine">) {
  const allPiatti = route.params.allPiatti;
  let plates: {} | null | undefined = [];
  const dispatch = useDispatch();

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

          </Paragraph>
        </Card.Content>
      </Card>
    ));

    let totale = 0;

    const checkedPlates = checkedPlatesObj.map((plate: any, index: number) => {
      const {name, price} = plate;
      totale += price;
      return (
        <PlateNameCard
          key={index}
          name={name}
        />
      );
    });

    let totaleCalorie = 0;
    let totaleProteine = 0;
    let totaleCarbodrati = 0;
    let totaleGrassi = 0;

    const cardForMacros = checkedPlatesObj.map((plate: any, index: number) => {
      const { calorie, proteine, carboidrati, grassi } = plate.macronut;

      totaleCalorie += calorie;
      totaleProteine += proteine;
      totaleCarbodrati += carboidrati;
      totaleGrassi += grassi;

      return (
        <PlateInfosCard
         key={index}
         name={plate.name}
         calorie={calorie}
         carboidrati={carboidrati}
         grassi={grassi}
         proteine={proteine}
        />
      );
    });

    return (
      <ScrollView>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
        </Appbar.Header>
        <Card style={genericCardMargin}>
          <Card.Content>
            <Title>
              Piatti Disponibili per il ristorante: {route.params.restaurantName}
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
              Totale Calorie: {totaleCalorie} kCal
            </Title>
            <Text style={{fontStyle: "italic"}}>
             su 2440 del tuo tetto giornaliero
            </Text>
            <List.Accordion
              title="Informazioni sui piatti selezionati"
            >
                {cardForMacros}
            </List.Accordion>
              <List.Accordion title="Macronutrienti totali">
                <TotalMacronutsDetailsCard
                  carboidrati={totaleCarbodrati}
                  proteine={totaleProteine}
                  grassi={totaleGrassi}
                />
              </List.Accordion>
            <Button
              disabled={checkedPlates.length === 0}
              mode="outlined"
              color="green"
              onPress={() => {
                checkedPlatesObj.map((plate, _id) => {
                  dispatch(
                    addItemToCart({
                      name: plate.name,
                      amount: plate.price,
                    })
                  );
                  dispatch(
                    updateTotal({
                      totale
                    })
                  )
                });
                navigation.navigate("Riepilogo", {
                  restaurantName: route.params.restaurantName
                })
              }}
            >
              Vai al Riepilogo e la Conferma
            </Button>
          </Card.Content>
        </Card>
      </ScrollView>
    );
  }
  return (
    <Card>
      <Card.Content>Qui non c'è nulla :(</Card.Content>
    </Card>
  );
}

export default connect(null, mapDispatch)(Ordine);