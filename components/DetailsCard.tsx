import React from "react";
import { View } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";

//export function DetailsCard({ nomeLocale, metodo, indirizzo, importo }) {

interface DetailsCardProps {
  nomeLocale?: string;
  metodo?: string;
  indirizzo?: string;
  importo?: string;
}

export const DetailsCard: React.FC<DetailsCardProps> = ({
  nomeLocale,
  metodo,
  indirizzo,
  importo,
}) => {
  return (
    <View>
      <Card>
        <Card.Content>
          <Title>Nome Del Locale: {nomeLocale}</Title>
          <Paragraph>Metodo di pagamento: {metodo}</Paragraph>
          <Paragraph>Indirizzo di consegna: {indirizzo}</Paragraph>
          <Paragraph>Importo Ordine: {importo}</Paragraph>
        </Card.Content>
      </Card>
    </View>
  );
};
