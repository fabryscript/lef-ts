import React from "react";
import { Card, Text } from "react-native-paper";

interface IngredientNameCardProps {
  name: string;
}

const IngredientNameCard = ({ name }: IngredientNameCardProps) => (
  <Card>
    <Card.Content>
      <Text>{name}</Text>
    </Card.Content>
  </Card>
);

export default IngredientNameCard;
