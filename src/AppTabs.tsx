import React, { useContext, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AppParamList } from "./AppParamList";
import { View } from "react-native";
import { Button, Card, Paragraph, Searchbar, Title, Modal, Portal, Text } from "react-native-paper";
import { RestaurantCard } from "../components/RestaurantCard";
import { AuthContext } from "./AuthProvider";
import { CardHistory } from "../components/CardHistory";

interface AppTabsProps {}

const Tabs = createBottomTabNavigator<AppParamList>();

function Classico() {
  const [searchQuery, setSearchQuery] = useState("");

  
  const onChangeSearch = (query: React.SetStateAction<string>) =>
    setSearchQuery(query);

  return (
    <View style={{ flex: 1 }}>
      <Searchbar
        placeholder="Cerca ristorante vicino a te"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      <Card>
        <Card.Content>
          <Title>Risultati per: {searchQuery}</Title>
          <Paragraph>
            Oppure scegli da qui in base alla tua posizione attuale
          </Paragraph>
        </Card.Content>
      </Card>
      <RestaurantCard 
        text="Dumbolone Pizzeria"
        indirizzo="Via Risorgimento, 150, 98057 Milazzo ME"
        orario="19:15-22:30"
        btntext="esplora"
        btfn={() => console.log("we bellissimo")} /**Ovviamente qui ci va la navigationxD */
      />
      <RestaurantCard 
        text="MA sushi & locanda di mare Milazzo"
        indirizzo="Vico del Pittore, 32, 98057 Milazzo ME"
        orario="19:00-00:00"
        btntext="esplora"
        btfn={() => console.log("we bellissimo")} /**Ovviamente qui ci va la navigationxD */
      />
    </View>
  );
}

function OrdiniRecenti(){
    const [visible, setVisible] = useState(false)
    const [egDetails, setEgDetails] = useState({})

    const showModal = (order: object) => {
        setVisible(true);
        setEgDetails(order);
      };
    
    const hideModal = () => {
        setVisible(false);
        setEgDetails({});
    };

    const containerStyle = { backgroundColor: 'black', padding: 20 };

    return(
        <View style={{flex: 1}}>
            <CardHistory />
        </View>
    )
}

function Impostazioni() {
    const { logout } = useContext(AuthContext)
    return(
        <View>
            <Title style={{textAlign: 'left'}}>Impostazioni</Title>
            <Button mode="contained" onPress={() => logout()}>Esegui il Logout</Button>
        </View>
    )
}

export const AppTabs: React.FC<AppTabsProps> = ({}) => {
  return (
    <Tabs.Navigator>
      <Tabs.Screen name="Classico" component={Classico} />
      <Tabs.Screen name="OrdiniRecenti" component={OrdiniRecenti} />
      <Tabs.Screen name="Impostazioni" component={Impostazioni} />
    </Tabs.Navigator>
  );
};
