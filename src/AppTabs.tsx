import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AppParamList } from "./paramlists/AppParamList";
import { Ionicons, AntDesign, FontAwesome } from "@expo/vector-icons";
import { OrdiniRecentiStack } from "./tabs/OrdiniRecentiStack";
import { ImpostazioniStack } from "./tabs/ImpostazioniStack";
import TopTabs from "./tabs/TopTabs";

interface AppTabsProps {}

const Tabs = createBottomTabNavigator<AppParamList>();

export const AppTabs: React.FC<AppTabsProps> = ({}) => {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          if (route.name === "Ordina")
            return <FontAwesome name="search" size={size} color={color} />;
          else if (route.name === "Impostazioni")
            return (
              <Ionicons name={"settings-outline"} size={size} color={color} />
            );
          else if (route.name === "OrdiniRecenti")
            return <AntDesign name="shoppingcart" size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "green",
        inactiveTintColor: "gray",
      }}
    >
      <Tabs.Screen name="Ordina" component={TopTabs} />
      <Tabs.Screen
        name="OrdiniRecenti"
        options={{ tabBarLabel: "Ordini Recenti" }}
        component={OrdiniRecentiStack}
      />
      <Tabs.Screen name="Impostazioni" component={ImpostazioniStack} />
    </Tabs.Navigator>
  );
};
