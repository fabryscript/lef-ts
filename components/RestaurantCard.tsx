import React from "react";
import { View } from "react-native";
import { Button, Card, Title, Paragraph } from "react-native-paper";

// image, text, btntext, btfn, indirizzo, orario

interface RestaurantCardProps {
  text?: string;
  btntext?: string;
  btfn?: () => void;
  indirizzo?: string;
  orario?: string;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({
  text,
  btntext,
  btfn,
  indirizzo,
  orario,
}) => {
  return (
    <View>
      <Card>
        <Card.Content>
          <Title>{text}</Title>
          <Paragraph>{indirizzo}</Paragraph>
          <Paragraph>{orario}</Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button onPress={btfn}>{btntext}</Button>
        </Card.Actions>
      </Card>
    </View>
  );
};
