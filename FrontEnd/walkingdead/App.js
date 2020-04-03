import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, PermissionsAndroid, Button } from "react-native";
import MapView from 'react-native-maps'
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapViewDirections from 'react-native-maps-directions';

const GOOGLE_MAPS_APIKEY = 'AIzaSyB2w2xi3OHlJMsZcw-uJSR6bm1AXIMe318';

export default function App() {

  const [location, setLocation] = React.useState({
    coords: {
      longitude: 5.574782,
      latitude: 50.643700
    }
  })
  const [geocode, setGeocode] = React.useState(null)

  React.useEffect(() => {
    getLocationAsync()
  }, [])

  const getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
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
    <MapView style={{ flex: 1 }} region={{ latitude: location && location.coords && location.coords.latitude, longitude: location && location.coords && location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }} showsUserLocation={true}>
      <MapViewDirections
        origin={location && location.coords}
        destination={{
            longitude: 5.574089,
            latitude: 50.642484
        }}
        apikey={GOOGLE_MAPS_APIKEY}
        strokeWidth={3}
        strokeColor="hotpink"
        mode='WALKING'
      />
    </MapView>
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