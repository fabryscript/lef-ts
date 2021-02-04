import React, { createFactory } from 'react';
import { View } from 'react-native';
import { Caption, Card } from 'react-native-paper';

interface InsertProcessProps {}

const InsertProcess: React.FC<InsertProcessProps> = ({}) =>{
    return (
        <View>
            <Card>
                <Card.Title>Informazioni Aggiuntive</Card.Title>
            </Card>
        </View>
    );
}

export default InsertProcess