import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps'



// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Walking dead</Text>
//     </View>
//   );
// }

export default function App() {
  return (
    <MapView style={{ flex: 1 }} region={{ latitude: 50.643700, longitude: 5.574782, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }} showsUserLocation={true} />
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
