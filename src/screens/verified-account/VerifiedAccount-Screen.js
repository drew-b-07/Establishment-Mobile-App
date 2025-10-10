import { View, Text, Button } from "react-native";

export default function VerifiedScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        🎉 Your account has been verified!
      </Text>
      <Text style={{ marginVertical: 10 }}>You may now sign in.</Text>
      <Button title="Continue" onPress={() => navigation.navigate("SignIn")} />
    </View>
  );
}
