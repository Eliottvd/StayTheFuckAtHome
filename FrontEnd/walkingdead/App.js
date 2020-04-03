import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, PermissionsAndroid, Button } from "react-native";
import MapView from 'react-native-maps'
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

export default function App() {

  const [location, setLocation] = React.useState({
    coords: {
      longitude: 5.574782,
      latitude: 50.643700
    }
  })
  const [geocode, setGeocode] = React.useState(null)

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
    getLocationAsync()
    //requestLocationPermission()
    //findCoordinates()
  }, [])

  const getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    console.log('status : ', status)
    if (status !== 'granted') {
      
      setLocation({
          coords: {
            longitude: 5.574782,
            latitude: 50.643700
          }
      });
    }
    else
    {
      let locationRes = await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.Highest});
      const { latitude , longitude } = locationRes.coords
      //this.getGeocodeAsync({latitude, longitude})
      setLocation(locationRes);
    }
  };

  return (
    <MapView style={{ flex: 1 }} region={{ latitude: location && location.coords && location.coords.latitude, longitude: location && location.coords && location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }} showsUserLocation={true} />
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