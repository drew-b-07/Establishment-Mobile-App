import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import AuthNavigator from './navigation/AuthNavigator';
import { colors } from './styles/globalStyles';

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.primary}
      />
      <AuthNavigator />
    </NavigationContainer>
  );
};

export default App;
