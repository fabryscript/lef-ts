import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AppParamList } from "./paramlists/AppParamList";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { ClassicoStack } from "./tabs/ClassicoStack";
import { VegetarianoStack } from "./tabs/VegetarianoStack";
import { VeganoStack } from "./tabs/VeganoStack";
import { OrdiniRecentiStack } from "./tabs/OrdiniRecentiStack";
import { ImpostazioniStack } from "./tabs/ImpostazioniStack";

interface AppTabsProps {}

const Tabs = createBottomTabNavigator<AppParamList>();

export const AppTabs: React.FC<AppTabsProps> = ({}) => {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          if (route.name === "Classico") {
            return <FontAwesome5 name="hamburger" size={size} color={color} />;
          } else if (route.name === "Impostazioni") {
            return (
              <Ionicons name={"settings-outline"} size={size} color={color} />
            );
          } else if (route.name === "OrdiniRecenti") {
            return <FontAwesome5 name="history" size={size} color={color} />;
          } else if (route.name === "Vegetariano") {
            return <FontAwesome5 name="leaf" size={size} color={color} />;
          } else if (route.name === "Vegano") {
            return <FontAwesome5 name="tree" size={size} color={color} />;
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: "blue",
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
