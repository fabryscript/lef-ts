import React from "react";
import { View } from "react-native";
import { Button, Card, Title, Paragraph } from "react-native-paper";

// text, btntext, btfn, paragraph, indirizzo

interface CardHistoryProps {
  text?: string;
  btntext?: string;
  btfn?: () => {nomeLocale: string, indirizzo: string};
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
            <Button mode="contained" onPress={btfn({nomeLocale: paragraph, indirizzo})}>{btntext}</Button>
            /**FIXME */
        </Card.Actions>
      </Card>
    </View>
  );
};
