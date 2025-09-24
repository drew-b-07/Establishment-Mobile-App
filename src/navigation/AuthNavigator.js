import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from '../screens/SignInScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import SignUpStep1Screen from '../screens/SignUpStep1Screen';
import SignUpStep2Screen from '../screens/SignUpStep2Screen';
import { colors } from '../styles/globalStyles';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.white,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{
          title: 'Reset Password',
        }}
      />
      <Stack.Screen
        name="SignUpStep1"
        component={SignUpStep1Screen}
        options={{
          title: 'Create Account',
        }}
      />
      <Stack.Screen
        name="SignUpStep2"
        component={SignUpStep2Screen}
        options={{
          title: 'Business Information',
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
