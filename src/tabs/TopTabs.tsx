import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ClassicoStack from "./categories/ClassicoStack";
import { VeganoStack } from "./categories/VeganoStack";
import { VegetarianoStack } from "./categories/VegetarianoStack";

const Tabs = createMaterialTopTabNavigator();

const TopTabs = () => {
  return (
    <Tabs.Navigator
      initialRouteName="Classico"
      tabBarOptions={{
        labelStyle: {
         fontStyle: "italic"
        }
      }}
    >
      <Tabs.Screen name="Classico" component={ClassicoStack} />
      <Tabs.Screen name="Vegetariano" component={VegetarianoStack} />
      <Tabs.Screen name="Vegano" component={VeganoStack} />
    </Tabs.Navigator>
  );
};

export default TopTabs;
