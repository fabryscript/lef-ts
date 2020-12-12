import React from "react";
import { View } from "react-native";
import { Card, Title, Paragraph, Text, Button } from "react-native-paper";

//export function DetailsCard({ nomeLocale, metodo, indirizzo, importo }) {

interface DetailsCardProps {
  nomeLocale?: string;
  metodo?: string;
  indirizzo?: string;
  importo?: string;
  buttonFN?: () =>void;
}

export const DetailsCard: React.FC<DetailsCardProps> = ({
  nomeLocale,
  metodo,
  indirizzo,
  importo,
  buttonFN
}) => {
  return (
    <View>
      <Card>
        <Card.Content>
          <Title><Text>Nome Del Locale: {nomeLocale}</Text></Title>
          <Paragraph><Text>Metodo di pagamento: {metodo}</Text></Paragraph>
          <Paragraph><Text>Indirizzo: {indirizzo}</Text></Paragraph>
          <Paragraph><Text>Importo Ordine: €{importo}</Text></Paragraph>
          <Button mode="outlined" onPress={buttonFN}>Chiudi Dettagli</Button>
        </Card.Content>
      </Card>
    </View>
  );
};
