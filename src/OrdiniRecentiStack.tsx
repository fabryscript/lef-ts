import { createStackNavigator } from "@react-navigation/stack";
import React, { useState } from "react";
import { ScrollView } from "react-native";
import { Portal } from "react-native-paper";
import { Provider, Text, Modal } from "react-native-paper";
import { CardHistory } from "../components/CardHistory";
import { DetailsCard } from "../components/DetailsCard";

interface OrdiniRecentiStackProps {}

function OrdiniRecenti() {
  const [visible, setVisible] = useState(false);
  const [egDetails, setEgDetails] = useState({});

  const showModal = (order: object) => {
    setVisible(true);
    setEgDetails(order);
  };

  const hideModal = () => {
    setVisible(false);
    setEgDetails({});
  };

  const containerStyle = { backgroundColor: "black", padding: 20 };

  return (
      <ScrollView style={{ width: "100%" }}>
        <CardHistory
          text="Ordine #0001"
          paragraph="Pizzeria 'Verace Elettrica'"
          indirizzo="Via Firenze, 98057 Milazzo ME"
          btntext="Visualizza dettagli ordine"
          btfn={showModal}
        />
        <CardHistory
          text="Ordine #0002"
          paragraph="Pizzeria Totó in Sicilia"
          indirizzo="Via Migliavacca, 3, 98057 Milazzo ME"
          btntext="Visualizza dettagli ordine"
          btfn={showModal}
        />
        <CardHistory
          text="Ordine #0003"
          paragraph="Trattoria la Casalinga"
          indirizzo="Via Riccardo D'amico, 13, 98057 Milazzo ME"
          btntext="Visualizza dettagli ordine"
          btfn={showModal}
        />
        <CardHistory
          text="Ordine #0004"
          paragraph="Totò passami l'olio"
          indirizzo="Via Cumbo Borgia, 29, 98057 Milazzo ME"
          btntext="Visualizza dettagli ordine"
          btfn={showModal}
        />
        <Provider>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={containerStyle}
          >
            <Text style={{ color: "black" }}>
              <DetailsCard
                {...egDetails}
                importo="35"
                metodo="PayPal"
                buttonFN={hideModal}
              ></DetailsCard>

              {/* per dinamicizzare "importo" e "metodo": settare una variabile che reperisce quei dati dal futuro servizio dal quale farò una request 
                  esempio: let importo = response.importo
                           let metodo = response.metodo
                */}
            </Text>
          </Modal>
        </Portal>
        </Provider>
      </ScrollView>
  );
}

const Stack = createStackNavigator();

export const OrdiniRecentiStack: React.FC<OrdiniRecentiStackProps> = ({}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="OrdiniRecenti" component={OrdiniRecenti} />
    </Stack.Navigator>
  );
};
