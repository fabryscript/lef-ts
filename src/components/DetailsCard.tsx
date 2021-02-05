import React from "react";
import { View } from "react-native";
import { Card, Title, Paragraph, Text, Button } from "react-native-paper";

interface DetailsCardProps {
  metodo?: string;
  importo?: string;
  buttonFN?: () =>void;
}

export const DetailsCard: React.FC<DetailsCardProps> = ({
  metodo,
  importo,
  buttonFN
}) => {
  return (
    <View>
      <Card>
        <Card.Content>
          <Paragraph><Text>Metodo di pagamento: {metodo}</Text></Paragraph>
          <Paragraph><Text>Importo Ordine: €{importo}</Text></Paragraph>
          <Button mode="outlined" onPress={buttonFN}>Chiudi Dettagli</Button>
        </Card.Content>
      </Card>
    </View>
  );
};
