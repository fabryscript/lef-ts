import React from "react";
import { View } from "react-native";
import { Button, Card, Title, Paragraph, Text } from "react-native-paper";

interface CardHistoryProps {
  orderID?: string;
  btntext?: string;
  btfn?: (payload: {nomeLocale: string; indirizzo: string}) => void;
  nomeLocale?: string;
  indirizzo?: string;
}

export const CardHistory: React.FC<CardHistoryProps> = ({
  orderID,
  btntext,
  btfn,
  nomeLocale,
  indirizzo,
}) => {
  return (
    <View>
      <Card>
        <Card.Content>
          <Title><Text>{orderID}</Text></Title>
          <Paragraph><Text>{nomeLocale}</Text></Paragraph>
          <Paragraph><Text>{indirizzo}</Text></Paragraph>
        </Card.Content>
        <Card.Actions>
            <Button mode="outlined" onPress={() => {
              if (btfn && nomeLocale && indirizzo) {
                btfn({nomeLocale: nomeLocale, indirizzo});
              }
            }}><Text>{btntext}</Text></Button>
        </Card.Actions>
      </Card>
    </View>
  );
};
