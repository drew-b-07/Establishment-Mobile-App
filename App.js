import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
import * as Linking from 'expo-linking';

// Screens
import LoginScreen from './src/screens/login/Login-Screen';
import SignUpScreen from './src/screens/signup/SignUp-Screen';
import ForgotPasswordScreen from './src/screens/forgotpass/Forgot-Password';
import VerifiedScreen from './src/screens/verified-account/VerifiedAccount-Screen';
import DashboardContainer from './src/screens/dashboard/Dashboard-Container';
import { useEffect, useState } from 'react';
import supabase from './src/utils/supabase-db';

const Stack = createNativeStackNavigator();

const linking = {
  prefixes: ['estapp://'], // Your app scheme (set in app.json)
  config: {
    screens: {
      Login: 'login',
      SignUp: 'signup',
      ForgotPassword: 'forgotpass',
      Verified: 'verified_account',
      Dashboard: 'dashboard',
    },
  },
};

export default function App() {
  const [ user, setUser ] = useState(null);

  useEffect(() => {
    const signoutUserOnSupabase = async () => {
      if(!user) await supabase.auth.signOut();
    }

    signoutUserOnSupabase();
  }, [user]);

  useEffect(() => {
    const handleDeepLink = async (event) => {
      const { url } = event;

      // Parse the URL
      const { hostname, path, queryParams } = Linking.parse(url);
      console.log("Received link:", url);
      console.log("Parsed:", { hostname, path, queryParams });

      // Handle Supabase auth callback
      if (url.includes('auth/callback')) {
        const { data, error } = await supabase.auth.exchangeCodeForSession(url);
        if (error) console.error(error);
        else console.log("Session created:", data.session);
      }

      // Handle password reset flow
      else if (url.includes('auth/forgotpass')) {
        // Navigate to your Forgot Password screen, for example:
        navigation.navigate('ForgotPassword');
      }

      // You can handle other routes too
      else {
        console.log("Unknown deep link route:", url);
      }
    };

    const subscription = Linking.addEventListener('url', handleDeepLink);

    // Handle app launched from link (cold start)
    Linking.getInitialURL().then((url) => {
      if (url) handleDeepLink({ url });
    });

    return () => subscription.remove();
  }, []);

  return (
    <NavigationContainer linking={linking}>
      {
        user ? (<DashboardContainer user={user} setUser={setUser} />) : 
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login">
            {(props) => <LoginScreen {...props} setUser={setUser} />}
          </Stack.Screen>
          <Stack.Screen name="Sign Up" component={SignUpScreen} />
          <Stack.Screen name="Forgot Password" component={ForgotPasswordScreen} />
          <Stack.Screen name="Verified" component={VerifiedScreen} />
          <Stack.Screen name="Dashboard" component={DashboardContainer} />
        </Stack.Navigator>
      }
      <Toast />
    </NavigationContainer>
  );
}