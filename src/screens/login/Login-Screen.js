import { SafeAreaView } from "react-native-safe-area-context";
import { Text, Image, TextInput, KeyboardAvoidingView, Platform, ScrollView, View, Switch } from "react-native";

import styles from "./styles";

import establishment_logo from "../../../assets/images/establishment-logo.png";

export default function LoginScreen({ navigation }) {
  return (
  <SafeAreaView style={styles.wrapper} >
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS == "ios" ? "padding" : "height"} >
      <ScrollView 
        contentContainerStyle={styles.login_form_container}
        showsVerticalScrollIndicator={false}
      >

        <Image style={styles.logo} source={establishment_logo} />
        <View style={styles.landscape_holder}>
          <Text style={styles.text1} >Sign In</Text>

          <View style={styles.login_form}>
            <Text style={styles.label}>Email</Text>
            <TextInput style={styles.input} inputMode="email" placeholder="Email" />

            <Text style={styles.label}>Password</Text>
            <TextInput style={styles.input} inputMode="text" secureTextEntry={true} placeholder="Password" />

            <Text style={styles.sign_up_link} onPress={() => navigation.navigate("Sign Up") } >Sign Up</Text>
            <Text style={styles.forgot_pass_link} onPress={() => navigation.navigate("Forgot Password") } >Forgot Password</Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  </SafeAreaView>);
}