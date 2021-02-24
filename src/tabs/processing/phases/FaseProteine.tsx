import React, { useState } from "react";
import { GenericNavProps } from "../../../paramlists/GenericStackParamList";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  addItemToCart,
  getCurrentOrderRestaurantName,
  updateTotal,
} from "../../../store/cartSlice";
import { Ionicons } from "@expo/vector-icons";
import { Switch, ScrollView } from "react-native";
import { Card, Appbar, Title, List, Text, Button } from "react-native-paper";
import { plate } from "../../../models";
import { getCurrentIngredients } from "../../../store/ingredientsSlice";
import IngredientInfosCard from "../ingredient-infos/IngredientInfosCard";
import IngredientNameCard from "../ingredient-infos/IngredientNameCard";
import TotalMacronutsDetailsCard from "../ingredient-infos/TotalMacronutsDetailsCard";
import Slider from "@react-native-community/slider";

const mapDispatch = { addItemToCart };
const genericCardMargin = { marginTop: "1%" };

function FaseProteine({ navigation }: GenericNavProps<"Fasi">) {
  const allIngredients = useSelector(getCurrentIngredients);
  const currentOrderRestaurantName = useSelector(getCurrentOrderRestaurantName);

  let plates: {} | null | undefined = [];
  const dispatch = useDispatch();

  const mappedIngredients = allIngredients.map((ingredient) => ingredient);

  const filteredByPhaseIngredients = mappedIngredients.filter(
    (ingredient) => ingredient.name.phase === "proteine"
  );

  if (filteredByPhaseIngredients) {
    const [isSwitchOn, setIsSwitchOn] = useState<any[]>(
      filteredByPhaseIngredients.map((piatto) => ({
        value: false,
        ...piatto,
      }))
    );
    const [sliderQuantityValue, setSliderQuantityValue] = useState<any[]>(
      filteredByPhaseIngredients.map((ingredient) => ({
        value: 100,
        ...ingredient,
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

    const onToggleSlider = (value: number, ingrediente: any, index: number) => {
      const temp = [...sliderQuantityValue];
      temp.splice(index, 1, {
        value,
        ...ingrediente,
      });
      setSliderQuantityValue(temp);
    };

    const checkedPlatesObj = isSwitchOn.filter((el: any) => el.value);

    plates = filteredByPhaseIngredients.map((ingrediente, index) => {
      const { price, name } = ingrediente.name;
      return (
        <Card style={genericCardMargin} key={index}>
          <Card.Content>
            <Title>
              €{price} - {name}
            </Title>
            <Card.Actions>
              <Switch
                color="green"
                value={isSwitchOn[index].value}
                onValueChange={(value) =>
                  onToggleSwitch(value, ingrediente.name, index)
                }
              />
              <List.Accordion title="Modifica Quantità">
                <Text>Quantità: {sliderQuantityValue[index].value} g.</Text>
                <Slider
                  disabled={!isSwitchOn[index].value}
                  style={{ width: 200, height: 50 }}
                  minimumValue={10}
                  maximumValue={700}
                  value={sliderQuantityValue[index].value}
                  step={5}
                  minimumTrackTintColor="#36ff00"
                  maximumTrackTintColor="#000"
                  onValueChange={(value) =>
                    onToggleSlider(value, ingrediente.quantity, index)
                  }
                />
              </List.Accordion>
            </Card.Actions>
          </Card.Content>
        </Card>
      );
    });

    let totale = 0;

    const checkedPlates = checkedPlatesObj.map((plate: any, index: number) => {
      const { name, price } = plate;
      totale += price;
      return <IngredientNameCard key={index} name={name} />;
    });

    let totaleCalorie = 0;
    let totaleProteine = 0;
    let totaleCarbodrati = 0;
    let totaleGrassi = 0;

    const cardForMacros = checkedPlatesObj.map((plate: any, index: number) => {
      const { calorie, proteine, carboidrati, grassi } = plate.macronut;

      totaleCalorie += (calorie * sliderQuantityValue[index].value) / 100;
      totaleProteine += (proteine * sliderQuantityValue[index].value) / 100;
      totaleCarbodrati +=
        (carboidrati * sliderQuantityValue[index].value) / 100;
      totaleGrassi += (grassi * sliderQuantityValue[index].value) / 100;

      return (
        <IngredientInfosCard
          key={index}
          name={plate.name}
          /**
           * Se comunque consideriamo che il valore (di base) è 100g.
           */
          calorie={(calorie * sliderQuantityValue[index].value) / 100}
          carboidrati={(carboidrati * sliderQuantityValue[index].value) / 100}
          grassi={(grassi * sliderQuantityValue[index].value) / 100}
          proteine={(proteine * sliderQuantityValue[index].value) / 100}
          quantity={sliderQuantityValue[index].value}
        />
      );
    });

    return (
      <ScrollView>
        <Appbar>
          <Appbar.Header>
            <Title>Fonte di Proteine</Title>
          </Appbar.Header>
        </Appbar>
        <Card style={genericCardMargin}>
          <Card.Content>
            <Title>Ingredienti Disponibili</Title>
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
            <Title>Totale Calorie: {totaleCalorie} kCal</Title>
            <Text style={{ fontStyle: "italic" }}>
              su 2440 del tuo tetto giornaliero
            </Text>
            <List.Accordion title="Informazioni sui piatti selezionati">
              {cardForMacros}
            </List.Accordion>
            <List.Accordion title="Macronutrienti totali">
              <TotalMacronutsDetailsCard
                carboidrati={totaleCarbodrati}
                proteine={totaleProteine}
                grassi={totaleGrassi}
              />
            </List.Accordion>
          </Card.Content>
          <Card.Actions>
            <Button
              mode="outlined"
              onPress={() => navigation.goBack()}
              style={{ width: "50%", height: "100%" }}
            >
              <Ionicons name="arrow-back" size={24} color="green" />
            </Button>
            <Button
              style={{ width: "50%", height: "100%" }}
              mode="outlined"
              color="green"
              onPress={() => {
                checkedPlatesObj.map((plate, _id) => {
                  const { name, price } = plate;
                  dispatch(
                    addItemToCart({
                      name,
                      amount: price,
                      quantity: sliderQuantityValue[_id].value,
                    })
                  );
                  dispatch(
                    updateTotal({
                      totale,
                    })
                  );
                });
                navigation.navigate("FaseGrassi", {
                  restaurantName: currentOrderRestaurantName,
                });
              }}
            >
              <Ionicons name="arrow-forward" size={24} color="green" />
            </Button>
          </Card.Actions>
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

export default connect(null, mapDispatch)(FaseProteine);
