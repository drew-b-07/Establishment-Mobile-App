import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TextInput, Image } from "react-native";

import establishment_logo from "../../../assets/images/establishment-logo.png";

export default function ForgotPasswordScreen({ navigation }) {
  return(
    <SafeAreaView>
      <Image source={establishment_logo} />
      <Text>Forgot Password</Text>
      <Text onPress={() => navigation.reset({ index: 0, routes: [{name: "Login"}] }) } >Login</Text>

      <Text>Email</Text>
      <TextInput inputMode="email" placeholder="Email" />
    </SafeAreaView>
  );
}