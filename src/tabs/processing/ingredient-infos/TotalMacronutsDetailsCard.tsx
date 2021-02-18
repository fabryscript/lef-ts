import React from "react";
import { Card, Text } from "react-native-paper";

interface TotalMacronutsDetailsCardProps {
  proteine?: number;
  carboidrati?: number;
  grassi?: number;
}
const TotalMacronutsDetailsCard = ({
  carboidrati,
  grassi,
  proteine,
}: TotalMacronutsDetailsCardProps) => {
  return (
    <Card>
      <Card.Content>
        <Text>Totale Proteine: {proteine} g</Text>
        <Text>Totale Carboidrati: {carboidrati} g</Text>
        <Text>Totale Grassi: {grassi} g</Text>
      </Card.Content>
    </Card>
  );
};

export default TotalMacronutsDetailsCard;
