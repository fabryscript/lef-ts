import React from "react";
import { Card, Paragraph, Title } from "react-native-paper";

interface PlateInfosCardProps {
    name: string,
    calorie: number,
    proteine: number,
    carboidrati: number,
    grassi: number,
}

const PlateInfosCard = ({ name, calorie, proteine, carboidrati, grassi}: PlateInfosCardProps) => (
  <Card>
    <Card.Content>
      <Title>Valori nutrizionali su 100g del prodotto: {name}</Title>
      <Paragraph>Calorie: {calorie} kCal</Paragraph>
      <Paragraph>Proteine: {proteine} g</Paragraph>
      <Paragraph>Carboidrati: {carboidrati} g</Paragraph>
      <Paragraph>Grassi: {grassi} g</Paragraph>
    </Card.Content>
  </Card>
);

export default PlateInfosCard;
