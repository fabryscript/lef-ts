import React from "react";
import { View } from "react-native";
import { Button, Card, Title, Paragraph, Text } from "react-native-paper";

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
          <Title><Text>{text}</Text></Title>
          <Paragraph><Text>{paragraph}</Text></Paragraph>
          <Paragraph><Text>{indirizzo}</Text></Paragraph>
        </Card.Content>
        <Card.Actions>
            <Button mode="outlined" onPress={() => {
              if (btfn && paragraph && indirizzo) {
                btfn({nomeLocale: paragraph, indirizzo});
              }
            }}><Text>{btntext}</Text></Button>
        </Card.Actions>
      </Card>
    </View>
  );
};
