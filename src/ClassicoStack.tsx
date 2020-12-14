import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { View, ScrollView, Image } from "react-native";
import { useForm } from "react-hook-form";
import {
  Searchbar,
  Card,
  Title,
  Paragraph,
  Text,
  FAB,
  Provider,
  Portal,
  Switch,
  Button,
  Modal,
} from "react-native-paper";
import { RestaurantCard } from "../components/RestaurantCard";
import { ClassicoNavProps, ClassicoParamList } from "./ClassicoStackParamList";
import Db from "./dbex.json";
import { plate } from "./models/plate";
const Dumbo = require('../assets/dumbolone.jpg')
const MA = require('../assets/masushi.jpg')

interface ClassicoStackProps {}

let db = Db;

const Stack = createStackNavigator<ClassicoParamList>();

function Classico({ navigation }: ClassicoNavProps<"Classico">) {
  const [searchQuery, setSearchQuery] = useState("");

  const onChangeSearch = (query: React.SetStateAction<string>) =>
    setSearchQuery(query);

  return (
    <ScrollView style={{ flex: 1 }}>
      <Searchbar
        placeholder="Cerca ristorante vicino a te"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      <Card>
        <Card.Content>
          <Title>Risultati per: {searchQuery}</Title>
          <Paragraph>
            Oppure scegli da qui in base alla tua posizione attuale
          </Paragraph>
        </Card.Content>
      </Card>
      <RestaurantCard
        text="Dumbolone Pizzeria"
        indirizzo="Via Risorgimento, 150, 98057 Milazzo ME"
        orario="19:15-22:30"
        btntext="esplora"
        btfn={() =>
          navigation.navigate("Ristorante", {
            name: "Dumbolone Pizzeria",
            piatti: db.plates,
          })
        }
        imageName={Dumbo}
      />
      <RestaurantCard
        text="MA sushi & locanda di mare Milazzo"
        indirizzo="Vico del Pittore, 32, 98057 Milazzo ME"
        orario="19:00-00:00"
        btntext="esplora"
        btfn={() =>
          navigation.navigate("Ristorante", {
            name: "MA sushi & locanda di mare Milazzo",
            piatti: db.plates,
          })
        }
        imageName={MA}
      />
    </ScrollView>
  );
}

function Ristorante({ route, navigation }: ClassicoNavProps<"Ristorante">) {
  const [state, setState] = useState({ open: false });
  const onStateChange = ({ open }: { open: any }) => setState({ open });

  const { open } = state;
  let piatti: string[] = [];

  if (route.params.piatti) {
    piatti = route.params.piatti.map((el) => el.name);
  }

  return (
    <Provider>
      <View>
        <Card>
          <Card.Content>
            <Title>Nome Ristorante: {route.params.name}</Title>
            <Paragraph>Piatti Disponibili nel Menù: {piatti}</Paragraph>
          </Card.Content>
        </Card>

        <Portal>
          <FAB.Group
            visible={true}
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
                onPress: () =>
                  navigation.navigate("Ordine", {
                    name: route.params.name,
                    allPiatti: route.params.piatti,
                  }),
              },
            ]}
            onStateChange={onStateChange}
          />
        </Portal>
      </View>
    </Provider>
  );
}
{
  /**Array,  */
}
function Ordine({ route, navigation }: ClassicoNavProps<"Ordine">) {
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
      <Card key={index}>
        <Card.Content>
          <Paragraph>
            <Switch
              value={isSwitchOn[index].value}
              onValueChange={(value) => onToggleSwitch(value, element, index)}
            />
            €{element.price} - {element.name}
            <Button
              onPress={() => setShown(true)}
              mode="outlined"
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
        <Card key={index}>
          <Card.Content>
            <Text>{el.name}</Text>
          </Card.Content>
        </Card>
      );
    });

    let totaleCalorie = 0;
    
    const modalForMacros = checkedPlatesObj.map((el: any, index: number) => {
      let calorie = el.macronut.calorie;
      let proteine = el.macronut.proteine;
      let carboidrati = el.macronut.carboidrati;
      let grassi = el.macronut.grassi;
      totaleCalorie += calorie 

      return (
        <Card key={index}>
          <Card.Content>
            <Title>Valori nutrizionali su 100g del prodotto: {el.name}</Title>
            <Paragraph>  </Paragraph>
            <Paragraph>Calorie: {calorie} kCal</Paragraph>
            <Paragraph>Proteine: {proteine} g</Paragraph>
            <Paragraph>Carboidrati: {carboidrati} g</Paragraph>
            <Paragraph>Grassi: {grassi} g</Paragraph>
          </Card.Content>
        </Card>
      );
      {/**EUREKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA */}
    });

    return (
      <ScrollView>
        <Card>
          <Card.Content>
            <Title>
              Piatti Disponibili per il ristorante: {route.params.name}
            </Title>
          </Card.Content>
        </Card>
        {plates}
        <Card>
          <Card.Content>
            <Title>Riepilogo Ordine</Title>
          </Card.Content>
        </Card>
        {checkedPlates}
        <Card>
          <Card.Content>
            <Title>Totale: €{totale}</Title>
            <Title>Totale Calorie: {totaleCalorie} kCal</Title>
            <Button
              disabled={checkedPlates.length === 0}
              mode="outlined"
              onPress={() => navigation.navigate('Ricevuto')}
            >
              Conferma Ordine
            </Button>
          </Card.Content>
        </Card>
        <Provider>
          <Portal>
            <Modal visible={shown} onDismiss={hideModal}>
              {modalForMacros}
            </Modal>
          </Portal>
        </Provider>
      </ScrollView>
    );
  }
  return (
    <Card>
      <Card.Content>Qui non c'è nulla :(</Card.Content>
    </Card>
  );
}

function OrderRecieved(){
  return(
    <ScrollView style={{flex: 1, alignContent: "center"}}>
      <Card>
        <Card.Content>
          <Title>✔Il tuo ordine è stato ricevuto con successo!
          Grazie!💗</Title>
        </Card.Content>
      </Card>
    </ScrollView>
  )
}

export const ClassicoStack: React.FC<ClassicoStackProps> = ({}) => {
  return (
    <Stack.Navigator initialRouteName="Classico">
      <Stack.Screen name="Classico" component={Classico} />
      <Stack.Screen name="Ristorante" component={Ristorante} />
      <Stack.Screen name="Ordine" component={Ordine} />
      <Stack.Screen name="Ricevuto" component={OrderRecieved} />
    </Stack.Navigator>
  );
};
