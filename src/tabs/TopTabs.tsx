import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ClassicoStack from "./categories/ClassicoStack";

const Tabs = createMaterialTopTabNavigator();

const TopTabs = () => {
  return (
    <Tabs.Navigator
      initialRouteName="Classico"
      tabBarOptions={{
        labelStyle: {
          fontStyle: "italic",
        },
      }}
    >
      <Tabs.Screen name="Classico" component={ClassicoStack} />
    </Tabs.Navigator>
  );
};

export default TopTabs;
