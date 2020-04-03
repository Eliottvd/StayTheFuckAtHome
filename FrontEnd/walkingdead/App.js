import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, PermissionsAndroid, Button } from "react-native";
import MapView from 'react-native-maps'
//import Geolocation from '@react-native-community/geolocation';

export default function App() {

  const [location, setLocation] = React.useState({
    coords: {
      longitude: 5.574782,
      latitude: 50.643700
    }
  })

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "DONNE MOI TES DATAS BITCH",
          message:
            "pute pute pute pute ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the location");
      } else {
        console.log("location permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  React.useEffect(() => {
    requestLocationPermission()
    //findCoordinates()
  }, [])

  const findCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const location = JSON.stringify(position);

        setLocation({ location });
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  return (
    <MapView style={{ flex: 1 }} region={{ latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }} showsUserLocation={true} />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});