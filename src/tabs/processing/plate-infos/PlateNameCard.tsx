import React from "react";
import { Card, Text } from "react-native-paper";

interface PlateNameCardProps {
  name: string;
}

const PlateNameCard = ({ name }: PlateNameCardProps) => (
  <Card>
    <Card.Content>
      <Text>{name}</Text>
    </Card.Content>
  </Card>
);

export default PlateNameCard;
