import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AppParamList } from "./paramlists/AppParamList";
import { Ionicons, MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import { ClassicoStack } from "./tabs/categories/ClassicoStack";
import { VegetarianoStack } from "./tabs/categories/VegetarianoStack";
import { VeganoStack } from "./tabs/categories/VeganoStack";
import { OrdiniRecentiStack } from "./tabs/OrdiniRecentiStack";
import { ImpostazioniStack } from "./tabs/ImpostazioniStack";

interface AppTabsProps {}

const Tabs = createBottomTabNavigator<AppParamList>();

export const AppTabs: React.FC<AppTabsProps> = ({}) => {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          if (route.name === "Classico")
            return <MaterialCommunityIcons name="pasta" size={size} color={color} />;
          else if (route.name === "Impostazioni")
              return <Ionicons name={"settings-outline"} size={size} color={color} />
          else if (route.name === "OrdiniRecenti")
            return <AntDesign name="shoppingcart" size={size} color={color} />;
          else if (route.name === "Vegetariano")
            return <MaterialCommunityIcons name="food-steak-off" size={size} color={color} />;
          else if (route.name === "Vegano")
            return <MaterialCommunityIcons name="food-apple-outline" size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "green",
        inactiveTintColor: "gray",
      }}
    >
      <Tabs.Screen name="Classico" component={ClassicoStack} />
      <Tabs.Screen name="Vegetariano" component={VegetarianoStack} />
      <Tabs.Screen name="Vegano" component={VeganoStack} />
      <Tabs.Screen name="OrdiniRecenti" component={OrdiniRecentiStack} />
      <Tabs.Screen name="Impostazioni" component={ImpostazioniStack} />
    </Tabs.Navigator>
  );
};
