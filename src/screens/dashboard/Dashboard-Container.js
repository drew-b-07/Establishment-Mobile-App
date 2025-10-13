import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import DevicesStack from "./devices/Devices-Stack";
import HistoryStack from "./history/History-Stack";
import ProfileScreen from "./profile/Profile-Screen";

import supabase from "../../utils/supabase-db";
import { ActivityIndicator } from "react-native";

const Tab = createBottomTabNavigator();

export default function DashboardContainer({ user, setUser }) {
  return(
    <Tab.Navigator>
      <Tab.Screen name="Devices" component={DevicesStack} />
      <Tab.Screen name="History" component={HistoryStack} />
      <Tab.Screen name="Profile">
        {() => <ProfileScreen user={user} setUser={setUser} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}