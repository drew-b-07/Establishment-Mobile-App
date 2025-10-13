import { ActivityIndicator, Button, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker } from "react-native-maps";

import supabase from "../../../utils/supabase-db";
import { useEffect, useState } from "react";
import { showErrorToast } from "../../../utils/toast-handler";
import styles from "./styles";

export default function ProfileScreen({user, setUser}) {
  const [ loading, setLoading ] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  if(loading) return <ActivityIndicator size={"large"} />;

  return(
    <SafeAreaView>
      {!user ? (<Text>Kobe Pogi</Text>) : (
        <>
          <Text>{user.email}</Text>
          <Text>{user.owner_first_name} {user.owner_last_name}</Text>
          <Text>{user.contact_number}</Text>
          <Text>{user.establishment_name}</Text>
          <Text>{user.municipality}, {user.province}, {user.country}</Text>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: user.latitude,
              longitude: user.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
            scrollEnabled={false}
            zoomEnabled={false}
            rotateEnabled={false}
            pitchEnabled={false}
            toolbarEnabled={false}
            zoomTapEnabled={false}
          >
            <Marker coordinate={{ latitude: user.latitude, longitude: user.longitude }} />
          </MapView>
        </>
      )}
      <Button title="Logout" onPress={handleLogout} />
    </SafeAreaView>
  );
}