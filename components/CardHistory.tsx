import React from "react";
import { View } from "react-native";
import { Button, Card, Title, Paragraph } from "react-native-paper";

// text, btntext, btfn, paragraph, indirizzo

interface CardHistoryProps {
  text?: string;
  btntext?: string;
  btfn?: (payload: {nomeLocale: string; indirizzo: string}) => void;
  paragraph?: string;
  indirizzo?: string;
}

export const CardHistory: React.FC<CardHistoryProps> = ({
  text,
  btntext,
  btfn,
  paragraph,
  indirizzo,
}) => {
  return (
    <View>
      <Card>
        <Card.Content>
          <Title>{text}</Title>
          <Paragraph>{paragraph}</Paragraph>
          <Paragraph>{indirizzo}</Paragraph>
        </Card.Content>
        <Card.Actions>
            <Button mode="contained" onPress={() => {
              if (btfn && paragraph && indirizzo) {
                btfn({nomeLocale: paragraph, indirizzo});
              }
            }}>{btntext}</Button>
        </Card.Actions>
      </Card>
    </View>
  );
};
