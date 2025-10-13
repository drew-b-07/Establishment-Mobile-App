import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TextInput, Image, Button, ActivityIndicator } from "react-native";
import validator from "validator";

import establishment_logo from "../../../assets/images/establishment-logo.png";

import supabase from "../../utils/supabase-db";

import { showErrorToast, showSuccessToast } from "../../utils/toast-handler";

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState(``);
  const [loading, setLoading] = useState(false);

  const onButtonPress = async () => {
    try{
      setLoading(true);
      const s_email = email.trim();
      if(!s_email || validator.isEmpty(s_email)) return showErrorToast("Do not leave Email blank.", "Input Blank");
      if(!(validator.isEmail(s_email))) return showErrorToast("Enter valid email address.", "Invalid Email");

      const { data, error } = await supabase.auth.resetPasswordForEmail(s_email, {redirectTo: "estapp://forgotpass"});
      if(error) return showErrorToast(`${error.message}`);
      showSuccessToast("We have sent an email to you.", "Success!");
    } catch(error) {
      showErrorToast("Unknown Occured.");
    } finally {
      setLoading(false);
    }
  };

  if(loading) return <ActivityIndicator size={"large"} />;

  return(
    <SafeAreaView>
      <Image source={establishment_logo} />
      <Text>Forgot Password</Text>
      <Text onPress={() => navigation.reset({ index: 0, routes: [{name: "Login"}] }) } >Login</Text>

      <Text>Email</Text>
      <TextInput inputMode="email" placeholder="Email" value={email} onChangeText={setEmail} />
      <Button title="Send Email" onPress={onButtonPress} />
    </SafeAreaView>
  );
}