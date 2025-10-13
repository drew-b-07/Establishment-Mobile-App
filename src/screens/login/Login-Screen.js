import { SafeAreaView } from "react-native-safe-area-context";
import { Text, Image, TextInput, KeyboardAvoidingView, Platform, ScrollView, View, Button, ActivityIndicator } from "react-native";
import validator from 'validator';

import { showErrorToast, showInfoToast, showSuccessToast } from "../../utils/toast-handler";
import supabase from "../../utils/supabase-db";

import styles from "./styles";

import establishment_logo from "../../../assets/images/establishment-logo.png";
import { useEffect, useState } from "react";

export default function LoginScreen({ navigation, setUser }) {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ loading, setLoading ] = useState(false);

  async function loginButtonPressed(e) {
    try{
      setLoading(true);
      const s_email = email.trim();
      const s_pw = password.trim();

      if(!s_email || validator.isEmpty(s_email)) return showErrorToast("Do not leave Email blank.", "Input Blank");
      if(!s_pw || validator.isEmpty(s_pw)) return showErrorToast("Do not leave Password blank.", "Input Blank");
      if(!(validator.isEmail(s_email))) return showErrorToast("Enter valid email address.", "Invalid Email");
      if(s_pw.length < 8) return showErrorToast("Password must be at least 8 characters.", "Invalid Password");

      const { data: est_user, error: est_select_err } = await supabase.from("establishment_users").select("*").eq("email", s_email);
      if(est_select_err) return showErrorToast(`${est_select_err.message}`, `${est_select_err.cause}`);
      if(est_user.length <= 0) return showErrorToast("Your account is not existing yet.", "Account Not Existing");

      const { data: est_login, error: est_login_err } = await supabase.auth.signInWithPassword({email: s_email, password: s_pw});
      if(est_login_err) {
        if(est_login_err.message === "Invalid login credentials") showErrorToast("Your password is incorrect.", "Password Incorrect");
        if(est_login_err.message === "Email not confirmed") {
          const { data: est_resend_signup, error: est_resend_signup_err } = await supabase.auth.resend({email, type: "signup", options: {emailRedirectTo: "https://ebok18.github.io/VerifiedAccount?role=est"}});
          if(est_resend_signup_err) showErrorToast(`${est_resend_signup_err.message}`);

          showInfoToast("Your account is not yet, we sent you an email to verify your account.", "Unverified Account", 5000);
        }

        return;
      }

      console.log(supabase.auth.getSession);
      setUser(est_user[0]);
    } catch(error) {
      showErrorToast("Unknown Occured.", error);
      
      const signout = async () => { await supabase.auth.signOut() };
      signout();
    } finally {
      setLoading(false);
    }
  }

  if(loading) return <ActivityIndicator size={"large"} />;

  return (
  <SafeAreaView style={styles.wrapper} >
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS == "ios" ? "padding" : "height"} >
      <ScrollView contentContainerStyle={styles.login_form_container}>

        <Image style={styles.logo} source={establishment_logo} />
        <View style={styles.landscape_holder}>
          <Text style={styles.text1} >Sign In</Text>

          <View style={styles.login_form}>
            <Text style={styles.label}>Email</Text>
            <TextInput style={styles.input} value={email} onChangeText={setEmail} inputMode="email" placeholder="Email" />

            <Text style={styles.label}>Password</Text>
            <TextInput style={styles.input} inputMode="text" value={password} onChangeText={setPassword} secureTextEntry={true} placeholder="Password" />

            <Button title="Log In" onPress={loginButtonPressed} />

            <Text style={styles.sign_up_link} onPress={() => navigation.navigate("Sign Up") }>Sign Up</Text>
            <Text style={styles.forgot_pass_link} onPress={() => navigation.navigate("Forgot Password") } >Forgot Password</Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  </SafeAreaView>);
}