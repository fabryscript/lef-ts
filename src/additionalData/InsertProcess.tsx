import React, { createFactory } from "react";
import { View } from "react-native";
import { Card } from "react-native-paper";
import { ImpostazioniNavProps } from "../paramlists/ImpostazioniStackParamList";

interface InsertProcessProps {}

const InsertProcess = ({
  navigation,
}: ImpostazioniNavProps<"InsertProcess">) => {
  return (
    <View>
      <Card>
        <Card.Title>Informazioni Aggiuntive</Card.Title>
      </Card>
    </View>
  );
};

export default InsertProcess;
