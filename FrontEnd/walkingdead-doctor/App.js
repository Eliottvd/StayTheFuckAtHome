import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Formsy from 'formsy-react-native';
import TextField from './components/TextField';
import { Box } from '@material-ui/core';
import { NavigationContainer } from '@react-navigation/native';

function DetailsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

function onPressButton(e) {
  alert('coucou');
}


export default class App extends React.Component {
  handleSubmit = (data) => {
    let fectchParameters = {
      method: 'GET',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    //fetch("https://walkinddeadapi.azurewebsites.net", fectchParameters);
    alert(`Data is:\n${JSON.stringify(data, null, 2)}`);
  }

  render() {
    return (
      <View style={styles.container}>
        <Formsy.Form ref="form" onValidSubmit={this.handleSubmit}>
          <Text style={styles.header}>Ajouter un zombie</Text>
          <TextField
            style={styles.input}
            placeholder="85.02.02-002.00"
            name="regNat"
            title="Numéro de registre nationnal"
            validationErrors={{
              "isDefaultRequiredValue": "Champs requis."
            }}
            required />
          <TextField
            style={styles.input}
            placeholder="Positif/Negatif/Guéri"
            name="status"
            title="Resulat PNG : "
            validationErrors={{
              "isDefaultRequiredValue": "Champs requis."
            }}
            required />
          <View style={styles.buttonWrapper2}>
            <Button title="Coucou" onPress={(e) => onPressButton(e)}></Button>

            <Button
              title="Go to Details"
              onPress={() => navigation.navigate('Details')}
            />
          </View>

          <View style={styles.buttonWrapper}>
            <Formsy.Button style={styles.button} title="Reset" type="reset" />
            <Formsy.Button style={styles.button} title="Submit" type="submit" />
          </View>


        </Formsy.Form>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 40,
    backgroundColor: '#eee'
  },
  header: {
    marginTop: 2,
    fontSize: 24,
    paddingBottom: 10,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  buttonWrapper: {
    marginTop: 2,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    width: 100,
    marginLeft: 1,
    marginRight: 1,
  },
  buttonWrapper2: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
