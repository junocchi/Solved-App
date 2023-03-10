import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import RunningScoreContext from 'frontend/src/components/landmarkCamera/RunningScoreContext'; //////////////
import { useContext } from 'react';

const Finished = ({ navigation, route }) => {
  const { runningScore } = useContext(RunningScoreContext);
  useEffect(() => {
    const scores = async () => {
      let token = await SecureStore.getItemAsync('token');
      let email = await SecureStore.getItemAsync('email');
      let response = await fetch(
        'https://mystery-route-backend.onrender.com/account',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            trophies: 1,
            coins: runningScore,
          }),
        }
      );
      console.log(response.status);
      console.log(`running score from within mainblock ${runningScore}`);
    };
    scores();
  }, []);
  const trip = () => {
    navigation.navigate('TripAdvisor');
  };
  return (
    <View style={styles.page}>
      <Text style={styles.title}>
        Congratulations you have solved the challenge!
      </Text>
      <Text style={styles.titleWinnings}>You have won a total of...</Text>

      <View style={styles.container}>
        <Image
          source={require('../../images/coin.png')}
          style={styles.imageCoin}
        />
        <Text style={styles.scoreNumber}>{runningScore} </Text>
      </View>

      <View style={styles.image}>
        <Image
          source={require('../../images/trophy.png')}
          style={styles.imageCoin}
        />
      </View>

      <Text style={styles.subtitle}>Explore the area...</Text>
      <TouchableOpacity onPress={trip}>
        <Image
          source={require('../../images/go-button.png')}
          style={styles.buttonImage}
        />
      </TouchableOpacity>

      <TouchableOpacity>
        <Image
          source={require('../../images/explore-area.png')}
          style={styles.imageRestaurants}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#EAF3F1',
  },
  title: {
    fontSize: 20,
    color: '#204376',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 5,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 50,
    marginBottom: 30,
  },
  titleWinnings: {
    fontSize: 20,
    color: '#204376',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 5,
    marginLeft: 50,
    marginRight: 50,
    marginTop: -10,
    marginBottom: 30,
  },
  subtitle: {
    fontSize: 14,
    color: '#204376',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 5,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 20,
    marginBottom: 10,
  },
  scoreNumber: {
    fontSize: 50,
    color: '#204376',
    fontWeight: 'bold',
    textAlign: 'left',
    // padding: 5,
    // marginLeft: 50,
    // marginRight: 50,
    // marginTop: 20,
    // marginBottom: 0,
  },
  image: {
    resizeMode: 'contain',
    height: 280,
    width: 280,
    marginLeft: 27,
  },
  imageCoin: {
    resizeMode: 'contain',
    height: 150,
    width: 280,
    marginTop: -60,
    marginLeft: 60,
  },
  imageRestaurants: {
    resizeMode: 'contain',
    height: 280,
    width: 280,
    marginTop: -320,
    marginLeft: 60,
  },
  button: {
    fontSize: 14,
    color: '#204376',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 5,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 20,
    marginBottom: 30,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#204376',
    borderRadius: 25,
    borderTopWidth: 50,
    borderBottomWidth: 50,
  },
});

export default Finished;
