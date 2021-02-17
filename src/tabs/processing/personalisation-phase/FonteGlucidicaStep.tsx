import React, { useState } from 'react';
import { Card } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { plate } from '../../../models';
import { GenericNavProps } from '../../../paramlists/GenericStackParamList';

interface Macronuts {
    proteine: number;
    grassi: number;
    carboidrati: number;
    calorieOgni100g: number;
}

interface SingleIngredient {
    name: string;
    price: number;
    macronuts: Macronuts
}

interface FonteGlucidicaStepProps {
    ingredienti: SingleIngredient[];
}

const FonteGlucidicaStep = ({ingredienti}: FonteGlucidicaStepProps, {route}: GenericNavProps<"Step">) => {
    let plates: {} | null | undefined = [];
    const dispatch = useDispatch();

    if (ingredienti) {
      const [isSwitchOn, setIsSwitchOn] = useState<any[]>(
        ingredienti.map((piatto) => ({
          value: false,
          ...piatto,
        }))
      );

      const onToggleSwitch = (
        value: boolean,
        piatto: plate | undefined,
        index: number
      ) => {
        const temp = [...isSwitchOn];
        temp.splice(index, 1, {
          value,
          ...piatto,
        });
        setIsSwitchOn(temp);
      };
    return(
        <Card>

        </Card>
    );
}

export default FonteGlucidicaStep;