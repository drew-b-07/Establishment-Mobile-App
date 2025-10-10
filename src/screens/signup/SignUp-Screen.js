import { createClient } from "@supabase/supabase-js";
const supabaseUrl = 'https://mjftoxillyjatgwubonn.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qZnRveGlsbHlqYXRnd3Vib25uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4MjQ2NzYsImV4cCI6MjA3NDQwMDY3Nn0.unc6SZs6NunWAJcs1QzvzCeCWxtmVWwOsyGsdiy9vAY'
const supabase = createClient(supabaseUrl, supabaseKey)

import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TextInput, Image, KeyboardAvoidingView, ScrollView, Button, ActivityIndicator, Platform } from "react-native";
import MapView, { Marker } from "react-native-maps";
import validator from "validator";

import styles from "./styles";

import { showErrorToast, showInfoToast, showSuccessToast } from "../../utils/toast-handler";

import establishment_logo from "../../../assets/images/establishment-logo.png";

export default function SignUpScreen({ navigation }) {
  const [first_name, setFirstName] = useState(``);
  const [last_name, setLastName] = useState(``);

  const [email, setEmail] = useState(``);

  const [password, setPassword] = useState(``);
  const [confirm_password, setConfirmPassword] = useState(``);

  const [establishment_name, setEstablishmentName] = useState(``);

  const [phone_number, setPhoneNumber] = useState(``);

  const [marker_coordinates, setMarkerCoordinates] = useState(null);
  const [latitude, setLatitude] = useState(``);
  const [longitude, setLongitude] = useState(``);
  const [country, setCountry] = useState(``);
  const [province, setProvince] = useState(``);
  const [municipality, setMunicipality] = useState(``);

  const [is_loading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const initial_region = {
    latitude: 0,
    longitude: 0, 
    latitudeDelta: 90,
    longitudeDelta: 180
  };

  const onMapPress = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setMarkerCoordinates({latitude, longitude});
    setLatitude(latitude.toString());
    setLongitude(longitude.toString());

    const api_key = "pk.8329f7efe1c3c979a63e9e427efbffcc";

    fetch(`https://us1.locationiq.com/v1/reverse?key=${api_key}&lat=${latitude}&lon=${longitude}&format=json`)
    .then(res => res.json())
    .then(data => {
      setCountry(data.address.country);
      setProvince(data.address.state);
      setMunicipality(data.address.city || data.address.town || data.address.village);
    })
    .catch(err => console.error(err));
  }

  const checkInputBlank = (val) => !val || validator.isEmpty(val) ? true : false;

  async function onSignUpPress (e) {
    try {
      setIsLoading(true);

      if(checkInputBlank(first_name.trim())) return showErrorToast("Do not leave First Name blank.");
      if(checkInputBlank(last_name.trim())) return showErrorToast("Do not leave Last Name blank.");
      if(checkInputBlank(email.trim())) return showErrorToast("Do not leave Email blank.");
      if(checkInputBlank(password.trim())) return showErrorToast("Do not leave Password blank.");
      if(checkInputBlank(confirm_password.trim())) return showErrorToast("Do not leave Confirm Password blank.");
      if(checkInputBlank(establishment_name.trim())) return showErrorToast("Do not leave Establishment Name blank.");
      if(checkInputBlank(phone_number.trim())) return showErrorToast("Do not leave Phone Number blank.");
      if(checkInputBlank(latitude.trim()) && checkInputBlank(longitude.trim())) return showErrorToast("Pin your location on the map.");
      if(!(validator.isEmail(email.trim()))) return showErrorToast("Invalid Email Address.");
      if(password.length < 8) return showErrorToast("Password must have at least 8 characters.");
      if(password !== confirm_password) return showErrorToast("Password did not match.");
      // Add condition to check phone number if it is noticed by your panels.

      var { data: establishment_users, error } = await supabase.from("establishment_users").select("*").eq("email", email);

      if(error) return showErrorToast(`${error.message}`, `${error.cause}`);

      if (establishment_users.length > 0) {
        if(!establishment_users[0].verified) {
          showInfoToast("Your account is not yet, we sent you an email to verify your account.", "Unverified Account", 5000);

          var {data, error} = await supabase.auth.resend({email, type: "signup", options: {emailRedirectTo: "https://ebok18.github.io/VerifiedAccount?role=est"}});

          if(error) return showErrorToast(`${error.message}`, `${error.cause}`);
        } else {
          showErrorToast("User's is already existing.", "User Exist");
        }

        return;
      }

      var {data: authData, error: authError} = await supabase.auth.signUp({email, password, options: {
        emailRedirectTo: "https://ebok18.github.io/VerifiedAccount?role=est",
        data: {
          full_name: `${first_name} ${last_name}`,
          phone: phone_number
        }
      }});

      if(authError) return showErrorToast("Error Server", `${authError.message}`, 5000);

      var {data, error} = await supabase.from("establishment_users").insert([{
        email,
        owner_first_name: first_name,
        owner_last_name: last_name,
        establishment_name,
        contact_number: phone_number,
        country: country,
        province: province,
        municipality: municipality,
        latitude,
        longitude
      }]);

      if(error) return showErrorToast("Failed to Insert User.");
      
      showSuccessToast("Check your email to verify your account.", "Signed Up Successfully");
    } catch (error) {
      showErrorToast("Unknown Occured", error);
    } finally {
      setIsLoading(false);
    }
  }

  return(
    <SafeAreaView>
      <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"}>
        {
          is_loading ? 
          (<ActivityIndicator size="large" />)
          : (
          <ScrollView>

            <Image source={establishment_logo} />
            <Text>Sign Up</Text>

            <Text>First Name</Text>
            <TextInput 
              inputMode="text"
              placeholder="First Name"
              value={first_name}
              onChangeText={setFirstName}
            />
            <Text>Last Name</Text>
            <TextInput
              inputMode="text"
              placeholder="Last Name"
              value={last_name}
              onChangeText={setLastName}
            />

            <Text>Email</Text>
            <TextInput
              inputMode="email"
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />

            <Text>Password</Text>
            <TextInput
              inputMode="text"
              placeholder="Password" 
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />

            <Text>Confirm Password</Text>
            <TextInput
              inputMode="text"
              placeholder="Confirm Password"
              secureTextEntry={true}
              value={confirm_password}
              onChangeText={setConfirmPassword}
            />

            <Text>Establishment Name</Text>
            <TextInput 
              inputMode="text"
              placeholder="Establishment Name"
              value={establishment_name}
              onChangeText={setEstablishmentName}
            />

            <Text>Phone Number</Text>
            <TextInput
              inputMode="tel"
              placeholder="Phone Number"
              value={phone_number}
              onChangeText={setPhoneNumber}
            />

            <MapView
              style={styles.map}
              initialRegion={initial_region}
              onPress={onMapPress}
              cameraZoomRange={{minCenterCoordinateDistance: 0, maxCenterCoordinateDistance: 19}}
              minZoomLevel={0}
              maxZoomLevel={19}
            >
              {
                marker_coordinates &&
                <Marker 
                  coordinate={marker_coordinates}
                  draggable
                  onDragEnd={(e) => {
                    const { latitude, longitude } = e.nativeEvent.coordinate;
                    setMarkerCoordinates({ latitude, longitude });
                    setLatitude(latitude.toString());
                    setLongitude(longitude.toString());
                  }}
                />
              }
            </MapView>

            <Button title="Sign Up" onPress={onSignUpPress} />

            <Text onPress={() => navigation.reset({index: 0, routes: [{name: "Login"}]}) } >Login</Text>

          </ScrollView>
          )
        }
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}