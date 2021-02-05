import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ScrollView } from "react-native";
import { Card, Portal, Text, Modal } from "react-native-paper";
import { CardHistory } from "../components/CardHistory";
import { DetailsCard } from "../components/DetailsCard";
import OrdiniRecentiDB from "../database/OrdiniRecentiDB.json";
interface OrdiniRecentiStackProps {}

function OrdiniRecenti() {
  const [visible, setVisible] = useState<boolean | any>(false);
  const [details, setDetails] = useState<object | any>({});

  const showModal = (order: object) => {
    setVisible(true);
    setDetails(order);
  };

  const hideModal = () => {
    setVisible(false);
    setDetails({});
  };

  const containerStyle = { backgroundColor: "black", padding: 20 };

  return (
    <ScrollView style={{ width: "100%" }}>
      {OrdiniRecentiDB.map((ordine, index) => {
        return (
          <Card key={index}>
            <CardHistory
              orderID={`Ordine #${ordine.id}`}
              nomeLocale={ordine.place}
              indirizzo={ordine.where}
              btntext="Visualizza dettagli"
              btfn={() => showModal(ordine.paymentDetails)}
            />
          </Card>
        );
      })}
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          <Text style={{ color: "black" }}>
            <DetailsCard
              importo={details.amount}
              metodo={details.method}
              buttonFN={hideModal}
            />
          </Text>
        </Modal>
      </Portal>
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
