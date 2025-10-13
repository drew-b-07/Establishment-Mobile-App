import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HistoryScreen from "./History-Screen";

const Stack = createNativeStackNavigator();

export default function HistoryStack() {
  return(
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="View" component={HistoryScreen} />
    </Stack.Navigator>
  );
}