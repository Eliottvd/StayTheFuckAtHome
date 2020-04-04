import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, PermissionsAndroid, Button } from "react-native";
import MapView from 'react-native-maps'
import { Marker, Polyline } from 'react-native-maps'
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

  const [arrival, setArrival] = React.useState({
    coords: {
      longitude: 5.574782,
      latitude: 50.643700
    }
  })

  const [departure, setDeparture] = React.useState({
    coords: {
      longitude: 5.574782,
      latitude: 50.643700
    }
  })

  const [routeForMap, setRouteForMap] = React.useState([])
  const [summary, setSummary] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(true)

  const [geocode, setGeocode] = React.useState(null)

  React.useEffect(() => {
    getLocationAsync()
    getRoute()
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
      setLocation(locationRes)
      setDeparture(locationRes)
    }
  }

  const getRoute = async () => {
    let from_lat = parseFloat(departure.coords.latitude)
    let from_long = parseFloat(departure.coords.longitude)
    let to_lat = parseFloat(arrival.coords.latitude)
    let to_long = parseFloat(arrival.coords.longitude)

    const APIurl =  `https://route.api.here.com/routing/7.2/calculateroute.json?app_id=sHXA2BvFa3XvnLgpQjzX&app_code=N0w0RZuUd-27zzLTQou1oQ&waypoint0=geo!${from_lat},${from_long}&waypoint1=geo!${to_lat},${to_long}&mode=fastest;bicycle;traffic:disabled&legAttributes=shape`
    const result = await fetch(APIurl)
    const resultJson = await result.json()

    console.log(resultJson)

    let routeCoordinates = []

    resultJson.response.route[0].leg[0].shape.map(m => {
      let latlong = m.split(',')
      let latitude = parseFloat(latlong[0])
      let longitude = parseFloat(latlong[1])
      routeCoordinates.push({
        latitude: latitude,
        longitude: longitude,
      })
    })

    setRouteForMap(routeCoordinates)
    setSummary(resultJson.response.route[0].summary)
    setIsLoading(false)
  }

  const gps = () => {
    if(!isLoading)
    {
      console.log('departure: ', departure)
      console.log('arrival : ', arrival)
      console.log('polylines : ', routeForMap)
      return <View>
        <Polyline coordinates={routeForMap} strokeWidth={7} strokeColor="red" geodesic={true}/>
        <Marker coordinate={{latitude: departure.coords.latitude, longitude: departure.coords.longitude}} title="StartingLocation"/>
        <Marker coordinate={{latitude: arrival.coords.latitude, longitude: arrival.coords.longitude}} title="Finishlocation"/>
      </View>
    }
  }

  return (
    <MapView style={{ flex: 1 }} region={{ latitude: location && location.coords && location.coords.latitude, longitude: location && location.coords && location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }} showsUserLocation={true}>
      {gps()}
        {!isLoading &&
          <Polyline coordinates={routeForMap} strokeWidth={7} strokeColor="red" geodesic={true}/>
        }
        {!isLoading &&
          <Marker coordinate={{latitude: departure.coords.latitude, longitude: departure.coords.longitude}} title="StartingLocation"/>
        }
        {!isLoading &&
          <Marker coordinate={{latitude: arrival.coords.latitude, longitude: arrival.coords.longitude}} title="Finishlocation"/>
        }
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