import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DevicesScreen from './Devices-Screen';

const Stack = createNativeStackNavigator();

export default function DevicesStack() {
  return(
    <Stack.Navigator initialRouteName='View' screenOptions={{headerShown: false}}>
      <Stack.Screen name="View" component={DevicesScreen} />
    </Stack.Navigator>
  );
}