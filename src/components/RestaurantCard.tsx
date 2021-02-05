import React from "react";
import { View } from "react-native";
import { Button, Card, Title, Paragraph } from "react-native-paper";
interface RestaurantCardProps {
  text?: string;
  btntext?: string;
  btfn?: () => void;
  indirizzo?: string;
  orario?: string;
  imageName?: any
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({
  text,
  btntext,
  btfn,
  indirizzo,
  orario,
  imageName
}) => {
  return (
    <View>
      <Card>
        <Card.Cover source={imageName} />
        <Card.Content>
          <Title>{text}</Title>
          <Paragraph>{indirizzo}</Paragraph>
          <Paragraph>{orario}</Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button color="green" mode="outlined" onPress={btfn}>{btntext}</Button>
        </Card.Actions>
      </Card>
    </View>
  );
};
