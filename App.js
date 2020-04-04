import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, PermissionsAndroid, Button } from "react-native"
import MapView from 'react-native-maps'
import { Marker, Polyline } from 'react-native-maps'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import MapViewDirections from 'react-native-maps-directions'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { Card } from 'react-native-material-ui'

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
  const [display, setDisplay] = React.useState(false);
  const [mapHeight, setMapHeight] = React.useState("65%");
  const [geocode, setGeocode] = React.useState(null)

  React.useEffect(() => {
    getLocationAsync()
  }, [])

  React.useEffect(() => {
    const foo = async () => {
      await getRoute();
    
      setDisplay(true)
    }
    foo()
    
  }, [arrival, departure])


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
    else {
      let locationRes = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest });
      const { latitude, longitude } = locationRes.coords
      //this.getGeocodeAsync({latitude, longitude})
      setLocation(locationRes)
      setDeparture(locationRes)
    }
  }

  const getRoute = async () => {
    setDisplay(false);
    let from_lat = parseFloat(departure.coords.latitude)
    let from_long = parseFloat(departure.coords.longitude)
    let to_lat = parseFloat(arrival.coords.latitude)
    let to_long = parseFloat(arrival.coords.longitude)

    const APIurl = `https://route.api.here.com/routing/7.2/calculateroute.json?app_id=sHXA2BvFa3XvnLgpQjzX&app_code=N0w0RZuUd-27zzLTQou1oQ&waypoint0=geo!${from_lat},${from_long}&waypoint1=geo!${to_lat},${to_long}&mode=fastest;bicycle;traffic:disabled&legAttributes=shape`
    const result = await fetch(APIurl)
    const resultJson = await result.json()
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

  const notifyChangeDeparture = async (coords) => {
    setDisplay(false);
    setDeparture({
      coords: {
        latitude: coords.lat,
        longitude: coords.lng
      }
    })
  }

  const onFocus= () => {
    setMapHeight("0%");
  }

  const notifyChangeArrival = async (coords) => {
    setDisplay(false);
    setArrival({
      coords: {
        latitude: coords.lat,
        longitude: coords.lng
      }
    })
  }

  return (
    <View style={{ height: "100%" }}>
      <View>
        <Text></Text>
        <Text></Text>
      </View>
      <View style={{ height: "35%" }}>
        <GooglePlacesAutocomplete
          style={styles.locationAutocompleteStyle}
          placeholder='Departure'
          minLength={2}
          autoFocus={false}
          returnKeyType={'search'}
          keyboardAppearance={'light'}
          listViewDisplayed='auto'
          fetchDetails={true}
          renderDescription={row => row.description}
          onPress={(data, details = null) => {
            notifyChangeDeparture(details.geometry.location);
          }}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: 'fr'
          }}
          styles={{
            description: {
              fontWeight: 'bold'
            },
            predefinedPlacesDescription: {
              color: '#1faadb'
            }
          }}
          nearbyPlacesAPI='GooglePlacesSearch'
          GooglePlacesSearchQuery={{
            rankby: 'distance'
          }}
          // GooglePlacesDetailsQuery={{
          //   fields: 'formatted_address'
          // }}
          filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
          debounce={200}
        />
        <GooglePlacesAutocomplete
          placeholder='Arrival'
          minLength={2}
          autoFocus={false}
          returnKeyType={'search'}
          keyboardAppearance={'light'}
          listViewDisplayed='auto'
          fetchDetails={true}
          renderDescription={row => row.description}
          onPress={(data, details = null) => {
            notifyChangeArrival(details.geometry.location);
          }}
          onFocus={() => onFocus()}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: 'en'
          }}
          styles={{
            description: {
              fontWeight: 'bold'
            },
            predefinedPlacesDescription: {
              color: '#1faadb'
            }
          }}
          nearbyPlacesAPI='GooglePlacesSearch'
          GooglePlacesSearchQuery={{
            rankby: 'distance'
          }}
          // GooglePlacesDetailsQuery={{
          //   fields: 'formatted_address'
          // }}
          filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
          debounce={200}
        />
      </View>
      <View style={{ height: mapHeight }} >
        <MapView style={{ flex: 1 }} region={{ latitude: departure && departure.coords && departure.coords.latitude, longitude: departure && departure.coords && departure.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }} showsUserLocation={true}>
          <View>
            {isLoading ? null : (
              <View>
                <Marker coordinate={{ latitude: departure.coords.latitude, longitude: departure.coords.longitude }} title="StartingLocation" />
                <Marker coordinate={{ latitude: arrival.coords.latitude, longitude: arrival.coords.longitude }} title="Finishlocation" />
                {display &&
                  <Polyline coordinates={routeForMap} strokeWidth={7} strokeColor="red" geodesic={true} />
                }
              </View>
            )}
          </View>
        </MapView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputStyle: {
    marginTop: 20,
    marginBottom: 20,
    height: 35,
    paddingLeft: 5,
    paddingRight: 5,
    fontSize: 22,
    lineHeight: 35,
    width: '95%',
    borderColor: 'gray',
    borderWidth: 1,
  },
  buttonStyle: {
    height: 70,
    width: '100%',
    backgroundColor: '#C60000',
    alignItems: 'center',
    alignSelf: 'flex-end'
  },
  buttonTextStyle: {
    fontSize: 25,
    color: 'white',
    lineHeight: 50
  }
});