import React from "react";
import { Card, Paragraph, Title } from "react-native-paper";

interface IngredientInfosCardProps {
    name: string,
    calorie: number,
    proteine: number,
    carboidrati: number,
    grassi: number,
    quantity: number | undefined
}

const IngredientInfosCard = ({ name, calorie, proteine, carboidrati, grassi, quantity }: IngredientInfosCardProps) => (
  <Card>
    <Card.Content>
      <Title>Valori nutrizionali su {quantity}g. del prodotto: {name}</Title>
      <Paragraph>Calorie: {calorie} kCal</Paragraph>
      <Paragraph>Proteine: {proteine} g</Paragraph>
      <Paragraph>Carboidrati: {carboidrati} g</Paragraph>
      <Paragraph>Grassi: {grassi} g</Paragraph>
    </Card.Content>
  </Card>
);

export default IngredientInfosCard;
