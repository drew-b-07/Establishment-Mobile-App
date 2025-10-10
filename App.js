/*
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import LoginScreen from './src/screens/login/Login-Screen';
import SignUpScreen from './src/screens/signup/SignUp-Screen';
import ForgotPasswordScreen from './src/screens/forgotpass/Forgot-Password';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Sign Up" component={SignUpScreen} />
      <Stack.Screen name="Forgot Password" component={ForgotPasswordScreen} />
    </Stack.Navigator>
    <Toast />
  </NavigationContainer>
  );
}
  */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
import * as Linking from 'expo-linking';

// Screens
import LoginScreen from './src/screens/login/Login-Screen';
import SignUpScreen from './src/screens/signup/SignUp-Screen';
import ForgotPasswordScreen from './src/screens/forgotpass/Forgot-Password';
import VerifiedScreen from './src/screens/verified-account/VerifiedAccount-Screen'; // 🆕 Add this

const Stack = createNativeStackNavigator();

export default function App() {
  // 🧭 Define deep link prefixes (important for linking)
  const prefix = Linking.createURL('/');

  // 🧩 Linking configuration
  const linking = {
    prefixes: [prefix, 'estapp://'], // 👈 your custom scheme from app.json
    config: {
      screens: {
        Login: 'login',
        SignUp: 'signup',
        ForgotPassword: 'forgot-password',
        Verified: 'verified_account', // 👈 this matches myapp://verified
      },
    },
  };

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Sign Up" component={SignUpScreen} />
        <Stack.Screen name="Forgot Password" component={ForgotPasswordScreen} />
        <Stack.Screen name="Verified" component={VerifiedScreen} />
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
}